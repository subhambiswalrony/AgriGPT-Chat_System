import firebase_admin
from firebase_admin import credentials, auth
import os
from utils.config import FIREBASE_CREDENTIALS_PATH

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK with service account credentials"""
    try:
        if not firebase_admin._apps:
            # Check if service account file exists
            if os.path.exists(FIREBASE_CREDENTIALS_PATH):
                cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)
                firebase_admin.initialize_app(cred)
                print("✅ Firebase Admin SDK initialized successfully")
            else:
                print(f"⚠️ Firebase credentials file not found at: {FIREBASE_CREDENTIALS_PATH}")
                print("Firebase authentication will not work without credentials")
    except Exception as e:
        print(f"❌ Error initializing Firebase: {str(e)}")


def verify_firebase_token(id_token):
    """
    Verify Firebase ID token and return decoded user information
    
    Args:
        id_token (str): Firebase ID token from frontend
        
    Returns:
        dict: Decoded token with user information
        
    Raises:
        Exception: If token verification fails
    """
    try:
        # Verify the ID token
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        raise Exception(f"Invalid Firebase token: {str(e)}")


def get_firebase_user_info(decoded_token):
    """
    Extract user information from decoded Firebase token
    
    Args:
        decoded_token (dict): Decoded Firebase ID token
        
    Returns:
        dict: User information including uid, email, name, provider
    """
    firebase_uid = decoded_token.get("uid")
    email = decoded_token.get("email")
    name = decoded_token.get("name", "")
    picture = decoded_token.get("picture", "")
    
    # Get sign-in provider (google.com, password, etc.)
    firebase_info = decoded_token.get("firebase", {})
    sign_in_provider = firebase_info.get("sign_in_provider", "unknown")
    
    return {
        "firebase_uid": firebase_uid,
        "email": email,
        "name": name,
        "picture": picture,
        "provider": map_provider_to_local(sign_in_provider)
    }


def map_provider_to_local(firebase_provider):
    """
    Map Firebase provider names to local provider names
    
    Args:
        firebase_provider (str): Firebase sign-in provider (e.g., google.com, password)
        
    Returns:
        str: Local provider name (google, local)
    """
    provider_map = {
        "google.com": "google",
        "password": "local",
        "facebook.com": "facebook"
    }
    return provider_map.get(firebase_provider, "unknown")
