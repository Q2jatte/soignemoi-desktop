// Search Page: search patient by name

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

import Menu from "../components/Menu";
import Search from "../components/Search";

import '../css/flux.css';

function SearchPage() { 
  
  // Authentication context
  const { isAuthenticated } = useAuth();
  
  return (
    isAuthenticated ? (
      <div className="main">

        {/* Left side fixed menu */}
        <Menu/>

        {/* Search bar and results */}
        <Search/>
      </div>           
    ) : (
      <Navigate to="/login" />
    )   
  );
}

export default SearchPage;