from flask import Blueprint, request, jsonify
from routes.auth_routes import verify_token, admin_required, token_required
from services.db_service import save_feedback, get_all_feedbacks, developers_collection, user_collection, chat_sessions_collection, report_collection

feedback_bp = Blueprint("feedback", __name__)


@feedback_bp.route("/api/feedback", methods=["POST"])
def submit_feedback():
    """Submit user feedback - accessible to all users"""
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email", "")
        message = data.get("message")

        # Validate required fields
        if not name or not message:
            return jsonify({"error": "Name and message are required"}), 400

        # Optional: Get user_id if authenticated
        user_id = None
        token = request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token_str = token.split(" ")[1]
            user_data = verify_token(token_str)
            if user_data:
                user_id = user_data["user_id"]

        # Save feedback
        feedback_id = save_feedback(name, email, message, user_id)
        
        return jsonify({
            "success": True,
            "message": "Feedback submitted successfully",
            "feedback_id": str(feedback_id)
        }), 201

    except Exception as e:
        print(f"❌ Error in submit_feedback: {str(e)}")
        return jsonify({"error": str(e)}), 500


@feedback_bp.route("/api/admin/feedbacks", methods=["GET"])
@admin_required
def get_feedbacks():
    """Get all feedbacks - admin only"""
    try:
        from datetime import datetime, timedelta
        
        # Auto-delete resolved feedbacks older than 7 days
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        from services.db_service import feedback_collection
        
        delete_result = feedback_collection.delete_many({
            "status": "resolved",
            "resolved_at": {"$lt": seven_days_ago}
        })
        
        if delete_result.deleted_count > 0:
            print(f"🗑️ Auto-deleted {delete_result.deleted_count} old resolved feedbacks")
        
        feedbacks = get_all_feedbacks()
        return jsonify({
            "success": True,
            "feedbacks": feedbacks,
            "count": len(feedbacks)
        }), 200

    except Exception as e:
        print(f"❌ Error in get_feedbacks: {str(e)}")
        return jsonify({"error": str(e)}), 500


@feedback_bp.route("/api/check-developer", methods=["GET"])
@token_required
def check_developer():
    """Check if current user is a developer"""
    try:
        # Get user_id from the token payload set by token_required decorator
        user_id = request.current_user.get("user_id")
        print(f"🔍 Checking developer access for user_id: {user_id}")
        
        # Check if user is in developers collection
        developer = developers_collection.find_one({"user_id": user_id})
        print(f"✅ Developer found: {developer is not None}")
        
        if developer:
            print(f"👨‍💻 Developer info: {developer.get('email')} - {developer.get('name')}")
        
        return jsonify({
            "is_developer": developer is not None,
            "developer_info": {
                "email": developer.get("email"),
                "name": developer.get("name"),
                "role": developer.get("role")
            } if developer else None
        }), 200

    except Exception as e:
        print(f"❌ Error in check_developer: {str(e)}")
        return jsonify({"error": str(e), "is_developer": False}), 500
        print(f"❌ Error in check_developer: {str(e)}")
        return jsonify({"error": str(e)}), 500


@feedback_bp.route("/api/admin/statistics", methods=["GET"])
@admin_required
def get_admin_statistics():
    """Get comprehensive statistics for admin dashboard"""
    try:
        # Total users
        total_users = user_collection.count_documents({})
        
        # Total developers
        total_developers = developers_collection.count_documents({})
        
        # Total chat sessions
        total_chats = chat_sessions_collection.count_documents({})
        
        # Total reports generated
        total_reports = report_collection.count_documents({})
        
        # Feature usage (count of each feature)
        feature_usage = {
            "chat": total_chats,
            "report": total_reports,
            "feedback": get_all_feedbacks().__len__()
        }
        
        # Most used feature
        most_used = max(feature_usage.items(), key=lambda x: x[1]) if feature_usage else ("None", 0)
        
        # Recent activity (last 7 days)
        from datetime import datetime, timedelta
        seven_days_ago = datetime.now() - timedelta(days=7)
        
        recent_users = user_collection.count_documents({
            "created_at": {"$gte": seven_days_ago}
        })
        
        recent_chats = chat_sessions_collection.count_documents({
            "created_at": {"$gte": seven_days_ago}
        })
        
        recent_reports = report_collection.count_documents({
            "timestamp": {"$gte": seven_days_ago}
        })
        
        return jsonify({
            "success": True,
            "statistics": {
                "users": {
                    "total": total_users,
                    "developers": total_developers,
                    "regular_users": total_users - total_developers,
                    "recent_signups": recent_users
                },
                "feature_usage": {
                    "chat_sessions": total_chats,
                    "reports_generated": total_reports,
                    "feedbacks_received": feature_usage["feedback"],
                    "most_used_feature": {
                        "name": most_used[0],
                        "count": most_used[1]
                    }
                },
                "recent_activity": {
                    "last_7_days": {
                        "new_users": recent_users,
                        "chat_sessions": recent_chats,
                        "reports": recent_reports
                    }
                }
            }
        }), 200

    except Exception as e:
        print(f"❌ Error in get_admin_statistics: {str(e)}")
        return jsonify({"error": str(e)}), 500


@feedback_bp.route("/api/admin/feedback/<feedback_id>", methods=["DELETE"])
@admin_required
def delete_feedback(feedback_id):
    """Delete a specific feedback - admin only"""
    try:
        from services.db_service import feedback_collection
        from bson import ObjectId
        
        result = feedback_collection.delete_one({"_id": ObjectId(feedback_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Feedback not found"}), 404
        
        print(f"✅ Feedback deleted: {feedback_id}")
        return jsonify({
            "success": True,
            "message": "Feedback deleted successfully"
        }), 200

    except Exception as e:
        print(f"❌ Error in delete_feedback: {str(e)}")
        return jsonify({"error": str(e)}), 500


@feedback_bp.route("/api/admin/feedback/<feedback_id>/status", methods=["PUT"])
@admin_required
def update_feedback_status(feedback_id):
    """Update feedback status (mark as resolved) - admin only"""
    try:
        from services.db_service import feedback_collection
        from bson import ObjectId
        from datetime import datetime
        
        data = request.json
        new_status = data.get("status", "resolved")
        
        # Validate status
        valid_statuses = ["new", "in-progress", "resolved"]
        if new_status not in valid_statuses:
            return jsonify({"error": f"Invalid status. Must be one of: {valid_statuses}"}), 400
        
        # Prepare update data
        update_data = {
            "status": new_status,
            "updated_at": datetime.utcnow()
        }
        
        # Add resolved_at timestamp when marking as resolved
        if new_status == "resolved":
            update_data["resolved_at"] = datetime.utcnow()
        
        result = feedback_collection.update_one(
            {"_id": ObjectId(feedback_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Feedback not found"}), 404
        
        print(f"✅ Feedback status updated: {feedback_id} -> {new_status}")
        return jsonify({
            "success": True,
            "message": "Feedback status updated successfully",
            "status": new_status
        }), 200

    except Exception as e:
        print(f"❌ Error in update_feedback_status: {str(e)}")
        return jsonify({"error": str(e)}), 500
