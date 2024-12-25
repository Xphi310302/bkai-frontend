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

  // Hide navigation on login page and FAQs page
  const showNavigation = isAuthenticated && location.pathname !== '/login' && !location.pathname.includes('/faqs');

  // Redirect to /upload if authenticated and trying to access / or /login
  if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
    return <Navigate to="/upload" replace />;
  }

  return (
    <div>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ProtectedRoute>
          }
        />
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
