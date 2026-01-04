# 🌾 AgriGPT Frontend

A modern, responsive React + TypeScript frontend for the AgriGPT agricultural chatbot application with Firebase Google Sign-In integration.

## 🚀 Core Features

### 1. **User Authentication System**
- **Multiple Authentication Methods:**
  - Traditional email/password authentication
  - **Google Sign-In with Firebase** (OAuth 2.0)
  - Animated Google Sign-In button with green theme
- JWT-based session management
- Protected routes with authentication guards
- Profile management with password creation for Google users
- Secure token storage in localStorage

### 2. **Real-time Chat Interface**
- Interactive chat with AgriGPT AI bot
- Support for 13+ Indian languages
- Clean, responsive chat UI with message history
- Text and voice input support
- Markdown rendering for formatted responses
- Message timestamps and typing indicators
- Trial mode for unauthenticated users (text chat only)

### 3. **Voice Input Support**
- Audio recording directly in browser
- Voice message transcription
- Visual recording indicators
- Voice features restricted to authenticated users
- Seamless integration with chat interface

### 4. **Farming Report Generation**
- AI-powered comprehensive farming reports
- Language selection for report generation
- Interactive form for crop and location details
- PDF download capability
- Report history for authenticated users
- Detailed farming advice sections

### 5. **Weather Dashboard**
- Real-time weather information
- Location-based weather data
- Temperature, humidity, wind speed
- Weather forecasts
- Agricultural weather advisories

### 6. **User Profile Management**
- Update personal information (name, email)
- Profile picture upload and management
- Password management:
  - Change existing password
  - Create password for Google Sign-In users
- View authentication methods
- Account settings and preferences

### 7. **Modern UI/UX**
- Dark/Light theme toggle with smooth transitions
- Responsive design for mobile, tablet, and desktop
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React icons
- Custom animations (shimmer, sparkle effects)
- Smooth page transitions
- Loading states and error handling

## 🛠️ Technology Stack

### Core Technologies
- **React** 18.3.1 - UI library
- **TypeScript** 5.5.3 - Type safety
- **Vite** 5.4.2 - Build tool and dev server

### UI & Styling
- **TailwindCSS** 3.4.1 - Utility-first CSS framework
- **Framer Motion** 12.23.3 - Animation library
- **Lucide React** 0.344.0 - Icon library

### Authentication & Backend
- **Firebase** 11.10.0 - Google Sign-In authentication
- **React Router DOM** 7.6.3 - Client-side routing
- **Axios** (via api.ts) - HTTP client

### Additional Libraries
- **React Markdown** 10.1.0 - Markdown rendering
- **jsPDF** 3.0.4 - PDF generation
- **html2canvas** 1.4.1 - DOM to canvas conversion

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on http://localhost:5000
- Firebase project configured (for Google Sign-In)

## 🔧 Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your Firebase credentials and API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at: http://localhost:5173

### Environment Configuration

Create a `.env` file in the frontend directory:

```env
# Backend API
VITE_API_URL=http://localhost:5000

# Firebase Configuration (Get from Firebase Console)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: Weather API
VITE_WEATHER_API_KEY=your_weather_api_key
```

## 📁 Project Structure

```
frontend/
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App-specific TypeScript config
├── tsconfig.node.json              # Node-specific TypeScript config
├── tailwind.config.js              # TailwindCSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
├── .env                            # Environment variables (create this)
├── .gitignore                      # Git ignore file
├── README.md                       # This file
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root component with routing
│   ├── index.css                   # Global styles and TailwindCSS
│   ├── vite-env.d.ts               # Vite type definitions
│   ├── assets/                     # Static assets
│   │   ├── Rony.jpg                # Team member photo
│   │   ├── swabhiman.jpeg          # Team member photo
│   │   ├── tusar.jpeg              # Team member photo
│   │   └── vivekananda.jpg         # Team member photo
│   ├── components/                 # Reusable components
│   │   ├── Footer.tsx              # Footer component
│   │   ├── Loader.tsx              # Loading spinner component
│   │   ├── Navigation.tsx          # Navigation bar with theme toggle
│   │   └── ScrollToTop.tsx         # Scroll to top on route change
│   ├── config/                     # Configuration files
│   │   ├── api.ts                  # API endpoints and axios config
│   │   ├── firebase.ts             # Firebase project configuration
│   │   └── firebaseAuth.ts         # Firebase Auth initialization
│   ├── contexts/                   # React contexts
│   │   └── ThemeContext.tsx        # Theme provider (dark/light mode)
│   ├── hooks/                      # Custom React hooks
│   │   └── useWeather.ts           # Weather data fetching hook
│   └── pages/                      # Page components
│       ├── AuthPage.tsx            # Login/Signup with Google Sign-In
│       ├── ChatPage.tsx            # AI chat interface
│       ├── FeedbackPage.tsx        # User feedback form
│       ├── HomePage.tsx            # Landing page
│       ├── NotFoundPage.tsx        # 404 error page
│       ├── ReportPage.tsx          # Farming report generation
│       ├── ResetPasswordPage.tsx   # Password reset (future)
│       ├── SettingsPage.tsx        # User settings and profile
│       ├── TeamPage.tsx            # Team information
│       ├── UploadPage.tsx          # File upload (future)
│       └── WeatherPage.tsx         # Weather dashboard
```

## 🔐 Authentication Flow

### Email/Password Authentication
1. User enters email and password on AuthPage
2. Frontend sends credentials to `/api/login` or `/api/signup`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Protected routes accessible with valid token

### Google Sign-In Authentication
1. User clicks "Sign in with Google" button (animated with green theme)
2. Firebase popup for Google account selection
3. Firebase returns ID token after successful authentication
4. Frontend sends Firebase token to `/api/auth/google`
5. Backend verifies token and syncs user data with MongoDB
6. Backend returns JWT token for API access
7. User redirected to chat interface

### Password Creation for Google Users
1. Google-authenticated users can create password in Settings page
2. Uses Firebase `linkWithCredential` to add email/password
3. Enables dual authentication (Google + email/password)
4. Backend updates `auth_providers` array in MongoDB

## 📡 API Integration

All API calls are configured in `src/config/api.ts`:

### Authentication Endpoints
- `POST /api/signup` - Create new account (email/password)
- `POST /api/login` - Email/password login
- `POST /api/auth/google` - Google Sign-In authentication
- `POST /api/verify-otp` - Verify OTP for authentication

### User Profile Endpoints
- `PUT /api/update-profile` - Update user details (protected)
- `PUT /api/change-password` - Change password (protected)
- `POST /api/create-password` - Create password for Google users (protected)

### Chat & Reports Endpoints
- `POST /api/chat` - Send text message
- `POST /api/chat/voice` - Send voice message (protected)
- `POST /api/generate-report` - Generate farming report

### API Configuration

API base URL is configured via environment variable:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

**Protected endpoints require:**
```
Authorization: Bearer <jwt_token>
```

## 🌐 Routes

- `/` - Home page (landing page)
- `/auth` - Login/Signup page with Google Sign-In
- `/chat` - Chat interface (trial mode available)
- `/team` - Team information
- `/report` - Farming report generation
- `/upload` - File upload page (future)
- `/weather` - Weather dashboard
- `/settings` - User settings and profile management (protected)
- `/feedback` - User feedback form
- `/reset-password` - Password reset (future)
- `*` - 404 Not Found page

## 🔒 Protected Routes

Routes that require authentication:
- `/settings` - User settings and profile

Features that require authentication:
- Voice input in chat
- Chat history saving
- Report history
- Profile picture upload
- Password management

If user is not authenticated, they can still use:
- Text chat (trial mode)
- Report generation (not saved)
- Weather information
- General browsing

## 💾 Local Storage

The app stores the following data in localStorage:

- `token` - JWT authentication token
- `user_id` - User's unique MongoDB ID
- `firebase_uid` - Firebase user ID (for Google Sign-In users)
- `email` - User's email address
- `name` - User's name
- `profilePicture` - Base64 encoded profile picture
- `auth_providers` - Array of authentication methods (e.g., ["google"], ["local"])
- `theme` - User's theme preference (dark/light)

## 🎨 Theming

The application supports dark and light themes:

- Theme state managed by `ThemeContext`
- Theme preference saved to localStorage
- Smooth transitions between themes
- All components theme-aware
- Custom TailwindCSS color schemes
- Toggle available in Navigation component

## 📱 Responsive Design

The application is fully responsive and works on:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)
- Touch-friendly UI elements
- Adaptive layouts for all screen sizes
- Mobile-first approach

## 🎨 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (output to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎙️ Voice Input

The chat page supports voice input with:
- Real-time audio visualization during recording
- Recording timer display
- Automatic transcription via backend Whisper integration
- Support for multiple Indian languages
- **Authentication required** - Voice features restricted to logged-in users
- One-click recording with visual feedback

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🐛 Troubleshooting

### Common Issues

**Firebase Configuration Error**
- Ensure all Firebase environment variables are set in `.env`
- Check Firebase project settings in Firebase Console
- Verify API keys are correct and not expired
- Error: "Firebase: Error (auth/configuration-not-found)"
  - Solution: Create `.env` file with all `VITE_FIREBASE_*` variables

**Backend Connection Failed**
- Verify backend server is running on port 5000
- Check `VITE_API_URL` in `.env`
- Ensure CORS is configured on backend
- Check browser console for network errors

**Google Sign-In Not Working**
- Add authorized domains in Firebase Console (Authentication > Settings > Authorized domains)
- Enable Google Sign-In in Firebase Authentication methods
- Check browser console for Firebase errors
- Ensure `firebase-credentials.json` exists in backend

**Authentication Issues**
- Clear localStorage and login again
- Check if token is being sent in request headers
- Verify JWT_SECRET_KEY matches between frontend and backend
- Check token expiration

**Voice Recording Issues**
- Grant microphone permissions in browser
- Check browser console for errors
- Ensure using HTTPS or localhost (required for microphone access)
- Voice features require authentication

**Build Errors**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all dependencies are installed

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel (Recommended)

1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `VITE_API_URL=your-backend-url`
   - All `VITE_FIREBASE_*` variables from Firebase Console

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Configure redirects for SPA routing:
   ```
   /* /index.html 200
   ```

### Important Notes
- Update `VITE_API_URL` to your production backend URL
- Add production domain to Firebase authorized domains
- Ensure backend CORS allows your frontend domain
- All environment variables must be set in deployment platform

## 🔒 Security Features

- JWT token validation
- Protected route guards
- Firebase authentication security
- Secure environment variable handling
- XSS protection via React
- CORS configuration
- Token expiration handling
- Input sanitization

## 📚 Dependencies Overview

### Production Dependencies
- `firebase` - Firebase SDK for Google authentication
- `framer-motion` - Smooth animations and transitions
- `html2canvas` - Convert DOM to canvas for PDF generation
- `jspdf` - Client-side PDF generation
- `lucide-react` - Beautiful SVG icon library
- `react` & `react-dom` - Core React library (v18.3.1)
- `react-markdown` - Render markdown in chat messages
- `react-router-dom` - Client-side routing (v7.6.3)

### Development Dependencies
- `@vitejs/plugin-react` - React support for Vite
- `typescript` - TypeScript compiler (v5.5.3)
- `tailwindcss` - Utility-first CSS framework (v3.4.1)
- `eslint` - Code quality and linting
- `autoprefixer` - CSS vendor prefixing
- `postcss` - CSS transformation

## 🚀 Future Enhancements

- [ ] Implement password reset functionality
- [ ] Add file upload for crop images
- [ ] Implement chat history search
- [ ] Add offline support with PWA
- [ ] Multi-language UI translations
- [ ] Push notifications for weather alerts
- [ ] Chat export functionality
- [ ] Voice output (Text-to-Speech)
- [ ] Image-based crop disease detection
- [ ] Real-time notifications

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write meaningful component names
4. Add comments for complex logic
5. Test responsiveness on multiple devices
6. Ensure Firebase integration works correctly

## 📚 Related Documentation

- [Backend README](../backend/README.md) - Backend API documentation
- [Firebase Setup Guide](../GOOGLE_AUTH_SETUP.md) - Google Sign-In setup
- [Quick Start Guide](../QUICK_START.md) - 5-minute setup guide
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md) - Technical overview

## 💬 Support

For issues and questions:
- Check existing documentation
- Review browser console errors
- Verify environment configuration
- Ensure backend is running properly
- Check Firebase Console for authentication issues

## 📝 License

Part of the AgriGPT Major Project - Agricultural Expert System.

---

**Built with ❤️ for Indian Farmers**

**Note**: Make sure the backend server is running before starting the frontend development server.
