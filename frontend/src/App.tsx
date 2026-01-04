import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import UploadPage from './pages/UploadPage';
import ReportPage from './pages/ReportPage';
import TeamPage from './pages/TeamPage';
import WeatherPage from './pages/WeatherPage';
import AuthPage from './pages/AuthPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SettingsPage from './pages/SettingsPage';
import FeedbackPage from './pages/FeedbackPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Apply theme immediately on mount, before loader
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;