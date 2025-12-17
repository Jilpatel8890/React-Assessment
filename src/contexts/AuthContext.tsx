

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User interface defining the shape of user data
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

// Shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

// Data required for registration
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Storage key for localStorage
const USERS_STORAGE_KEY = 'app_users';
const CURRENT_USER_KEY = 'current_user';

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the app and provides auth state
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /**
   * Get all users from localStorage
   */
  const getStoredUsers = (): Record<string, { user: User; password: string }> => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
  };

  /**
   * Save users to localStorage
   */
  const saveUsers = (users: Record<string, { user: User; password: string }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  /**
   * Login function - validates credentials against stored users
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getStoredUsers();
    const userRecord = users[email.toLowerCase()];

    // Check if user exists
    if (!userRecord) {
      return { success: false, error: 'No account found with this email address.' };
    }

    // Validate password
    if (userRecord.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    // Set current user and persist session
    setUser(userRecord.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userRecord.user));

    return { success: true };
  };

  /**
   * Register function - creates a new user account
   */
  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getStoredUsers();
    const emailKey = userData.email.toLowerCase();

    // Check if email already exists
    if (users[emailKey]) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    // Create new user object
    const newUser: User = {
      id: crypto.randomUUID(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date().toISOString(),
    };

    // Save user with password
    users[emailKey] = { user: newUser, password: userData.password };
    saveUsers(users);

    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true };
  };

  /**
   * Logout function - clears current session
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  /**
   * Update profile function - updates user data
   */
  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!user) {
      return { success: false, error: 'You must be logged in to update your profile.' };
    }

    const users = getStoredUsers();
    const emailKey = user.email.toLowerCase();

    // Update user data
    const updatedUser = { ...user, ...userData };
    users[emailKey].user = updatedUser;
    saveUsers(users);

    // Update current session
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return { success: true };
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * Throws an error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
