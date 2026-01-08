import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Sparkles, Shield, Zap } from 'lucide-react';
import { API_BASE_URL, getApiUrl, API_ENDPOINTS } from '../config/api';
import { auth, googleProvider } from '../config/firebaseAuth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetLinkSent, setShowResetLinkSent] = useState(false);
  const [showOtpSent, setShowOtpSent] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPasswordResetOtpInput, setShowPasswordResetOtpInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If OTP input is showing, verify the OTP
    if (showOtpInput) {
      await handleVerifyOtp();
      return;
    }
    
    try {
      // Validation for signup
      if (!isLogin && formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error for already registered user (signup)
        if (!isLogin && (data.error?.includes('already exists') || data.error?.toLowerCase().includes('user already'))) {
          setErrorMessage('This email is already registered. Please sign in instead.');
          setShowErrorPopup(true);
          return;
        }
        // Handle specific error for user not registered (login)
        if (isLogin && data.error?.toLowerCase().includes('not registered')) {
          setErrorMessage('User not registered yet. Please sign up instead.');
          setShowErrorPopup(true);
          return;
        }
        throw new Error(data.error || 'Authentication failed');
      }

      // Check if OTP is required
      if (data.requires_otp) {
        // OTP sent successfully, show OTP input field inline
        setShowOtpInput(true);
        console.log('OTP sent to email:', formData.email);
        return;
      }

      // If no OTP required (shouldn't happen with new flow, but keeping for safety)
      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('email', data.email);
      if (data.name) localStorage.setItem('name', data.name);
      if (data.profilePicture) localStorage.setItem('profilePicture', data.profilePicture);

      // Show success popup
      setShowSuccessPopup(true);
      console.log('Auth success:', data);

      // Redirect to homepage after showing popup
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Authentication failed');
      setShowErrorPopup(true);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit OTP');
      setShowErrorPopup(true);
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const endpoint = isLogin ? '/api/verify-login-otp' : '/api/verify-signup-otp';
      const payload = isLogin
        ? { email: formData.email, otp }
        : { email: formData.email, otp, password: formData.password, name: formData.name };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed');
      }

      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('email', data.email);
      if (data.name) localStorage.setItem('name', data.name);
      if (data.profilePicture) localStorage.setItem('profilePicture', data.profilePicture);

      // Hide OTP input and show success popup
      setShowOtpInput(false);
      setShowSuccessPopup(true);
      console.log('OTP verified, auth success:', data);

      // Redirect to homepage after showing popup
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error) {
      console.error('OTP verification error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'OTP verification failed');
      setShowErrorPopup(true);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowOtpInput(false);
    setOtp('');
  };

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get Firebase ID token
      const idToken = await user.getIdToken();
      
      // Send token to backend for verification and MongoDB sync
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google sign-in failed');
      }

      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('email', data.email);
      localStorage.setItem('firebase_uid', data.firebase_uid);
      if (data.name) localStorage.setItem('name', data.name);
      if (data.profilePicture) localStorage.setItem('profilePicture', data.profilePicture);
      if (data.auth_providers) localStorage.setItem('auth_providers', JSON.stringify(data.auth_providers));

      // Show success popup
      setShowSuccessPopup(true);
      console.log('Google Auth success:', data);

      // Redirect to homepage after showing popup
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      setErrorMessage(error.message || 'Google sign-in failed');
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950 flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400/10 dark:bg-green-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-6xl opacity-10 pointer-events-none hidden lg:block"
      >
        🌱
      </motion.div>
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 text-6xl opacity-10 pointer-events-none hidden lg:block"
      >
        🔒
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300 border-2 border-green-200/30 dark:border-green-700/30"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Header */}
        <div className="text-center mb-8 relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="relative inline-block mb-4"
          >
            {/* Pulsing Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 blur-xl rounded-full"
            />
            <div className="relative text-5xl">
              🌿
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2"
          >
            {isLogin ? 'Welcome Back!' : 'Join AgriGPT'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            {isLogin 
              ? 'Sign in to your farming assistant account' 
              : 'Create your account to get started'
            }
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {[
              { icon: <Sparkles size={14} />, text: 'AI Powered' },
              { icon: <Shield size={14} />, text: 'Secure' },
              { icon: <Zap size={14} />, text: 'Fast' }
            ].map((pill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 border border-green-300/30 dark:border-green-700/30 text-xs font-semibold text-green-700 dark:text-green-300 flex items-center gap-1"
              >
                {pill.icon}
                <span>{pill.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          {/* OTP Input Field - Shows inline after credentials are submitted */}
          <AnimatePresence>
            {showOtpInput && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative">
                  {/* Success indicator that OTP was sent */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                      OTP sent to <strong>{formData.email}</strong>
                    </p>
                  </motion.div>

                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Enter Verification Code
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" size={20} />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 text-center text-lg tracking-widest"
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && otp.length === 6) {
                          handleVerifyOtp();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      OTP expires in 10 minutes
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const endpoint = isLogin ? '/api/login' : '/api/signup';
                          const payload = isLogin 
                            ? { email: formData.email, password: formData.password }
                            : { email: formData.email, password: formData.password, name: formData.name };

                          const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                          });
                          
                          if (response.ok) {
                            setOtp('');
                            setErrorMessage('OTP resent successfully!');
                            setShowErrorPopup(true);
                            setTimeout(() => {
                              setShowErrorPopup(false);
                            }, 2000);
                          }
                        } catch (error) {
                          console.error('Failed to resend OTP:', error);
                        }
                      }}
                      className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLogin && !showOtpInput && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:bg-gray-700 transition-colors duration-300" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-300"
              >
                Forgot password?
              </button>
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={showOtpInput && (otp.length !== 6 || isVerifyingOtp)}
            className="relative w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl overflow-hidden font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
            {showOtpInput ? (
              <>
                {isVerifyingOtp ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="relative z-10 w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span className="relative z-10">Verifying...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Verify OTP & Continue</span>
                    <CheckCircle size={20} className="relative z-10" />
                  </>
                )}
              </>
            ) : (
              <>
                <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={20} className="relative z-10" />
              </>
            )}
          </motion.button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleAuthMode}
              className="ml-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 font-medium transition-colors duration-300"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600 transition-colors duration-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={handleGoogleSignIn}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full max-w-xs inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-2 border-green-200 dark:border-green-700"
            >
              {/* Animated Background Gradient */}
              <motion.div
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/40 dark:via-green-500/10 to-transparent"
              />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 blur-xl"
                />
              </div>

              {/* Google Logo with Animation */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                className="relative z-10"
              >
                <motion.svg 
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  whileHover={{
                    filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))"
                  }}
                >
                  <motion.path 
                    fill="#4285F4" 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <motion.path 
                    fill="#34A853" 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <motion.path 
                    fill="#FBBC05" 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <motion.path 
                    fill="#EA4335" 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Text with Gradient */}
              <span className="relative z-10 font-semibold text-base bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 dark:from-gray-200 dark:via-white dark:to-gray-200 bg-clip-text text-transparent group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-teal-600 dark:group-hover:from-green-400 dark:group-hover:via-emerald-400 dark:group-hover:to-teal-400 transition-all duration-500">
                Continue with Google
              </span>

              {/* Sparkle Effect */}
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100"
              />
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{
                  duration: 2,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-2 left-2 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                >
                  <CheckCircle size={48} className="text-green-600" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  Login Successful!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-center"
                >
                  Redirecting to chat...
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-full h-1 bg-green-600 rounded-full mt-4"
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowErrorPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4"
                >
                  <AlertCircle size={48} className="text-red-600" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  {errorMessage.toLowerCase().includes('already') 
                    ? 'Already Registered!' 
                    : errorMessage.toLowerCase().includes('not registered')
                    ? 'Not Registered!'
                    : 'Error!'}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-center mb-6"
                >
                  {errorMessage}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowErrorPopup(false);
                    if (errorMessage.toLowerCase().includes('already')) {
                      setIsLogin(true);
                    } else if (errorMessage.toLowerCase().includes('not registered')) {
                      setIsLogin(false);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {errorMessage.toLowerCase().includes('already') 
                    ? 'Sign In' 
                    : errorMessage.toLowerCase().includes('not registered')
                    ? 'Sign Up'
                    : 'Try Again'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForgotPassword(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4 transition-colors duration-300"
                >
                  <Mail size={32} className="text-green-600 dark:text-green-400" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center transition-colors duration-300"
                >
                  Forgot Password?
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-300 text-center mb-6 text-sm transition-colors duration-300"
                >
                  Enter your email address for Verification to reset your password.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmail('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      // Send OTP to email
                      if (resetEmail) {
                        try {
                          const response = await fetch(getApiUrl(API_ENDPOINTS.SEND_OTP), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: resetEmail, purpose: 'reset' })
                          });
                          
                          const data = await response.json();
                          
                          if (!response.ok) {
                            throw new Error(data.error || 'Failed to send OTP');
                          }
                          
                          setResetEmailSent(resetEmail);
                          setShowForgotPassword(false);
                          setShowOtpSent(true);
                          
                          // Show OTP input after 2.5s
                          setTimeout(() => {
                            setShowOtpSent(false);
                            setShowPasswordResetOtpInput(true);
                          }, 2500);
                        } catch (error) {
                          setErrorMessage(error instanceof Error ? error.message : 'Failed to send OTP');
                          setShowErrorPopup(true);
                        }
                      } else {
                        setErrorMessage('Please enter your email address');
                        setShowErrorPopup(true);
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Send OTP
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Reset OTP Input Modal */}
      <AnimatePresence>
        {showPasswordResetOtpInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[58] flex items-center justify-center p-4 transition-colors duration-300"
            onClick={() => {
              setShowPasswordResetOtpInput(false);
              setOtp('');
              setResetEmail('');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                  <Lock size={32} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                  Enter OTP
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  We've sent a 6-digit code to
                </p>
                <p className="text-green-600 dark:text-green-400 font-semibold text-sm transition-colors duration-300">
                  {resetEmailSent}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Verification Code
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-center text-lg tracking-widest transition-all duration-300"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center transition-colors duration-300">
                  OTP expires in 10 minutes
                </p>
              </div>

              <motion.div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowPasswordResetOtpInput(false);
                    setOtp('');
                    setResetEmail('');
                  }}
                  disabled={isVerifyingOtp}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    if (otp.length !== 6) {
                      setErrorMessage('Please enter a valid 6-digit OTP');
                      setShowErrorPopup(true);
                      return;
                    }

                    setIsVerifyingOtp(true);
                    try {
                      const response = await fetch(getApiUrl(API_ENDPOINTS.VERIFY_OTP), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: resetEmailSent, otp })
                      });
                      
                      const data = await response.json();
                      
                      if (!response.ok) {
                        throw new Error(data.error || 'Invalid OTP');
                      }
                      
                      // OTP verified successfully, navigate to reset password
                      setShowPasswordResetOtpInput(false);
                      setOtp('');
                      navigate('/reset-password', { 
                        state: { 
                          verifiedEmail: resetEmailSent, 
                          otpVerified: true 
                        } 
                      });
                    } catch (error) {
                      setErrorMessage(error instanceof Error ? error.message : 'Invalid OTP');
                      setShowErrorPopup(true);
                    } finally {
                      setIsVerifyingOtp(false);
                    }
                  }}
                  disabled={isVerifyingOtp || otp.length !== 6}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </motion.button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  try {
                    const response = await fetch(getApiUrl(API_ENDPOINTS.SEND_OTP), {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: resetEmailSent, purpose: 'reset' })
                    });
                    
                    if (response.ok) {
                      setErrorMessage('');
                      // Show brief success message
                      const tempMsg = errorMessage;
                      setErrorMessage('OTP resent successfully!');
                      setShowErrorPopup(true);
                      setTimeout(() => {
                        setShowErrorPopup(false);
                        setErrorMessage(tempMsg);
                      }, 2000);
                    }
                  } catch (error) {
                    console.error('Failed to resend OTP:', error);
                  }
                }}
                className="w-full mt-4 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
              >
                Resend OTP
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showResetLinkSent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full transition-colors duration-300"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 transition-colors duration-300"
                >
                  <Mail size={48} className="text-green-600 dark:text-green-400" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300"
                >
                  Email Sent!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-300 text-center mb-2 transition-colors duration-300"
                >
                  Password reset link has been sent to:
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-green-600 dark:text-green-400 font-semibold text-center mb-4 break-all transition-colors duration-300"
                >
                  {resetEmailSent}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300"
                >
                  Redirecting to reset password page...
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 2 }}
                  className="w-full h-1 bg-green-600 dark:bg-green-500 rounded-full mt-4 transition-colors duration-300"
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;