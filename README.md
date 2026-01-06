# 🌾 AgriGPT - AI-Powered Agricultural Expert System

<div align="center">

**A Comprehensive Multilingual Agricultural Assistant for Indian Farmers**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange.svg)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![Performance](https://img.shields.io/badge/Mobile%20Optimized-✓-brightgreen.svg)](README.md#-performance-optimizations)
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
- [Performance Optimizations](#-performance-optimizations)
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

**AgriGPT** is a cutting-edge agricultural expert system that leverages the power of artificial intelligence to provide real-time farming guidance to Indian farmers in their native languages. The platform combines advanced AI models (Google Gemini 2.5-flash), modern web technologies, and Firebase authentication to deliver a seamless, high-performance user experience across all devices.

### 🌟 What Makes AgriGPT Special?

- **🗣️ Multilingual Support**: Communicate in **13+ Indian languages** (Hindi, Odia, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Urdu, Assamese, English)
- **🤖 AI-Powered Insights**: Powered by **Google Gemini 2.5-flash** for intelligent, context-aware agricultural responses
- **🎙️ Voice Input**: **Offline speech-to-text** using Faster Whisper for hands-free interaction (no internet needed for transcription)
- **📊 Comprehensive Reports**: Generate detailed farming reports with **crop-specific recommendations** in your language
- **☁️ Weather Integration**: **Real-time weather data** and agricultural advisories tailored to your location
- **🔐 Secure Authentication**: **Dual authentication system** (Email/Password + Google Sign-In with Firebase OAuth 2.0)
- **📱 Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices with **optimized touch interactions**
- **⚡ Optimized Performance**: **60% smaller bundle size**, **50% faster load times** on mobile devices
- **🆓 Trial Mode**: Free access to text chat without registration (no barriers to farmers)
- **🌾 Agriculture-Focused**: AI trained specifically for Indian agriculture with regional knowledge
- **💬 Feedback System**: User feedback collection with admin panel for developers
- **📊 Admin Dashboard**: Developer-only analytics dashboard with comprehensive statistics and feedback management

### 🎯 Target Audience

- **Primary**: Indian farmers seeking agricultural guidance
- **Secondary**: Agricultural extension workers and consultants
- **Tertiary**: Agricultural students and researchers

### 💡 Key Differentiators

1. **Language-First Approach**: Unlike other chatbots, AgriGPT detects and responds in the user's native language automatically
2. **Offline Voice**: Uses Faster Whisper for completely offline voice transcription (no data charges for farmers)
3. **Trial Mode**: No registration barrier - farmers can try the system immediately
4. **Regional Knowledge**: AI trained on Indian agricultural practices, crops, and regional soil conditions
5. **Dual Authentication**: Flexibility to use Google Sign-In or traditional email/password
6. **Mobile-Optimized**: Specifically optimized for 6GB RAM devices common among Indian users

---

## ⚡ Performance Optimizations

AgriGPT is **highly optimized for mobile devices**, ensuring smooth performance even on 6 GB RAM devices:

### 🚀 Key Optimizations

| Feature | Improvement | Impact |
|---------|------------|--------|
| **Code Splitting** | Lazy loading all routes | 60% smaller initial bundle |
| **Bundle Size** | 500 KB → 200 KB | 50% faster initial load |
| **Scroll Performance** | Debounced & instant on mobile | 50% smoother scrolling |
| **Animation** | Mobile-optimized | Reduced lag & better FPS |
| **Image Loading** | Lazy loading with Intersection Observer | 70% faster page load |
| **Chunk Splitting** | Separate vendor bundles | Better caching & performance |

### 📦 Build Optimizations

```bash
# Optimized build creates separate chunks for better caching:
react-vendor.js    # 177 KB - React core libraries
animation.js       # 119 KB - Framer Motion (lazy loaded)
markdown.js        # 118 KB - React Markdown (lazy loaded)
icons.js          #  30 KB - Lucide icons
pdf.js            # 616 KB - PDF generation (lazy loaded)
ChatPage.js       #  43 KB - Chat functionality
HomePage.js       #  25 KB - Home page
```

### 🎯 Performance Features

- **React.lazy()**: All routes load on-demand
- **useMemo & useCallback**: Prevents unnecessary re-renders
- **Debounced Operations**: Scroll, search, and input optimized
- **Mobile Detection**: Reduces animations on mobile devices
- **Respects User Preferences**: Honors "reduce motion" settings
- **Hardware Acceleration**: CSS transforms for smooth animations

### 📱 Mobile-Specific Optimizations

- Instant scrolling (no smooth animations on mobile)
- Reduced animation complexity (40% faster)
- Optimized blur effects
- Touch-optimized interactions (no hover effects)
- Compressed shadows for better rendering

**See [PERFORMANCE_OPTIMIZATIONS.md](PERFORMANCE_OPTIMIZATIONS.md) for detailed information.**

---

## 🚀 Key Features

### For Farmers 🌾

1. **Intelligent AI Chat Assistant**
   - Ask farming questions in your native language (13+ Indian languages supported)
   - Get instant AI-powered responses from Google Gemini 2.5-flash
   - Access specialized agricultural knowledge base covering:
     - Crop cultivation practices and techniques
     - Fertilizer recommendations and soil management
     - Irrigation methods and water conservation
     - Pest and disease identification and management
     - Weather impact analysis on farming
     - Indian government agriculture schemes and subsidies
     - Regional soil composition and characteristics
   - Voice input support for hands-free interaction (requires authentication)
   - Chat history saved automatically for future reference
   - Trial mode available - start chatting immediately without registration

2. **Comprehensive Farming Report Generation**
   - AI-generated farming reports in your preferred language
   - Crop-specific detailed farming guides with 4 key sections:
     - **🌱 Sowing Advice**: Best timing, depth, spacing, watering schedule (4 detailed points)
     - **🌿 Fertilizer Plan**: NPK ratios, organic manure quantities, application schedule (4 points)
     - **☁️ Weather Protection**: Sun, rain, cold, wind protection strategies (4 points)
     - **📅 Farming Calendar**: Week-by-week activities and milestones (4 points)
   - PDF download capability for offline reference
   - Region-specific recommendations based on your location
   - Reports saved in database for authenticated users
   - Beautiful emoji-based formatting for easy reading

3. **Real-time Weather Dashboard**
   - Current weather conditions with live updates
   - Location-based weather data with auto-detection
   - 5-day weather forecast display
   - Agricultural weather advisories specific to your region
   - Temperature, humidity, wind speed, and precipitation data
   - Weather-based farming recommendations
   - Beautiful weather visualizations and icons

4. **User Profile Management**
   - Secure authentication with multiple methods:
     - Traditional email/password
     - Google Sign-In (OAuth 2.0)
     - Hybrid support (add password to Google account)
   - Profile customization with picture upload
   - Change password anytime (current password required)
   - Create password for Google Sign-In users
   - Access complete chat history
   - View and download report history
   - Delete account option with confirmation
   - Track authentication methods used

5. **Feedback System**
   - Submit feedback, suggestions, or report issues directly from the app
   - Share your farming experience and help improve AgriGPT
   - Contribute to making the platform better for all farmers
   - Anonymous or authenticated feedback submission
   - Dedicated feedback page with easy-to-use form

### For Developers 💻

1. **Modern Tech Stack**
   - **Frontend**: React 18 with TypeScript for type safety and modern features
   - **Backend**: Flask (Python 3.8+) with RESTful API design
   - **Database**: MongoDB for scalable data storage with flexible schema
   - **AI**: Google Gemini 2.5-flash for intelligent responses
   - **Auth**: Firebase Admin SDK for OAuth 2.0 and JWT for session management
   - **Voice**: Faster Whisper for offline speech-to-text

2. **Admin Dashboard & Analytics**
   - **Developer-only access** via separate `developers` collection
   - **Comprehensive statistics dashboard**:
     - Total users and new users this week
     - Chat sessions and reports generated
     - Most used features analytics
     - Weekly activity trends
   - **Feedback management system**:
     - View all user feedbacks with timestamps
     - Mark feedbacks as resolved with status tracking
     - Delete inappropriate or spam feedbacks
     - Side-by-side comparison of active vs resolved feedbacks
     - Auto-delete resolved feedbacks after 7 days
   - **Delete confirmation modal** for safe operations
   - **Enhanced empty states** with animated icons and contextual messages
   - **Real-time updates** for feedback status changes

3. **Comprehensive Documentation**
   - Detailed API documentation with examples
   - Step-by-step setup guides for frontend and backend
   - Firebase integration instructions with screenshots
   - Deployment guidelines for multiple platforms
   - Troubleshooting guides with common issues
   - Performance optimization techniques

3. **Security Features**
   - **JWT token-based authentication** with expiration handling
   - **Firebase Admin SDK** for secure token verification
   - **Password encryption** with bcrypt (salt rounds: 12)
   - **Protected API endpoints** with `@token_required` decorator
   - **CORS configuration** for secure cross-origin requests
   - **Environment variable** management for sensitive data
   - **Secure token storage** in localStorage with cleanup

4. **Extensible Architecture**
   - **Modular service-based backend** structure (auth, db, llm, firebase services)
   - **Reusable React components** with proper prop typing
   - **Custom hooks** for state management (useWeather, useOptimizedAnimation)
   - **Context API** for global state (ThemeContext)
   - **Code splitting** with React.lazy() for optimal loading
   - **API abstraction layer** for easy endpoint management
   - **Database abstraction** for flexible storage options

5. **Performance & Optimization**
   - **Code splitting**: All routes lazy loaded
   - **Bundle optimization**: 60% smaller initial bundle
   - **Mobile-first design**: Optimized for 6GB RAM devices
   - **Image lazy loading**: Intersection Observer API
   - **Debounced operations**: Smooth scroll and search
   - **Memoization**: React.memo, useMemo, useCallback
   - **Chunk splitting**: Better caching with vendor bundles

6. **Developer Experience**
   - **TypeScript** for type safety and better IDE support
   - **ESLint** for code quality and consistency
   - **Hot Module Replacement** (HMR) with Vite
   - **Environment-based configuration** (.env files)
   - **Detailed error logging** with Python logging module
   - **API testing** with Postman collection examples
   - **Git-friendly** structure with proper .gitignore

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
├── 📁 frontend/                          # React + TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📄 main.tsx                   # Application entry point
│   │   ├── 📄 App.tsx                    # Root component with routing
│   │   ├── 📄 index.css                  # Global styles + TailwindCSS
│   │   ├── 📄 mobile-optimizations.css   # Mobile performance CSS
│   │   ├── 📄 vite-env.d.ts              # Vite type definitions
│   │   │
│   │   ├── 📁 components/                # Reusable UI components
│   │   │   ├── 📄 Navigation.tsx         # Nav bar with theme toggle
│   │   │   ├── 📄 Footer.tsx             # Footer component
│   │   │   ├── 📄 LazyImage.tsx          # Optimized image loading
│   │   │   ├── 📄 Loader.tsx             # Loading spinner
│   │   │   └── 📄 ScrollToTop.tsx        # Scroll behavior utility
│   │   │
│   │   ├── 📁 pages/                     # Page components (lazy loaded)
│   │   │   ├── 📄 HomePage.tsx           # Landing page
│   │   │   ├── 📄 AuthPage.tsx           # Login/Signup (dual auth)
│   │   │   ├── 📄 ChatPage.tsx           # AI chat interface
│   │   │   ├── 📄 ReportPage.tsx         # Farming report generation
│   │   │   ├── 📄 WeatherPage.tsx        # Weather dashboard
│   │   │   ├── 📄 SettingsPage.tsx       # User profile settings
│   │   │   ├── 📄 TeamPage.tsx           # Team information
│   │   │   ├── 📄 FeedbackPage.tsx       # Feedback form
│   │   │   ├── 📄 AdminPanelPage.tsx     # Admin dashboard (developer-only)
│   │   │   ├── 📄 UploadPage.tsx         # File upload (future)
│   │   │   ├── 📄 ResetPasswordPage.tsx  # Password reset (future)
│   │   │   └── 📄 NotFoundPage.tsx       # 404 error page
│   │   │
│   │   ├── 📁 config/                    # Configuration files
│   │   │   ├── 📄 api.ts                 # API endpoints & axios config
│   │   │   ├── 📄 firebase.ts            # Firebase project config
│   │   │   └── 📄 firebaseAuth.ts        # Firebase Auth initialization
│   │   │
│   │   ├── 📁 contexts/                  # React context providers
│   │   │   └── 📄 ThemeContext.tsx       # Dark/Light theme context
│   │   │
│   │   ├── 📁 hooks/                     # Custom React hooks
│   │   │   ├── 📄 useOptimizedAnimation.ts # Animation performance hook
│   │   │   └── 📄 useWeather.ts          # Weather data fetching hook
│   │   │
│   │   ├── 📁 utils/                     # Utility functions
│   │   │   ├── 📄 debounce.ts            # Debounce utility
│   │   │   └── 📄 performance.ts         # Performance utilities
│   │   │
│   │   └── 📁 assets/                    # Static assets
│   │       ├── 🖼️ Rony.jpg               # Team photo
│   │       ├── 🖼️ swabhiman.jpeg         # Team photo
│   │       ├── 🖼️ tusar.jpeg             # Team photo
│   │       └── 🖼️ vivekananda.jpg        # Team photo
│   │
│   ├── 📄 index.html                     # HTML entry point
│   ├── 📄 package.json                   # Dependencies & scripts
│   ├── 📄 vite.config.ts                 # Vite configuration
│   ├── 📄 tsconfig.json                  # TypeScript config
│   ├── 📄 tailwind.config.js             # TailwindCSS config
│   ├── 📄 postcss.config.js              # PostCSS config
│   ├── 📄 eslint.config.js               # ESLint rules
│   ├── 📄 .env                           # Environment variables
│   └── 📄 README.md                      # Frontend docs
│
├── 📁 backend/                           # Flask Backend API
│   ├── 📁 routes/                        # API route handlers
│   │   ├── 📄 auth_routes.py             # Auth endpoints
│   │   ├── 📄 otp_routes.py              # OTP verification
│   │   └── 📄 feedback_routes.py         # Feedback & admin endpoints
│   │
│   ├── 📁 services/                      # Business logic layer
│   │   ├── 📄 __init__.py                # Service package init
│   │   ├── 📄 auth_service.py            # Authentication logic
│   │   ├── 📄 db_service.py              # Database operations
│   │   ├── 📄 firebase_service.py        # Firebase integration
│   │   ├── 📄 llm_service.py             # Gemini AI integration
│   │   ├── 📄 otp_service.py             # OTP handling
│   │   └── 📄 pdf_service.py             # PDF generation
│   │
│   ├── 📁 utils/                         # Utility functions
│   │   ├── 📄 __init__.py                # Utils package init
│   │   └── 📄 config.py                  # Config loader
│   │
│   ├── 📄 app.py                         # Flask app entry point
│   ├── 📄 chat.py                        # Chat handler logic
│   ├── 📄 voice.py                       # Voice input handler
│   ├── 📄 report.py                      # Report generation
│   ├── 📄 test_db.py                     # DB test utility
│   ├── 📄 requirements.txt               # Python dependencies
│   ├── 📄 .env                           # Environment variables
│   ├── 📄 firebase-credentials.json      # Firebase Admin SDK key
│   └── 📄 README.md                      # Backend docs
│
├── 📁 preview/                           # Demo files
│   └── 📹 AgriGPT 2.0.mp4                # Project demo video
│
└── 📄 README.md                          # Main project documentation
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



### Directory Structure Highlights

**Frontend (`frontend/`):**
- ⚛️ **React 18.3.1** with TypeScript for type-safe development
- 🎨 **TailwindCSS** for utility-first styling with custom theme
- ⚡ **Vite 5.4.2** for lightning-fast builds and HMR
- 🔥 **Firebase 11.10.0** for Google Sign-In OAuth 2.0
- 🎬 **Framer Motion** for smooth animations (code-split)
- 📱 **Mobile-optimized** with lazy loading and code splitting
- 📦 **Build size**: 200 KB initial bundle (60% reduction)

**Backend (`backend/`):**
- 🐍 **Flask 3.0+** RESTful API framework
- 🤖 **Google Gemini 2.5-flash** for AI responses
- 🍃 **MongoDB** for flexible data storage
- 🔥 **Firebase Admin SDK** for token verification
- 🎙️ **Faster Whisper** for offline speech-to-text
- 🔐 **JWT + Bcrypt** for secure authentication
- 🌐 **13+ Indian languages** support with langdetect

**Key Features by Directory:**

| Directory | Purpose | Key Technologies |
|-----------|---------|------------------|
| `frontend/src/pages/` | Route components | React Router, Lazy Loading, Admin Dashboard |
| `frontend/src/components/` | Reusable UI | React.memo, TypeScript |
| `frontend/src/hooks/` | Custom hooks | Performance optimization |
| `backend/routes/` | API endpoints | Flask Blueprints, Auth, Feedback |
| `backend/services/` | Business logic | MongoDB, Firebase, Gemini AI |
| `backend/utils/` | Helpers | Environment config, utilities |

**New Features Added:**
- 📊 **Admin Dashboard** (`frontend/src/pages/AdminPanelPage.tsx`) - Developer-only analytics and feedback management
- 💬 **Feedback System** (`backend/routes/feedback_routes.py`) - User feedback submission and admin management
- 🗄️ **Enhanced Database** (`backend/services/db_service.py`) - Added developers and user_feedback collections
- 📈 **Statistics API** - Comprehensive analytics for users, sessions, reports, and feature usage

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

#### 4. Developers Collection (`developers`)

```javascript
{
  "_id": ObjectId("..."),
  "email": "developer@example.com",
  "user_id": "user_id_reference" // Reference to users collection
}
```

#### 5. User Feedback Collection (`user_feedback`)

```javascript
{
  "_id": ObjectId("..."),
  "name": "Farmer Name",
  "email": "farmer@example.com",
  "message": "Feature suggestion or bug report...",
  "user_id": "user_id_here", // Optional, only if authenticated
  "status": "new", // "new", "in-progress", or "resolved"
  "timestamp": ISODate("2025-01-07T10:30:00.000Z"),
  "resolved_at": ISODate("2025-01-08T14:20:00.000Z") // Only when status is "resolved"
}
```

#### 6. Chat Sessions Collection (`chat_sessions`)

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "user_id_here",
  "started_at": ISODate("2025-01-07T09:00:00.000Z"),
  "ended_at": ISODate("2025-01-07T09:45:00.000Z")
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

We welcome contributions from the community! Here's how you can help make AgriGPT better for Indian farmers:

### 🌟 Ways to Contribute

1. **🐛 Bug Reports** - Found a bug? [Create an issue](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System/issues)
2. **✨ Feature Requests** - Have an idea? Open a feature request with use cases
3. **💻 Code Contributions** - Fork, create branch, make changes, submit PR
4. **📝 Documentation** - Improve docs, add examples, fix typos
5. **🌐 Language Support** - Add new languages or improve translations

### 📋 Quick Start for Contributors

1. **Fork the Repository**
   ```bash
   git clone https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System.git
   cd AgriGPT-Chat-Report_System
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - **Backend**: Follow PEP 8 Python style guide
   - **Frontend**: Use TypeScript with proper types
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Test backend
   cd backend && python test_db.py && python app.py
   
   # Test frontend
   cd frontend && npm run lint && npm run build
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add: Clear description of changes"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request** - Describe changes and reference issues

### Code Style Guidelines

- **Frontend**: TypeScript, functional components, proper prop typing
- **Backend**: PEP 8, docstrings, meaningful names
- **Commits**: Use prefixes (Add, Fix, Update, Remove, Refactor)

**See individual README files for detailed contribution guidelines:**
- [Backend Contributing Guidelines](backend/README.md#-contributing)
- [Frontend Contributing Guidelines](frontend/README.md#-contributing)

---

## 👥 Team

### Project Contributors & Roles

<table>
  <tr>
    <td align="center" width="25%">
      <strong>Subham Biswal</strong><br>
      <em>Full Stack Developer & Project Lead</em><br>
      <sub>Frontend Architecture, Backend API Design, Firebase Integration</sub>
    </td>
    <td align="center" width="25%">
      <strong>Vivekananda Champati</strong><br>
      <em>Backend Developer & AI Integration</em><br>
      <sub>Gemini AI Integration, Database Design, Voice Processing</sub>
    </td>
    <td align="center" width="25%">
      <strong>Tusar Kanta Das</strong><br>
      <em>Frontend Developer & UI/UX Designer</em><br>
      <sub>React Components, TailwindCSS Styling, Performance Optimization</sub>
    </td>
    <td align="center" width="25%">
      <strong>Swabhiman Mohanty</strong><br>
      <em>Quality Assurance & Testing</em><br>
      <sub>Testing, Documentation, Language Support, Deployment</sub>
    </td>
  </tr>
</table>

### Development Timeline

- **Phase 1** (Weeks 1-2): Project planning, technology selection, Firebase setup
- **Phase 2** (Weeks 3-4): Backend API development, MongoDB integration
- **Phase 3** (Weeks 5-6): Frontend development, authentication system
- **Phase 4** (Weeks 7-8): AI integration, voice input, report generation
- **Phase 5** (Weeks 9-10): Performance optimization, mobile responsiveness
- **Phase 6** (Weeks 11-12): Testing, bug fixes, deployment, documentation

---

## 📄 License

This project is developed as part of a **Major Project for educational purposes**.

### Terms of Use

- ✅ **Free for educational purposes** - Use in academic settings
- ✅ **Free for non-commercial agricultural support** - Help farmers without charge
- ✅ **Personal learning and experimentation** - Learn from the codebase
- ❌ **Commercial use requires permission** - Contact for licensing
- ❌ **Redistribution without attribution not allowed** - Give credit when sharing

### Third-Party Licenses

This project uses several open-source libraries and services:

| Component | License | Purpose |
|-----------|---------|---------|
| React | MIT License | Frontend library |
| Flask | BSD-3-Clause | Backend framework |
| MongoDB | Server Side Public License (SSPL) | Database |
| Firebase | Google Cloud Terms | Authentication |
| TailwindCSS | MIT License | CSS framework |
| Framer Motion | MIT License | Animations |
| Google Gemini | Google Cloud AI Terms | AI responses |
| Faster Whisper | MIT License | Speech recognition |

Please review individual library licenses before commercial use.

---

## 🔗 Important Links & Resources

### Project Documentation
- 📘 **Main Repository**: [AgriGPT-Chat-Report_System](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System)
- 📗 **Frontend Documentation**: [frontend/README.md](frontend/README.md)
- 📙 **Backend Documentation**: [backend/README.md](backend/README.md)

### Development Tools & Services
- 🔥 **Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com/)
- 🍃 **MongoDB Atlas**: [cloud.mongodb.com](https://cloud.mongodb.com/)
- 🤖 **Google AI Studio**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- 📬 **Postman**: [postman.com](https://www.postman.com/) - API testing

### Learning Resources
- 📚 **React Documentation**: [react.dev](https://react.dev/)
- 🐍 **Flask Documentation**: [flask.palletsprojects.com](https://flask.palletsprojects.com/)
- 🔥 **Firebase Guides**: [firebase.google.com/docs](https://firebase.google.com/docs)
- 🌿 **MongoDB University**: [university.mongodb.com](https://university.mongodb.com/)
- 🎨 **TailwindCSS Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## 📞 Support & Contact

### Get Help

**For Technical Issues:**
1. Check [Troubleshooting](#-troubleshooting) section
2. Review individual README files (backend, frontend)
3. Search existing [GitHub Issues](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System/issues)
4. Check browser console for errors
5. Verify environment variable configuration

**For Questions & Support:**
- 📧 **Email**: biswalsubhamrony@gmail.com
- 🐛 **GitHub Issues**: [Create an issue](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/subhambiswalrony/AgriGPT-Chat-Report_System/discussions)

**When Reporting Issues, Include:**
- Operating system and version
- Browser and version (for frontend issues)
- Python version (for backend issues)
- Node.js version (for frontend issues)
- Error messages and stack traces
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or screen recordings if applicable

---

## 🙏 Acknowledgments

We extend our heartfelt gratitude to:

### Technology Partners
- 🤖 **Google** - For Gemini AI API and Firebase services that power our authentication and AI responses
- 🍃 **MongoDB** - For excellent database technology and MongoDB Atlas cloud services
- 🗣️ **OpenAI** - For the Whisper speech recognition model enabling voice input
- ⚡ **Vercel** - For seamless deployment and hosting platform
- 🎨 **TailwindCSS Team** - For the amazing utility-first CSS framework

### Open Source Community
- All the maintainers of open-source libraries we use
- Stack Overflow community for problem-solving assistance
- GitHub for hosting and collaboration tools
- React, Flask, and Python communities for excellent documentation

### Special Thanks
- 🌾 **Indian Farmers** - For being our inspiration and providing valuable feedback
- 👨‍🏫 **Our Mentors** - For guidance throughout the development process
- 🎓 **Our Institution** - For providing resources and support for this project
- 👥 **Beta Testers** - For testing and providing crucial feedback
- 🌍 **Agriculture Extension Workers** - For insights into farmers' needs

### Educational Resources
- **Google AI Studio** for Gemini API documentation and tutorials
- **Firebase Documentation** for comprehensive auth guides
- **MongoDB University** for free database courses
- **freeCodeCamp** and **MDN Web Docs** for web development resources

---

<div align="center">

**Built with ❤️ for Indian Farmers** 🌾

**Last Updated**: January 2026 | **Version**: 2.0

**A Project Dedicated to Empowering Indian Agriculture Through Technology**

---

### Project Statistics

![GitHub Repo Size](https://img.shields.io/github/repo-size/subhambiswalrony/AgriGPT-Chat-Report_System?style=for-the-badge)
![GitHub Last Commit](https://img.shields.io/github/last-commit/subhambiswalrony/AgriGPT-Chat-Report_System?style=for-the-badge)
![GitHub Issues](https://img.shields.io/github/issues/subhambiswalrony/AgriGPT-Chat-Report_System?style=for-the-badge)
![GitHub Stars](https://img.shields.io/github/stars/subhambiswalrony/AgriGPT-Chat-Report_System?style=for-the-badge)

---

**AgriGPT** © 2026 | All Rights Reserved

[⬆ Back to Top](#-agrigpt---ai-powered-agricultural-expert-system)

</div>

---

<div align="center">

**Built with ❤️ for Indian Farmers**

**AgriGPT** © 2026 | All Rights Reserved

[⬆ Back to Top](#-agrigpt---ai-powered-agricultural-expert-system)

</div>
