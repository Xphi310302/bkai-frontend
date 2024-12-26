import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, ChartNoAxesCombined, Home, LogOut } from "lucide-react";
import { logout } from "../services/auth/api";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const navLinks = [
    {
      path: "/upload",
      label: (
        <>
          <FileText className="inline w-4 h-4 mr-1" />{" "}
          <strong>Quản Lý Dữ Liệu</strong>
        </>
      ),
    },
    {
      path: "/dashboard",
      label: (
        <>
          <ChartNoAxesCombined className="inline w-4 h-4 mr-1" />{" "}
          <strong>Bảng Điều Khiển</strong>
        </>
      ),
    },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const navButtonClass = (isActive: boolean) => `
    text-white
    font-bold
    transition-all
    duration-300
    ease-in-out
    px-3
    py-2
    rounded-lg
    ${
      isActive ? "bg-green-800 shadow-lg" : "hover:bg-green-800 hover:shadow-lg"
    }
    transform
    hover:scale-105
    active:scale-95
  `;
  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          onClick={() => setActiveLink("/")}
          className={navButtonClass(activeLink === "/")}
        >
          <Home className="inline w-4 h-4 mr-1" />{" "}
          {/* Add icon for Trang Chủ */}
          Trang Chủ
        </Link>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setActiveLink(link.path)}
                  className={navButtonClass(activeLink === link.path)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={handleSignOut} className={navButtonClass(false)}>
            <div className="flex items-center">
              <LogOut className="w-5 h-5 mr-2" />
              <strong>Đăng Xuất</strong>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
