import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, logout as logoutApi, isAuthenticated } from '../services/auth/api';
import type { LoginCredentials } from '../services/auth/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    try {
      await loginApi(credentials);
      setIsAuth(true);
      // Always redirect to /upload after successful login
      navigate('/upload');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutApi();
    setIsAuth(false);
    navigate('/login');
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      
      const currentPath = window.location.pathname;
      // Only redirect to login if not authenticated and trying to access protected routes
      if (!authenticated && 
          currentPath !== '/login' && 
          currentPath !== '/' && 
          !currentPath.startsWith('/public')) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
