'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Auth context type definition
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // TODO: Validate token with backend API
          // For now, just simulate a logged-in user if token exists
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            role: 'user',
          });
        }
      } catch (error) {
        // If token is invalid, clear it
        localStorage.removeItem('authToken');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    try {
      // TODO: Connect to backend API for login
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // if (!response.ok) throw new Error('Authentication failed');
      
      // const data = await response.json();
      
      // Simulate successful login
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'user',
      };
      
      // Save token to localStorage or sessionStorage based on rememberMe
      if (rememberMe) {
        localStorage.setItem('authToken', mockToken);
      } else {
        sessionStorage.setItem('authToken', mockToken);
      }
      
      setUser(mockUser);
      router.push('/');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Connect to backend API for registration
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, email, password }),
      // });
      
      // if (!response.ok) throw new Error('Registration failed');
      
      // For now, just simulate a successful registration
      console.log('Registered user:', { name, email });
      
      // Typically redirect to login after registration
      router.push('/auth/login');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setUser(null);
    router.push('/auth/login');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;