"""
Developer Access Management Script

This script manages the developers collection in AgriGPT database.
Only users in the developers collection can access the admin panel.

Usage:
    python make_admin.py add <email>       - Add user to developers collection
    python make_admin.py remove <email>    - Remove user from developers collection
    python make_admin.py list              - List all developers

Example:
    python make_admin.py add developer@example.com
"""

import sys
from services.db_service import user_collection, developers_collection
from datetime import datetime, timezone


def add_developer(email):
    """Add a user to the developers collection"""
    try:
        # Find user by email
        user = user_collection.find_one({"email": email})
        
        if not user:
            print(f"❌ Error: User with email '{email}' not found")
            print("   Please make sure the user has registered first.")
            return False
        
        user_id = str(user["_id"])
        
        # Check if already a developer
        existing = developers_collection.find_one({"user_id": user_id})
        if existing:
            print(f"ℹ️  User '{email}' is already a developer")
            return True
        
        # Add to developers collection
        result = developers_collection.insert_one({
            "user_id": user_id,
            "email": email,
            "name": user.get("name", ""),
            "added_at": datetime.now(timezone.utc),
            "role": "developer"
        })
        
        if result.inserted_id:
            print(f"✅ Success! User '{email}' added to developers collection")
            print(f"   Name: {user.get('name', 'N/A')}")
            print(f"   User ID: {user_id}")
            print(f"   Developer ID: {result.inserted_id}")
            return True
        else:
            print(f"❌ Error: Failed to add developer")
            return False
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False


def remove_developer(email):
    """Remove a user from the developers collection"""
    try:
        # Find user by email
        user = user_collection.find_one({"email": email})
        
        if not user:
            print(f"❌ Error: User with email '{email}' not found")
            return False
        
        user_id = str(user["_id"])
        
        # Remove from developers collection
        result = developers_collection.delete_one({"user_id": user_id})
        
        if result.deleted_count > 0:
            print(f"✅ Developer access removed from '{email}'")
            return True
        else:
            print(f"ℹ️  User '{email}' was not a developer")
            return False
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False


def list_developers():
    """List all developers"""
    try:
        developers = list(developers_collection.find({}))
        
        if not developers:
            print("\n📋 No developers found in the collection")
            print("   Use 'python make_admin.py add <email>' to add a developer")
            return
        
        print(f"\n📋 Developers ({len(developers)}):")
        print("=" * 70)
        for dev in developers:
            print(f"  • {dev.get('name', 'N/A')} ({dev.get('email', 'N/A')})")
            print(f"    User ID: {dev.get('user_id', 'N/A')}")
            print(f"    Role: {dev.get('role', 'developer')}")
            print(f"    Added: {dev.get('added_at', 'N/A')}")
            print("-" * 70)
        
    except Exception as e:
        print(f"❌ Error listing developers: {str(e)}")


def show_usage():
    """Show usage instructions"""
    print("""
AgriGPT Developer Access Management
====================================

The developers collection controls who can access the admin panel.
Only users in this collection can view user feedbacks and admin features.

Commands:
  python make_admin.py add <email>      - Add user to developers collection
  python make_admin.py remove <email>   - Remove user from developers collection
  python make_admin.py list             - List all developers

Examples:
  python make_admin.py add developer@example.com
  python make_admin.py remove user@example.com
  python make_admin.py list

Note: Users must have a registered account before being added as developers.
    """)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        show_usage()
        sys.exit(1)
    
    command = sys.argv[1].lower()
    
    if command == "list":
        list_developers()
    elif command == "add" and len(sys.argv) == 3:
        email = sys.argv[2]
        add_developer(email)
    elif command == "remove" and len(sys.argv) == 3:
        email = sys.argv[2]
        remove_developer(email)
    else:
        show_usage()
        sys.exit(1)
