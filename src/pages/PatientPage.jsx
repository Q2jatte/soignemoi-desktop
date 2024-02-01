// Patient Page : display stays, prescription ans comments details for one patient

import React from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import Menu from "../components/Menu";
import PatientDetails from "../components/PatientDetails";

import '../css/patient.css';

function PatientPage() {   
  
  // Authentication context
  const { isAuthenticated } = useAuth();

  // useParams is for recovering the ID inside the URL
  const { id } = useParams();
  
  return (
    isAuthenticated ? (
      <div className="main">

        {/* Left side fixed menu */}
        <Menu/>

        {/* Patient details */}
        <PatientDetails id={id}/>
      </div>           
    ) : (
      <Navigate to="/login" />
    )   
  );
}

export default PatientPage;