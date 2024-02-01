// Flux page: Manage patients entries and exits
import React from "react";
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

import Menu from "../components/Menu";
import Flux from "../components/Flux";

import '../css/flux.css';


function FluxPage() {   
  
  // Authentication context
  const { isAuthenticated } = useAuth();
  
  return (
    isAuthenticated ? (

      <div className="main">
        {/* Left side fixed menu */}
        <Menu/>

        {/* Manage patients flux */}
        <Flux/>
      </div>            
    ) : (
      <Navigate to="/login" />
    )   
  );
}

export default FluxPage;