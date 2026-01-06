import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle, Camera, Upload, Trash2, Sparkles, Shield, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl, API_ENDPOINTS } from '../config/api';
import Loader from '../components/Loader';
import { auth } from '../config/firebaseAuth';
import { EmailAuthProvider, linkWithCredential, updatePassword } from 'firebase/auth';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [authProviders, setAuthProviders] = useState<string[]>([]);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [hasPassword, setHasPassword] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: ''
  });

  const [previewImage, setPreviewImage] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    profilePicture: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    // Load current user data
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';
    const profilePicture = localStorage.getItem('profilePicture') || '';
    const providersString = localStorage.getItem('auth_providers');
    
    // If auth_providers is missing, infer from available data
    let providers: string[] = [];
    if (providersString) {
      providers = JSON.parse(providersString);
    } else {
      // Fallback: Check if user has firebase_uid (Google user)
      const firebaseUid = localStorage.getItem('firebase_uid');
      if (firebaseUid) {
        providers = ['google'];
        localStorage.setItem('auth_providers', JSON.stringify(providers));
      } else {
        // Regular user with password
        providers = ['local'];
        localStorage.setItem('auth_providers', JSON.stringify(providers));
      }
    }
    
    setFormData(prev => ({ ...prev, name, email, profilePicture }));
    setOriginalData({ name, email, profilePicture });
    setPreviewImage(profilePicture);
    setAuthProviders(providers);
    setIsGoogleUser(providers.includes('google'));
    setHasPassword(providers.includes('local'));
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be less than 5MB');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        // Compress and resize image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set maximum dimensions (smaller = less storage)
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = (width * MAX_HEIGHT) / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with reduced quality (0.7 = 70% quality)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        setPreviewImage(compressedBase64);
        setFormData(prev => ({ ...prev, profilePicture: compressedBase64 }));
        setUploadingImage(false);
      };
      
      img.onerror = () => {
        setErrorMessage('Failed to process image');
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 5000);
        setUploadingImage(false);
      };
      
      img.src = reader.result as string;
    };
    
    reader.onerror = () => {
      setErrorMessage('Failed to read image file');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
      setUploadingImage(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = async () => {
    try {
      setUploadingImage(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Please login to continue');
      }

      // Remove from backend
      const response = await fetch(getApiUrl(API_ENDPOINTS.UPDATE_PROFILE), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          profilePicture: ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove profile picture');
      }

      // Update state and localStorage
      setPreviewImage('');
      setFormData(prev => ({ ...prev, profilePicture: '' }));
      localStorage.removeItem('profilePicture');

      setSuccessMessage('Profile picture removed successfully!');
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);

    } catch (error) {
      console.error('Remove profile picture error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to remove profile picture');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        throw new Error('Please login to continue');
      }

      // Validate inputs
      if (!formData.name.trim()) {
        throw new Error('Name cannot be empty');
      }

      if (!formData.email.trim()) {
        throw new Error('Email cannot be empty');
      }

      // Update profile
      const profileResponse = await fetch(getApiUrl(API_ENDPOINTS.UPDATE_PROFILE), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          profilePicture: formData.profilePicture
        })
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(profileData.error || 'Failed to update profile');
      }

      // Update password if provided
      // For Google users creating password for the first time
      if (isGoogleUser && !hasPassword && formData.newPassword) {
        if (formData.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        console.log('📡 Creating password for Google user...');
        
        // Try to link with Firebase (optional)
        const user = auth.currentUser;
        if (user && user.email) {
          try {
            const credential = EmailAuthProvider.credential(user.email, formData.newPassword);
            await linkWithCredential(user, credential);
            console.log('✅ Firebase credential linked successfully');
          } catch (firebaseError: any) {
            console.warn('⚠️ Firebase linking failed (may already be linked):', firebaseError.message);
          }
        }
        
        // Update backend to add 'local' provider
        const createPasswordResponse = await fetch(getApiUrl('/api/create-password'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            password: formData.newPassword
          })
        });

        console.log('📡 Backend response status:', createPasswordResponse.status);
        const createPasswordData = await createPasswordResponse.json();
        console.log('📡 Backend response data:', createPasswordData);

        if (!createPasswordResponse.ok) {
          throw new Error(createPasswordData.error || 'Failed to create password');
        }

        // Update local state
        setHasPassword(true);
        const updatedProviders = [...authProviders, 'local'];
        setAuthProviders(updatedProviders);
        localStorage.setItem('auth_providers', JSON.stringify(updatedProviders));
        
      } else if (formData.currentPassword && formData.newPassword) {
        // Regular password change for users who already have a password
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        if (formData.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        const passwordResponse = await fetch(getApiUrl(API_ENDPOINTS.CHANGE_PASSWORD), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          })
        });

        const passwordData = await passwordResponse.json();

        if (!passwordResponse.ok) {
          throw new Error(passwordData.error || 'Failed to change password');
        }
      }

      // Update localStorage
      localStorage.setItem('name', formData.name);
      localStorage.setItem('email', formData.email);
      if (formData.profilePicture) {
        localStorage.setItem('profilePicture', formData.profilePicture);
      }

      // Update original data
      setOriginalData({
        name: formData.name,
        email: formData.email,
        profilePicture: formData.profilePicture
      });

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      setSuccessMessage('Settings saved successfully!');
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);

    } catch (error) {
      console.error('Save settings error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save settings');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original data
    setFormData({
      ...originalData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPreviewImage(originalData.profilePicture);
    setSuccessMessage('Changes cancelled');
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        throw new Error('Please login to continue');
      }

      // Check if this is a Google user creating password for the first time
      if (isGoogleUser && !hasPassword) {
        // Validate password inputs
        if (!formData.newPassword) {
          throw new Error('Please enter a password');
        }

        if (formData.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        // Link email/password credential with Firebase account
        const user = auth.currentUser;
        if (user && user.email) {
          try {
            const credential = EmailAuthProvider.credential(user.email, formData.newPassword);
            await linkWithCredential(user, credential);
            console.log('✅ Firebase credential linked successfully');
          } catch (firebaseError: any) {
            console.warn('⚠️ Firebase linking failed (may already be linked):', firebaseError.message);
            // Continue anyway - we'll update backend regardless
          }
          
          // Update backend to add 'local' provider
          console.log('📡 Calling backend to create password...');
          const response = await fetch(getApiUrl('/api/create-password'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              password: formData.newPassword
            })
          });

          console.log('📡 Backend response status:', response.status);
          const data = await response.json();
          console.log('📡 Backend response data:', data);

          if (!response.ok) {
            throw new Error(data.error || 'Failed to create password');
          }

          // Update local state
          setHasPassword(true);
          const updatedProviders = [...authProviders, 'local'];
          setAuthProviders(updatedProviders);
          localStorage.setItem('auth_providers', JSON.stringify(updatedProviders));
        }

        setSuccessMessage('Password created successfully! You can now login with email and password.');
      } else {
        // Regular password change flow
        // Validate password inputs
        if (!formData.currentPassword) {
          throw new Error('Please enter your current password');
        }

        if (!formData.newPassword) {
          throw new Error('Please enter a new password');
        }

        if (formData.newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }

        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        const response = await fetch(getApiUrl(API_ENDPOINTS.CHANGE_PASSWORD), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to change password');
        }

        setSuccessMessage('Password changed successfully!');
      }

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);

    } catch (error) {
      console.error('Password operation error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update password');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setShowDeleteConfirm(false);

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');

      if (!token || !userId) {
        throw new Error('Please login to continue');
      }

      const response = await fetch(getApiUrl(API_ENDPOINTS.DELETE_ACCOUNT), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      // Clear all localStorage data
      localStorage.clear();

      // Show loader before redirecting (loader will handle navigation)
      // Note: isLoading state will keep showing loader

    } catch (error) {
      console.error('Delete account error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete account');
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
      setIsLoading(false);
    }
  };

  const handleDeleteLoadComplete = () => {
    navigate('/');
  };

  if (isLoading) {
    return <Loader onLoadComplete={handleDeleteLoadComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950 py-8 px-4 transition-colors duration-500">
      {/* Floating background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">{[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400/10 dark:bg-green-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl border-2 border-green-200/50 dark:border-green-700/50 shadow-lg hover:shadow-xl mb-6 transition-all duration-200"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back</span>
          </motion.button>
          
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-3xl p-6 sm:p-8 border-2 border-green-200/50 dark:border-green-700/50 shadow-2xl">
            <div className="flex items-center space-x-4 mb-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-xl"
                />
                <span className="text-5xl relative z-10">⚙️</span>
              </motion.div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Account Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1 flex items-center">
                  <Sparkles size={16} className="mr-2 text-green-500" />
                  Manage your profile and preferences
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Picture Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-6 border-2 border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:shadow-green-500/20 hover:shadow-3xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="backdrop-blur-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 p-3 rounded-2xl"
              >
                <Camera size={24} className="text-green-600 dark:text-green-400" />
              </motion.div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">Profile Picture</h2>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {/* Profile Picture Preview */}
              <div className="relative">
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  className="absolute -inset-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full blur-xl opacity-30"
                />
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-4 border-green-400/50 dark:border-green-600/50 shadow-xl">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={48} className="text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  
                  {/* Upload overlay */}
                  <label className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Upload size={24} className="text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              {/* Upload Button */}
              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
                <Camera size={20} className="relative z-10" />
                <span className="relative z-10">{uploadingImage ? 'Uploading...' : 'Change Picture'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </motion.label>

              {/* Remove Picture Button */}
              {previewImage && (
                <motion.button
                  onClick={handleRemoveProfilePicture}
                  disabled={uploadingImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group disabled:opacity-50"
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  <Trash2 size={20} className="relative z-10" />
                  <span className="relative z-10">Remove Picture</span>
                </motion.button>
              )}

              <p className="text-xs text-gray-600 dark:text-gray-400 text-center flex items-center justify-center">
                <Sparkles size={12} className="mr-1 text-green-500" />
                JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </motion.div>

          {/* Profile Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-6 border-2 border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:shadow-green-500/20 hover:shadow-3xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="backdrop-blur-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 p-3 rounded-2xl"
              >
                <User size={24} className="text-green-600 dark:text-green-400" />
              </motion.div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">Profile Information</h2>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 items-center">
                  <Sparkles size={14} className="mr-1 text-green-500" />
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-green-200/50 dark:border-green-700/50 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl text-gray-800 dark:text-gray-100 transition-all duration-300 shadow-lg"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 items-center">
                  <Sparkles size={14} className="mr-1 text-green-500" />
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-green-200/50 dark:border-green-700/50 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl text-gray-800 dark:text-gray-100 transition-all duration-300 shadow-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Change Password Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-6 border-2 border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:shadow-green-500/20 hover:shadow-3xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1
                }}
                className="backdrop-blur-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 p-3 rounded-2xl"
              >
                <Lock size={24} className="text-green-600 dark:text-green-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
                  {isGoogleUser && !hasPassword ? 'Create Password' : 'Change Password'}
                </h2>
                {isGoogleUser && !hasPassword && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Create a password to enable email/password login
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Current Password - Only show if user already has a password */}
              {hasPassword && (
                <div>
                  <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 items-center">
                    <Shield size={14} className="mr-1 text-green-500" />
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border-2 border-green-200/50 dark:border-green-700/50 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl text-gray-800 dark:text-gray-100 transition-all duration-300 shadow-lg"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 items-center">
                  <Shield size={14} className="mr-1 text-green-500" />
                  {isGoogleUser && !hasPassword ? 'Password' : 'New Password'}
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-green-200/50 dark:border-green-700/50 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl text-gray-800 dark:text-gray-100 transition-all duration-300 shadow-lg"
                    placeholder={isGoogleUser && !hasPassword ? "Enter password" : "Enter new password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 items-center">
                  <Shield size={14} className="mr-1 text-green-500" />
                  Confirm {isGoogleUser && !hasPassword ? 'Password' : 'New Password'}
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-green-200/50 dark:border-green-700/50 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl text-gray-800 dark:text-gray-100 transition-all duration-300 shadow-lg"
                    placeholder={isGoogleUser && !hasPassword ? "Confirm password" : "Confirm new password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons - Save, Cancel, Delete Account */}
        <motion.form
          onSubmit={handleSaveAll}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-green-200/50 dark:border-green-700/50"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Save Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden flex-1 flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
            >
              <motion.div
                animate={{
                  x: ["-100%", "200%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <Save size={24} className="relative z-10" />
              <span className="relative z-10">{isLoading ? 'Saving...' : 'Save All Changes'}</span>
            </motion.button>

            {/* Cancel Button */}
            <motion.button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center space-x-2 py-4 backdrop-blur-xl bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50 border-2 border-gray-300/50 dark:border-gray-600/50 text-lg"
            >
              <AlertCircle size={24} />
              <span>Cancel</span>
            </motion.button>

            {/* Delete Account Button */}
            <motion.button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden flex-1 flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50 group text-lg"
            >
              <motion.div
                animate={{
                  x: ["-100%", "200%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              <Trash2 size={24} className="relative z-10" />
              <span className="relative z-10">Delete Account</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 rounded-3xl shadow-2xl p-8 max-w-md w-full border-2 border-red-200/50 dark:border-red-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="p-3 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 rounded-2xl shadow-lg"
                >
                  <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">Confirm Deletion</h3>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Are you absolutely sure you want to delete your account? This action <span className="font-bold text-red-600 dark:text-red-400">cannot be undone</span> and all your data will be permanently removed from our servers.
              </p>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 backdrop-blur-xl bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-semibold shadow-lg transition-all disabled:opacity-50 border-2 border-gray-300/50 dark:border-gray-600/50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                  className="relative overflow-hidden flex-1 px-4 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-xl font-semibold shadow-lg transition-all disabled:opacity-50 group"
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  <span className="relative z-10">{isLoading ? 'Deleting...' : 'Yes, Delete'}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-24 right-4 backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl p-5 flex items-center space-x-4 z-50 border-2 border-green-200/50 dark:border-green-700/50"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 0.5
              }}
              className="p-3 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/50 dark:to-emerald-800/50 rounded-2xl shadow-lg"
            >
              <CheckCircle size={28} className="text-green-600 dark:text-green-400" />
            </motion.div>
            <div>
              <p className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">Success!</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{successMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Error Popup */}
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-24 right-4 backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl p-5 z-50 max-w-md border-2 border-red-200/50 dark:border-red-700/50"
          >
            <div className="flex items-start space-x-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 0.5
                }}
                className="p-3 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 rounded-2xl shadow-lg flex-shrink-0"
              >
                <AlertCircle size={28} className="text-red-600 dark:text-red-400" />
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-lg bg-gradient-to-r from-red-600 to-red-700 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">Error</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{errorMessage}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowErrorPopup(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
