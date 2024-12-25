import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import FAQsPage from "./pages/FAQsPage";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { FAQProvider } from './context/FAQContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Hide navigation on login page, FAQs page, and home page
  const showNavigation = isAuthenticated && 
    location.pathname !== '/login' && 
    !location.pathname.includes('/faqs') && 
    location.pathname !== '/';

  // Redirect to /upload if authenticated and trying to access /login
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/upload" replace />;
  }

  return (
    <div>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        
        {/* Protected Routes */}
        <Route path="/upload" element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        } />
        <Route path="/faqs" element={
          <ProtectedRoute>
            <FAQsPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <FAQProvider>
          <AppContent />
        </FAQProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
