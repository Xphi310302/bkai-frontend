import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import the new HomePage
import UploadPage from "./pages/AdminPage/UploadPage"; // Ensure path is correct
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/upload" element={<UploadPage />} />{" "}
          {/* Upload page route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
