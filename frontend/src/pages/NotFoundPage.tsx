import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950 flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden">
      {/* Animated floating leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-30"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          🍃
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        {/* Scarecrow and 404 Combined */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          {/* Pulsing background glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 blur-3xl rounded-full"
          />

          {/* 404 Number */}
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [-2, 2, -2],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 leading-none mb-4"
            >
              404
            </motion.div>
            
            {/* Scarecrow emoji */}
            <motion.div
              animate={{ 
                rotate: [-5, 5, -5],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-7xl md:text-9xl"
            >
              🧑‍🌾
            </motion.div>
          </div>
        </motion.div>

        {/* Glassmorphism content container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700/30 transition-colors duration-300 mb-6"
        >
          {/* Gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 dark:from-green-500 dark:via-emerald-600 dark:to-teal-700 rounded-t-3xl" />

          {/* Animated icons */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Compass size={32} className="text-green-600 dark:text-green-400" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sprout size={32} className="text-emerald-600 dark:text-emerald-400" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 pb-2">
            Lost in the Fields?
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
            Oops! This page has wandered off like a curious goat. 🐐
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mb-8 transition-colors duration-300">
            Don't worry, even the best farmers lose their way sometimes. Let's help you get back to your field!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-400 dark:hover:to-emerald-400 transition-all duration-200"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Quick links with icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 dark:border-gray-700/30 transition-colors duration-300"
        >
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Navigation:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { name: 'Chat', path: '/chat', emoji: '💬', color: 'from-green-500 to-emerald-500' },
                { name: 'Upload', path: '/upload', emoji: '📤', color: 'from-blue-500 to-cyan-500' },
                { name: 'Report', path: '/report', emoji: '📊', color: 'from-purple-500 to-pink-500' },
                { name: 'Weather', path: '/weather', emoji: '🌤️', color: 'from-orange-500 to-yellow-500' },
                { name: 'Team', path: '/team', emoji: '👥', color: 'from-teal-500 to-green-500' }
              ].map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(link.path)}
                  className={`relative p-4 bg-gradient-to-br ${link.color} rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 group overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <div className="text-2xl mb-1">{link.emoji}</div>
                    <div className="text-sm">{link.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>
        </motion.div>

        {/* Footer message with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌾
          </motion.span>
          <span>Need help? Contact our support team or visit the</span>
          <button
            onClick={() => navigate('/chat')}
            className="text-green-600 dark:text-green-400 hover:underline font-medium"
          >
            AgriGPT Chat
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
