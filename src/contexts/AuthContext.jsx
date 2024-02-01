// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

// Create context
const AuthContext = createContext();

// Create context provider
export const AuthProvider = ({ children }) => {  
  // Initial authentication state set to false
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Token state, initialized to null
  const [token, setToken] = useState(null);

  // Token expiration state
  const [tokenExpiration, setTokenExpiration] = useState(null);

  // State for credentials
  const [storedCredentials, setStoredCredentials] = useState({
    username: '',
    password: '',
  });

  // Function to handle login action
  const login = (token) => {
    setIsAuthenticated(true);  
    setToken(token);

    // Retrieve token expiration
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp) {
      setTokenExpiration(new Date(decodedToken.exp * 1000));
    }
  };

  // Function to handle logout action
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setTokenExpiration(null);
    clearStoredCredentials();
  };

  useEffect(() => {
    // Check token validity when it changes
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp) {
        setTokenExpiration(new Date(decodedToken.exp * 1000));
      }
    }
  }, [token]);

  // Store management
  const saveCredentials = (username, password) => {
    // Save login information securely
    setStoredCredentials({ username, password });
  };

  const clearStoredCredentials = () => {
    // Clear stored login information
    setStoredCredentials({ username: '', password: '' });
  };

  // Check token validity
  const isTokenValid = async () => {
    // Check if the token is present and has not expired
    if (token && tokenExpiration && tokenExpiration > new Date()){
      return true;
    } else if (token && tokenExpiration && tokenExpiration <= new Date()){ // expired token
        return await renewToken();
    } else {
      return false;
    }
  };

  // Renew the token
  const renewToken = async () => {
    try {
      const { username, password } = storedCredentials;
            
      const response = await axios.post(`${apiUrl}/login_check`, { username, password }, {
          headers: {
          'Content-Type': 'application/json',                         
          },
      });
      // Save the new token       
      const newToken = response.data.token;         

      // Update the authentication context          
      login(newToken);
      console.log("renew success");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Provide context and its values to child components
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isTokenValid, login, logout, saveCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
