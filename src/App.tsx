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

import "./App.css";

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
