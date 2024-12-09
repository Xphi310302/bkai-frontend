import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import FAQsPage from "./pages/FAQsPage";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { FAQProvider } from './context/FAQContext';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/faqs" && (
        <Navigation />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <FAQProvider>
        <AppContent />
      </FAQProvider>
    </Router>
  );
};

export default App;
