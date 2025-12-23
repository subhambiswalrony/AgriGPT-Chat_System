# 🌾 AgriGPT - Agricultural Expert Chatbot Backend

A multilingual AI-powered chatbot designed to assist Indian farmers with agriculture and farming-related queries. Built with Flask and powered by Google's Gemini AI.

## 🚀 Core Features

### 1. **Multilingual Support**
- Supports 13+ Indian languages including:
  - English, Hindi, Odia, Bengali, Tamil, Telugu
  - Kannada, Malayalam, Marathi, Gujarati, Punjabi, Urdu, Assamese
- Automatic language detection with Odia-safe Unicode handling
- Responds in the same language as the user's query

### 2. **AI-Powered Chat**
- Google Gemini 2.5-flash integration for intelligent responses
- Specialized agricultural knowledge base covering:
  - Crop cultivation practices
  - Fertilizers and soil types
  - Irrigation techniques
  - Pest and disease management
  - Weather impact on farming
  - Indian government agriculture schemes
- Smart filtering: Only responds to agriculture-related queries

### 3. **Voice Input Support**
- Speech-to-text transcription using Faster Whisper
- Audio file processing (supports multiple formats)
- Voice queries in multiple Indian languages

### 4. **User Authentication**
- JWT-based authentication system
- Secure user signup and login
- Password encryption with bcrypt
- Token-based API protection
- Automatic timestamp tracking:
  - Account creation time (`created_at`)
  - Last login time (`last_login`)

### 5. **Chat History Management**
- Complete conversation history stored in MongoDB
- Tracks response types (AI vs Fallback)
- Language detection per conversation
- Timestamped messages for all interactions

### 6. **Database Integration**
- MongoDB for data persistence
- Database: `agrigpt`
- Collections:
  - `users` - User accounts with authentication details and timestamps
  - `chat_history` - Complete conversation logs with metadata
  

## 📋 API Endpoints

### Health Check
- `GET /` - Server health status

### Authentication
- `POST /api/signup` - User registration (email, password, name)
- `POST /api/login` - User authentication (returns JWT token)

### Chat (Protected)
- `POST /api/chat` - Send text message (requires Bearer token)
- `POST /api/voice` - Send voice input (requires Bearer token)
- `GET /api/history` - Retrieve chat history (requires Bearer token)

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.8 or higher
- MongoDB installed and running
- Google Gemini API key

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd "Major Project/backend"
   ```

2. **Create Virtual Environment** (Recommended)
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```env
   # Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/
   MONGO_DB=agrigpt
   
   # JWT Configuration (Optional)
   JWT_SECRET_KEY=your-secret-key-here
   JWT_EXPIRY_HOURS=24
   ```

5. **Start MongoDB**
   ```bash
   # Windows
   mongod
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

6. **Run the Application**
   ```bash
   python app.py
   ```

   Server will start at: `http://localhost:5000`

## 📦 Dependencies

- **flask** - Web framework
- **flask-cors** - Cross-origin resource sharing
- **google-generativeai** - Gemini AI integration
- **pymongo** - MongoDB driver
- **pyjwt** - JWT token handling
- **bcrypt** - Password hashing
- **faster-whisper** - Speech recognition
- **langdetect** - Language detection
- **pydub** - Audio processing
- **python-dotenv** - Environment variable management

## 📁 Project Structure

```
backend/
├── app.py                  # Main Flask application
├── chat.py                 # Text chat handler with language detection
├── voice.py                # Voice input handler with STT
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (create this)
├── routes/
│   └── auth_routes.py     # Authentication endpoints
├── services/
│   ├── auth_service.py    # User auth logic with timestamps
│   ├── db_service.py      # MongoDB operations
│   └── llm_service.py     # Gemini AI integration
└── utils/
    └── config.py          # Configuration management
```

## 🔐 Authentication Flow

1. **Signup**: POST `/api/signup` with `{email, password, name}`
   - Returns JWT token and user details
   - Creates timestamp for account creation

2. **Login**: POST `/api/login` with `{email, password}`
   - Returns JWT token
   - Updates last login timestamp

3. **Protected Endpoints**: Include token in header
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 🧪 Testing with Postman

### 1. Signup
```json
POST http://localhost:5000/api/signup
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "secure123",
  "name": "John Farmer"
}
```

### 2. Login
```json
POST http://localhost:5000/api/login
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "secure123"
}
```

### 3. Chat (Agricultural Query)
```json
POST http://localhost:5000/api/chat
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "message": "धान की खेती के लिए कौन सी मिट्टी सबसे अच्छी है?"
}
```

### 4. Get History
```
GET http://localhost:5000/api/history
Authorization: Bearer <your-token>
```

## 🌐 Language Support Examples

- **English**: "What is the best fertilizer for rice?"
- **Hindi**: "धान के लिए सबसे अच्छा उर्वरक कौन सा है?"
- **Odia**: "ଧାନ ପାଇଁ ସର୍ବୋତ୍ତମ ସାର କେଉଁଟି?"
- **Bengali**: "ধানের জন্য সেরা সার কোনটি?"

## 📊 Database Schema

MongoDB Database: `agrigpt`

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "farmer@example.com",
  "password": "hashed_password",
  "name": "John Farmer",
  "created_at": ISODate,
  "last_login": ISODate
}
```

### Chat History Collection
```json
{
  "_id": ObjectId,
  "user_id": "user_object_id",
  "question": "User's question",
  "answer": "AI's response",
  "response_type": "ai" | "fallback",
  "language": "Hindi",
  "timestamp": ISODate
}
```

### Users Connections Collection
```json
{
  "_id": ObjectId,
  "user_id": "user_object_id",
  "connection_data": {},
  "timestamp": ISODate
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env` file

### Gemini API Error
- Verify GEMINI_API_KEY is correct
- Check API quota limits

### Language Detection Issues
- Ensure `langdetect` is installed
- Odia text uses special Unicode handling

### Audio Processing Error
- Install ffmpeg for audio format support
- Check audio file format compatibility

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is part of a Major Project for educational purposes.

## 👨‍💻 Developer

Created with ❤️ for Indian farmers

---

**Note**: Replace `<your-token>` and API keys with actual values when testing.