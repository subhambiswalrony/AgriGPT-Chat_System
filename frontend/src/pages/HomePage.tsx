import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Upload, FileText, ArrowRight, Cloud, Sparkles, TrendingUp, Shield, Zap, CheckCircle, User, Lock, Crown, Star, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import PromptScroller from '../components/PromptScroller';

const AnimatedCounter = ({ end, duration = 2, suffix = '', decimals = 0 }: { end: number; duration?: number; suffix?: string; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end * 10) / 10);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    setIsLoggedIn(!!token);
    setUserName(name || 'User');
  }, []);
  const features = [
    {
      title: 'AI Chat Assistant',
      description: 'Get instant farming advice in 13+ Indian languages with our intelligent chatbot',
      icon: MessageCircle,
      link: '/chat',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      emoji: '💬',
      stats: '10,000+ Queries Solved'
    },
    {
      title: 'Disease Detection',
      description: 'Upload crop images for AI-powered disease identification and treatment suggestions',
      icon: Upload,
      link: '/upload',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      emoji: '🔬',
      stats: '95% Accuracy'
    },
    {
      title: 'Farming Reports',
      description: 'Get personalized crop reports with sowing, fertilizer, and weather guidance',
      icon: FileText,
      link: '/report',
      gradient: 'from-teal-400 via-emerald-500 to-green-600',
      emoji: '📊',
      stats: 'Custom Reports'
    },
    {
      title: 'Weather Intelligence',
      description: 'Real-time weather forecasts and soil analysis for better farming decisions',
      icon: Cloud,
      link: '/weather',
      gradient: 'from-green-500 via-teal-500 to-emerald-600',
      emoji: '🌤️',
      stats: 'Live Updates'
    }
  ];

  const benefits = [
    { icon: Sparkles, text: 'AI-Powered Insights', color: 'text-green-500 dark:text-green-400' },
    { icon: TrendingUp, text: 'Increase Productivity', color: 'text-emerald-500 dark:text-emerald-400' },
    { icon: Shield, text: 'Trusted by 10k+ Farmers', color: 'text-teal-500 dark:text-teal-400' },
    { icon: Zap, text: 'Instant Solutions', color: 'text-green-600 dark:text-green-300' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950 overflow-hidden transition-colors duration-500">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-green-200/30 dark:bg-green-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold inline-flex items-center transition-colors duration-300 border border-green-300 dark:border-green-700">
                  <Sparkles size={16} className="mr-2" />
                  {isLoggedIn ? `Welcome back, ${userName}! 👋` : 'AI-Powered Agricultural Assistant'}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 relative"
              >
                {/* Floating emojis */}
                <motion.span
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -left-12 sm:-left-16 top-0 text-3xl sm:text-4xl"
                >
                  🌱
                </motion.span>
                <motion.span
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute -right-12 sm:-right-16 top-0 text-3xl sm:text-4xl"
                >
                  🚜
                </motion.span>

                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent relative">
                  <motion.span
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 blur-2xl bg-gradient-to-r from-green-400 to-teal-400 -z-10"
                  />
                  Transform Your
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100">
                  Farming Journey 🌾
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300"
              >
                Experience the future of farming with AI-powered insights, real-time disease detection,
                personalized crop reports, and expert guidance in your language 🌿
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/chat">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center group overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        x: [-200, 200],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{ width: '50%' }}
                    />
                    <span className="relative z-10 flex items-center">
                      Start Chatting
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
                <Link to="/report">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600"
                  >
                    Generate Report
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-12 grid grid-cols-3 gap-6"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    <AnimatedCounter end={10} duration={2} suffix="K+" />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    <AnimatedCounter end={95} duration={2} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    <AnimatedCounter end={13} duration={2} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px]">
                {/* Farmer Illustration with emoji/icons */}
                <motion.div
                  animate={{
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    {/* Central Icon */}
                    <div className="text-9xl">🧑‍🌾</div>

                    {/* Floating Icons */}
                    <motion.div
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute top-0 left-0 w-full h-full"
                    >
                      <div className="absolute -top-10 -left-10 text-4xl">🌱</div>
                      <div className="absolute -top-10 -right-10 text-4xl">🌾</div>
                      <div className="absolute -bottom-10 -left-10 text-4xl">🚜</div>
                      <div className="absolute -bottom-10 -right-10 text-4xl">🌻</div>
                      <div className="absolute top-1/2 -left-20 text-4xl">🌽</div>
                      <div className="absolute top-1/2 -right-20 text-4xl">🥕</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Comparison Section */}
      <section className="relative py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
                Choose Your Experience
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See how signing in unlocks powerful features for your farming journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free User Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-full backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-3xl border-2 border-gray-300 dark:border-gray-600 shadow-xl p-8 transition-all duration-300">
                {/* Badge */}
                <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                  <span className="flex items-center text-gray-700 dark:text-gray-300 font-semibold">
                    <User size={20} className="mr-2" />
                    Guest Access
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Without Login
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">Basic chat access (limited)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">View public features</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 line-through">Save chat history</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 line-through">Generate detailed reports</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 line-through">Upload image and analyze disease</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 line-through">Access weather predictions</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 line-through">Personalized recommendations</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Logged In User Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Pulsing glow effect */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl"
              />

              <div className="relative h-full backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl border-2 border-green-400 dark:border-green-500 shadow-2xl p-8 transition-all duration-300">
                {/* Premium Badge */}
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
                  <span className="flex items-center text-white font-semibold">
                    <Crown size={20} className="mr-2" />
                    Premium Access
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  With Login
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Unlimited AI chat sessions</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Complete chat history saved</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Generate personalized reports</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Upload image & analyze disease</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Real-time weather predictions</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">AI-powered recommendations</span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <Star size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Priority support</span>
                  </div>
                </div>

                {!isLoggedIn && (
                  <Link to="/auth">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-8 w-full relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg overflow-hidden group"
                    >
                      <motion.div
                        animate={{
                          x: [-200, 200],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ width: '50%' }}
                      />
                      <span className="relative z-10 flex items-center justify-center">
                        <Lock size={18} className="mr-2" />
                        Sign In to Unlock All Features
                      </span>
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-8 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center space-x-2"
              >
                <benefit.icon size={24} className={benefit.color} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section with Cards */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
              Powerful Features for Modern Farmers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Everything you need to make informed farming decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group h-full"
              >
                <Link to={feature.link} className="block h-full">
                  <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl border-2 border-green-200/50 dark:border-green-700/50 shadow-xl p-6 h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-green-400 dark:group-hover:border-green-500 flex flex-col">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Icon with pulsing effect */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl bg-white/20"
                      />
                      <feature.icon className="relative text-white" size={24} />
                    </motion.div>

                    {/* Emoji */}
                    <div className="text-3xl mb-3">{feature.emoji}</div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-300 flex-grow">
                      {feature.description}
                    </p>

                    {/* Stats Badge */}
                    <div className="inline-flex items-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full text-xs font-semibold text-green-700 dark:text-green-300 mb-3 transition-colors duration-300 border border-green-300 dark:border-green-700 w-fit">
                      <CheckCircle size={12} className="mr-1.5" />
                      {feature.stats}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-sm group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors mt-auto">
                      Explore Feature
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Suggestions Section */}
      <PromptScroller />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-10 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 dark:from-green-600 dark:via-emerald-700 dark:to-teal-700 rounded-3xl shadow-2xl p-12 overflow-hidden transition-all duration-300">
            {/* Animated Background Pattern */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            />

            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-8 right-8 text-6xl sm:text-9xl opacity-20"
            >
              🌿
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-8 left-8 text-6xl sm:text-9xl opacity-20"
            >
              🌾
            </motion.div>

            <div className="relative text-center text-white">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold mb-6 relative"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 blur-2xl"
                >
                  Ready to Transform Your Farming? 🚀
                </motion.span>
                <span className="relative">
                  Ready to Transform Your Farming? 🚀
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl mb-8 text-white/90"
              >
                Join thousands of farmers using AI to increase productivity and make smarter decisions
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-10 py-4 bg-white dark:bg-gray-100 text-green-600 dark:text-green-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center overflow-hidden group"
                  >
                    <motion.div
                      animate={{
                        x: [-200, 200],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/30 to-transparent"
                      style={{ width: '50%' }}
                    />
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <Sparkles size={20} className="ml-2" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feedback Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/50 dark:to-emerald-950/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-green-200/30 dark:border-green-700/30 transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0"
                >
                  <MessageSquare size={40} className="text-green-600 dark:text-green-400" />
                </motion.div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300 mb-1">
                    Help Us Improve! 💚
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Found a bug or have suggestions? We'd love to hear from you.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/feedback')}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-400 dark:hover:to-emerald-400 transition-all duration-200 whitespace-nowrap"
              >
                <MessageSquare size={20} />
                <span>Share Feedback</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;