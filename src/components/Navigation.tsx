import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const navLinks = [
    { path: "/upload", label: <strong>Tải lên</strong> },
    { path: "/faqs", label: <strong>Câu hỏi thường gặp</strong> },
    { path: "/dasboard", label: <strong>Bảng điều khiển</strong> },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          onClick={() => setActiveLink("/")}
          className={`
            text-white font-bold text-xl transition-all duration-300 ease-in-out 
            px-3 py-2 rounded-lg 
            ${
              activeLink === "/"
                ? "bg-green-800 shadow-lg"
                : "hover:bg-green-600"
            }
            transform hover:scale-105 active:scale-95
          `}
        >
          Trang Chủ
        </Link>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setActiveLink(link.path)}
                className={`
                  text-white 
                  transition-all 
                  duration-300 
                  ease-in-out 
                  px-3 
                  py-2 
                  rounded-lg 
                  ${
                    activeLink === link.path
                      ? "bg-green-800 shadow-lg"
                      : "hover:bg-green-600 hover:shadow-md"
                  }
                  transform 
                  hover:scale-105 
                  active:scale-95
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
