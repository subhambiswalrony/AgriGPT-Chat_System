from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import handle_chat
from voice import handle_voice
from services.db_service import get_chat_history
from routes.auth_routes import auth_bp, token_required

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)

@app.route("/")
def health():
    return {"status": "AgriGPT Backend Running 🌾"}

@app.route("/api/chat", methods=["POST"])
@token_required
def chat_api():
    try:
        user_id = request.current_user["user_id"]
        message = request.json.get("message")
        if not message:
            return jsonify({"error": "Message is required"}), 400
        reply = handle_chat(user_id, message)
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Error in chat_api: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/voice", methods=["POST"])
@token_required
def voice_api():
    user_id = request.current_user["user_id"]
    audio = request.files["audio"]
    return jsonify(handle_voice(audio, user_id))

@app.route("/api/history", methods=["GET"])
@token_required
def history():
    user_id = request.current_user["user_id"]
    return jsonify(get_chat_history(user_id))

if __name__ == "__main__":
    app.run(debug=True)
