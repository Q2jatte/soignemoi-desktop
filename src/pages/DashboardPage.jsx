// Dashboard Page : resume all important informations

import React from "react";
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

import Menu from "../components/Menu";
import Dashboard from "../components/Dashboard";

import '../css/dashboard.css';

function DashboardPage() {  
  
  // Context d'authentification
  const { isAuthenticated } = useAuth();
  
  return (
    isAuthenticated ? (
      <div className="main">

        {/* Left side fixed menu */}
        <Menu/>

        {/* informations widgets */}
        <Dashboard/>
      </div>
            
    ) : (
      <Navigate to="/login" />
    )    
  );
}

export default DashboardPage;