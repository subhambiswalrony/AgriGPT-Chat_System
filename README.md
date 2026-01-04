# 🌾 AgriGPT - AI-Powered Agricultural Expert System

<div align="center">

**A Comprehensive Multilingual Agricultural Assistant for Indian Farmers**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange.svg)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Educational-yellow.svg)](LICENSE)

### 🎥 Demo Video

https://github.com/user-attachments/assets/f87369b5-98c8-497e-bbbb-40f3d373388b

> **Note**: To add the video, upload `preview/AgriGPT 2.0.mp4` to a GitHub issue/PR, then copy the generated URL and replace `YOUR_VIDEO_ID_HERE` above.

**Or watch locally**: [AgriGPT 2.0 Demo](preview/AgriGPT%202.0.mp4)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Quick Start Guide](#quick-start-guide)
- [Detailed Setup](#detailed-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Authentication System](#authentication-system)
- [Database Schema](#database-schema)
- [Deployment Guide](#deployment-guide)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## 🎯 Overview

**AgriGPT** is a cutting-edge agricultural expert system that leverages the power of artificial intelligence to provide real-time farming guidance to Indian farmers in their native languages. The platform combines advanced AI models (Google Gemini), modern web technologies, and Firebase authentication to deliver a seamless user experience across devices.

### 🌟 What Makes AgriGPT Special?

- **🗣️ Multilingual Support**: Communicate in 13+ Indian languages (Hindi, Odia, Bengali, Tamil, Telugu, and more)
- **🤖 AI-Powered Insights**: Powered by Google Gemini 2.5-flash for intelligent, context-aware responses
- **🎙️ Voice Input**: Offline speech-to-text using Faster Whisper for hands-free interaction
- **📊 Comprehensive Reports**: Generate detailed farming reports with crop-specific recommendations
- **☁️ Weather Integration**: Real-time weather data and agricultural advisories
- **🔐 Secure Authentication**: Dual authentication (Email/Password + Google Sign-In with Firebase)
- **📱 Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **🆓 Trial Mode**: Free access to text chat without registration

---

## 🚀 Key Features

### For Farmers

1. **Intelligent Chat Assistant**
   - Ask farming questions in your native language
   - Get instant AI-powered responses
   - Access specialized agricultural knowledge base
   - Voice input support for hands-free interaction

2. **Farming Report Generation**
   - Comprehensive crop-specific farming guides
   - Sowing advice and timing recommendations
   - Fertilizer planning and quantity guidance
   - Weather protection strategies
   - Week-by-week farming calendar

3. **Weather Dashboard**
   - Real-time local weather information
   - Temperature, humidity, and wind data
   - Weather forecasts for farm planning
   - Agricultural weather advisories

4. **User Profile Management**
   - Secure authentication with multiple methods
   - Profile customization with picture upload
   - Chat history access
   - Report history and downloads

### For Developers

1. **Modern Tech Stack**
   - React 18 with TypeScript for type safety
   - Flask backend with RESTful API design
   - MongoDB for scalable data storage
   - Firebase for OAuth 2.0 authentication

2. **Comprehensive Documentation**
   - Detailed API documentation
   - Setup guides for frontend and backend
   - Firebase integration instructions
   - Deployment guidelines

3. **Security Features**
   - JWT token-based authentication
   - Firebase Admin SDK for secure token verification
   - Password encryption with bcrypt
   - Protected API endpoints with decorators

4. **Extensible Architecture**
   - Modular service-based backend structure
   - Reusable React components
   - Custom hooks for state management
   - Context API for global state

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| TypeScript | 5.5.3 | Type Safety |
| Vite | 5.4.2 | Build Tool & Dev Server |
| TailwindCSS | 3.4.1 | Styling Framework |
| Firebase | 11.10.0 | Authentication (Google Sign-In) |
| Framer Motion | 12.23.3 | Animations |
| React Router | 7.6.3 | Client-side Routing |
| React Markdown | 10.1.0 | Markdown Rendering |
| jsPDF | 3.0.4 | PDF Generation |
| Lucide React | 0.344.0 | Icon Library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 3.0+ | Web Framework |
| Python | 3.8+ | Programming Language |
| MongoDB | Latest | Database |
| PyMongo | Latest | MongoDB Driver |
| Google Gemini | 2.5-flash | AI Language Model |
| Firebase Admin | Latest | Authentication Verification |
| Faster Whisper | Latest | Speech-to-Text (Offline) |
| PyJWT | Latest | JWT Token Management |
| Bcrypt | Latest | Password Hashing |
| LangDetect | Latest | Language Detection |

---

## 🏗️ Project Architecture

```
AgriGPT-Chat-Report_System/
│
├── frontend/                      # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components (Routes)
│   │   ├── config/                # Firebase & API configuration
│   │   ├── contexts/              # React contexts (Theme, etc.)
│   │   ├── hooks/                 # Custom React hooks
│   │   └── assets/                # Static assets (images, etc.)
│   ├── public/                    # Public static files
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # TailwindCSS configuration
│   └── README.md                  # Frontend documentation
│
├── backend/                       # Flask Backend API
│   ├── routes/                    # API route handlers
│   │   ├── auth_routes.py         # Authentication endpoints
│   │   └── otp_routes.py          # OTP verification
│   ├── services/                  # Business logic layer
│   │   ├── auth_service.py        # Authentication logic
│   │   ├── db_service.py          # Database operations
│   │   ├── firebase_service.py    # Firebase integration
│   │   ├── llm_service.py         # Gemini AI integration
│   │   ├── otp_service.py         # OTP generation
│   │   └── pdf_service.py         # PDF generation
│   ├── utils/                     # Utility functions
│   │   └── config.py              # Environment configuration
│   ├── app.py                     # Flask application entry
│   ├── chat.py                    # Chat handler logic
│   ├── voice.py                   # Voice input handler
│   ├── report.py                  # Report generation logic
│   ├── test_db.py                 # Database connection test
│   ├── requirements.txt           # Backend dependencies
│   ├── firebase-credentials.json  # Firebase service account key
│   └── README.md                  # Backend documentation
│
└── README.md                      # This file (Project overview)
```

### Architecture Flow

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │────────▶│   Frontend   │────────▶│   Backend   │
│             │  HTTPS  │  (React App) │   API   │  (Flask)    │
└─────────────┘         └──────────────┘         └─────────────┘
                              │                         │
                              │                         │
                        ┌─────▼─────┐            ┌─────▼──────┐
                        │  Firebase │            │  MongoDB   │
                        │   Auth    │            │  Database  │
                        └───────────┘            └────────────┘
                                                       │
                                                 ┌─────▼──────┐
                                                 │   Gemini   │
                                                 │     AI     │
                                                 └────────────┘
```

---

## ⚡ Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### 5-Minute Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System.git
   cd AgriGPT-Chat-Report_System
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure Backend Environment**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   # Edit .env with your credentials (MongoDB, Gemini API, Firebase)
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend Environment**
   ```bash
   # Create .env file in frontend directory
   cp .env.example .env
   # Edit .env with Firebase credentials
   ```

6. **Start the Application**
   ```bash
   # Terminal 1: Start Backend (from backend directory)
   python app.py
   
   # Terminal 2: Start Frontend (from frontend directory)
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📚 Detailed Setup

### Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   
   Create `.env` file in the `backend/` directory:
   
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB_NAME=agrigpt
   
   # JWT Secret Key
   JWT_SECRET_KEY=your-super-secret-jwt-key-change-this
   
   # Google Gemini API
   GOOGLE_API_KEY=your-gemini-api-key-from-google-ai-studio
   
   # Firebase Admin SDK
   FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
   
   # Server Configuration
   FLASK_ENV=development
   PORT=5000
   ```

5. **Setup Firebase Admin SDK**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the downloaded JSON file as `firebase-credentials.json` in `backend/` directory

6. **Test Database Connection**
   ```bash
   python test_db.py
   ```

7. **Start Backend Server**
   ```bash
   python app.py
   ```
   
   Server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create `.env` file in the `frontend/` directory:
   
   ```env
   # Backend API URL
   VITE_API_URL=http://localhost:5000
   
   # Firebase Configuration (from Firebase Console)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # Optional: Weather API
   VITE_WEATHER_API_KEY=your_weather_api_key
   ```

4. **Setup Firebase Authentication**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project → Authentication → Sign-in method
   - Enable **Google** sign-in provider
   - Add authorized domains (localhost, your deployment domain)

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Application will be available at `http://localhost:5173`

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```
3. MongoDB will run on `mongodb://localhost:27017/`

#### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Get connection string from "Connect" → "Connect your application"
4. Update `MONGODB_URI` in backend `.env` file

---

## 📂 Project Structure

### Frontend Structure

```
frontend/
├── src/
│   ├── components/              # Reusable components
│   │   ├── Navigation.tsx       # Nav bar with theme toggle
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Loader.tsx           # Loading spinner
│   │   └── ScrollToTop.tsx      # Scroll behavior
│   ├── pages/                   # Route pages
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── AuthPage.tsx         # Login/Signup with Google
│   │   ├── ChatPage.tsx         # AI chat interface
│   │   ├── ReportPage.tsx       # Farming reports
│   │   ├── WeatherPage.tsx      # Weather dashboard
│   │   ├── SettingsPage.tsx     # User settings
│   │   ├── TeamPage.tsx         # Team info
│   │   ├── FeedbackPage.tsx     # Feedback form
│   │   ├── UploadPage.tsx       # File upload (future)
│   │   ├── ResetPasswordPage.tsx # Password reset (future)
│   │   └── NotFoundPage.tsx     # 404 page
│   ├── config/                  # Configuration
│   │   ├── api.ts               # API endpoints & axios
│   │   ├── firebase.ts          # Firebase config
│   │   └── firebaseAuth.ts      # Firebase Auth init
│   ├── contexts/                # React contexts
│   │   └── ThemeContext.tsx     # Dark/Light theme
│   ├── hooks/                   # Custom hooks
│   │   └── useWeather.ts        # Weather data hook
│   ├── assets/                  # Static assets
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.ts               # Vite config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
└── README.md                    # Frontend docs
```

### Backend Structure

```
backend/
├── routes/                      # API routes
│   ├── auth_routes.py           # Auth endpoints
│   └── otp_routes.py            # OTP verification
├── services/                    # Business logic
│   ├── auth_service.py          # Auth operations
│   ├── db_service.py            # Database operations
│   ├── firebase_service.py      # Firebase integration
│   ├── llm_service.py           # Gemini AI
│   ├── otp_service.py           # OTP handling
│   └── pdf_service.py           # PDF generation
├── utils/                       # Utilities
│   └── config.py                # Config loader
├── app.py                       # Flask app entry
├── chat.py                      # Chat handler
├── voice.py                     # Voice handler
├── report.py                    # Report generator
├── test_db.py                   # DB test utility
├── requirements.txt             # Dependencies
├── .env                         # Environment vars
├── firebase-credentials.json    # Firebase key
└── README.md                    # Backend docs
```

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com
```

### Authentication Endpoints

#### 1. Signup (Email/Password)
```http
POST /api/signup
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "secure123",
  "name": "John Farmer"
}

Response:
{
  "token": "jwt_token_here",
  "user_id": "user_id_here",
  "name": "John Farmer",
  "email": "farmer@example.com"
}
```

#### 2. Login (Email/Password)
```http
POST /api/login
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "secure123"
}

Response:
{
  "token": "jwt_token_here",
  "user_id": "user_id_here",
  "name": "John Farmer",
  "email": "farmer@example.com"
}
```

#### 3. Google Sign-In
```http
POST /api/auth/google
Authorization: Bearer <firebase_id_token>

Response:
{
  "token": "jwt_token_here",
  "user_id": "user_id_here",
  "firebase_uid": "firebase_uid_here",
  "name": "John Farmer",
  "email": "farmer@example.com",
  "auth_providers": ["google"]
}
```

#### 4. Create Password for Google Users
```http
POST /api/create-password
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "password": "newsecure123"
}

Response:
{
  "message": "Password created successfully",
  "auth_providers": ["google", "local"]
}
```

### Chat Endpoints

#### 1. Text Chat
```http
POST /api/chat
Authorization: Bearer <jwt_token> (optional for trial)
Content-Type: application/json

{
  "message": "How do I grow tomatoes?",
  "user_id": "user_id_here" (or "trial_user")
}

Response:
{
  "response": "AI generated response...",
  "language": "english",
  "input_type": "text",
  "response_type": "AI"
}
```

#### 2. Voice Chat
```http
POST /api/chat/voice
Authorization: Bearer <jwt_token> (required)
Content-Type: multipart/form-data

{
  "audio": <audio_file>,
  "user_id": "user_id_here"
}

Response:
{
  "transcription": "Transcribed text",
  "response": "AI generated response...",
  "language": "hindi",
  "input_type": "voice"
}
```

### Report Endpoints

#### Generate Farming Report
```http
POST /api/generate-report
Authorization: Bearer <jwt_token> (optional)
Content-Type: application/json

{
  "crop": "Wheat",
  "region": "Punjab",
  "language": "hindi",
  "user_id": "user_id_here" (or "trial_user")
}

Response:
{
  "report": {
    "sowing": ["point1", "point2", "point3", "point4"],
    "fertilizer": ["point1", "point2", "point3", "point4"],
    "weather": ["point1", "point2", "point3", "point4"],
    "calendar": ["point1", "point2", "point3", "point4"]
  },
  "language": "hindi"
}
```

### User Profile Endpoints

#### 1. Update Profile
```http
PUT /api/update-profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "newemail@example.com",
  "profilePicture": "data:image/png;base64,..."
}
```

#### 2. Change Password
```http
PUT /api/change-password
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

---

## 🔐 Authentication System

### Dual Authentication Support

AgriGPT supports two authentication methods:

1. **Email/Password Authentication**
   - Traditional username/password system
   - Passwords hashed with bcrypt
   - JWT tokens for session management

2. **Google Sign-In (Firebase OAuth 2.0)**
   - One-click Google authentication
   - Firebase handles OAuth flow
   - Backend verifies Firebase tokens with Admin SDK
   - Google users can add password for dual auth

### Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ├─────▶ Email/Password ───▶ Backend ───▶ JWT Token
       │                            (Bcrypt)
       │
       └─────▶ Google Sign-In ───▶ Firebase ───▶ ID Token
                                      │
                                      ▼
                                  Backend Verify ───▶ JWT Token
                                  (Admin SDK)
```

### Protected Routes

All protected endpoints require JWT token in header:
```
Authorization: Bearer <jwt_token>
```

Protected endpoints:
- `/api/update-profile`
- `/api/change-password`
- `/api/create-password`
- `/api/chat/voice` (voice requires auth)

---

## 🗄️ Database Schema

### MongoDB Collections

#### 1. Users Collection (`users`)

```javascript
{
  "_id": ObjectId("..."),
  "email": "farmer@example.com",
  "password": "$2b$12$...", // Hashed password (optional for Google users)
  "name": "John Farmer",
  "profilePicture": "data:image/png;base64,...",
  "firebase_uid": "firebase_user_id", // Only for Google Sign-In users
  "auth_providers": ["google", "local"], // Array of auth methods
  "created_at": ISODate("2025-01-04T10:30:00.000Z"),
  "last_login": ISODate("2025-01-04T15:45:00.000Z")
}
```

#### 2. Chat History Collection (`chat_history`)

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "user_id_here",
  "message": "How do I grow rice?",
  "response": "AI generated response...",
  "language": "hindi",
  "input_type": "text", // or "voice"
  "response_type": "AI", // or "Fallback"
  "timestamp": ISODate("2025-01-04T16:20:00.000Z")
}
```

#### 3. Farming Reports Collection (`farming_reports`)

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "user_id_here",
  "crop": "Wheat",
  "region": "Punjab",
  "language": "hindi",
  "report": {
    "sowing": ["point1", "point2", "point3", "point4"],
    "fertilizer": ["point1", "point2", "point3", "point4"],
    "weather": ["point1", "point2", "point3", "point4"],
    "calendar": ["point1", "point2", "point3", "point4"]
  },
  "generated_at": ISODate("2025-01-04T14:10:00.000Z")
}
```

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel - Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - Framework: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables in Vercel**
   - `VITE_API_URL` → Your backend URL
   - `VITE_FIREBASE_API_KEY` → Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN` → Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID` → Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET` → Storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` → Sender ID
   - `VITE_FIREBASE_APP_ID` → App ID

4. **Update Firebase Authorized Domains**
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to authorized domains

### Backend Deployment (Render/Railway/Heroku)

#### Using Render

1. **Create `render.yaml` in root**
   ```yaml
   services:
     - type: web
       name: agrigpt-backend
       env: python
       buildCommand: pip install -r requirements.txt
       startCommand: python app.py
       envVars:
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET_KEY
           sync: false
         - key: GOOGLE_API_KEY
           sync: false
   ```

2. **Deploy to Render**
   - Go to [Render](https://render.com/)
   - Click "New Web Service"
   - Connect GitHub repository
   - Select `backend` directory
   - Add environment variables
   - Deploy

3. **Upload Firebase Credentials**
   - Use Render's file upload feature for `firebase-credentials.json`
   - Or use environment variable with JSON content

### Database Deployment (MongoDB Atlas)

1. **Create MongoDB Atlas Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free tier cluster
   - Configure network access (allow from anywhere: 0.0.0.0/0)
   - Create database user

2. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Update `MONGODB_URI` in backend environment variables

---

## 🧪 Testing

### Backend Testing

```bash
# Activate virtual environment
source venv/bin/activate  # Windows: venv\Scripts\activate

# Test database connection
python test_db.py

# Run backend
python app.py
```

### Frontend Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### API Testing with Postman

1. Import the provided Postman collection (if available)
2. Or manually test endpoints:
   - Signup: `POST http://localhost:5000/api/signup`
   - Login: `POST http://localhost:5000/api/login`
   - Chat: `POST http://localhost:5000/api/chat`

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'flask'`
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

**Problem**: `MongoDB connection refused`
```bash
# Solution: Start MongoDB service
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Problem**: `Firebase: The default Firebase app does not exist`
```bash
# Solution: Ensure firebase-credentials.json exists in backend directory
# Download from Firebase Console → Project Settings → Service Accounts
```

**Problem**: `KeyError: 'GOOGLE_API_KEY'`
```bash
# Solution: Create .env file with all required variables
# Copy from .env.example and fill in your values
```

#### Frontend Issues

**Problem**: `Failed to resolve import 'firebase/auth'`
```bash
# Solution: Install Firebase
npm install firebase
```

**Problem**: `Firebase: Error (auth/configuration-not-found)`
```bash
# Solution: Create .env file with all VITE_FIREBASE_* variables
# Get from Firebase Console → Project Settings
```

**Problem**: `Network Error: ERR_CONNECTION_REFUSED`
```bash
# Solution: Ensure backend is running on http://localhost:5000
# Check VITE_API_URL in .env matches backend URL
```

#### Google Sign-In Issues

**Problem**: Google Sign-In popup closes without authentication
```bash
# Solution 1: Add localhost to Firebase authorized domains
# Firebase Console → Authentication → Settings → Authorized domains

# Solution 2: Enable Google Sign-In method
# Firebase Console → Authentication → Sign-in method → Enable Google
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Contribution Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   - Test both frontend and backend
   - Ensure no breaking changes

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Your feature description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub and create a pull request
   - Describe your changes in detail

### Code Style Guidelines

- **Frontend**: Follow TypeScript best practices, use functional components
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use conventional commit messages (Add, Fix, Update, Remove)

---

## 👥 Team

### Project Contributors

<table>
  <tr>
    <td align="center">
      <strong>Subham Biswal</strong><br>
      <em>Team Member</em><br>
    </td>
    <td align="center">
      <strong>Vivekananda Champati</strong><br>
      <em>Team Member</em><br>
    </td>
    <td align="center">
      <strong>Tusar kanta Das</strong><br>
      <em>Team Member</em><br>
    </td>
    <td align="center">
      <strong>Swabhiman Mohanty</strong><br>
      <em>Team Member</em><br>
    </td>
  </tr>
</table>

---

## 📄 License

This project is developed as part of a Major Project for educational purposes.

---

## 🔗 Important Links

- **GitHub Repository**: [AgriGPT-Chat-Report_System](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System)
- **Frontend Documentation**: [frontend/README.md](frontend/README.md)
- **Backend Documentation**: [backend/README.md](backend/README.md)
- **Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com/)
- **MongoDB Atlas**: [cloud.mongodb.com](https://cloud.mongodb.com/)
- **Google AI Studio**: [makersuite.google.com](https://makersuite.google.com/)

---

## 📞 Support & Contact

For questions, issues, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System/issues)
- **Email**: biswalsubhamrony@gmail.com

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powering intelligent responses
- **Firebase** for authentication infrastructure
- **MongoDB** for database services
- **Faster Whisper** for offline speech recognition
- **Indian Farmers** for inspiration and feedback

---

<div align="center">

**Built with ❤️ for Indian Farmers**

**AgriGPT** © 2026 | All Rights Reserved

[⬆ Back to Top](#-agrigpt---ai-powered-agricultural-expert-system)

</div>
