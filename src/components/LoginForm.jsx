// Login Form : user authentication

import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';

import logo from '../assets/icon/logo.svg';

import '../css/loginForm.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function LoginForm() {  

  // form values
  const [email, setEmail] = useState('h.andre@soignemoi.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  // Authentication context
  const { login, saveCredentials } = useAuth();  

  // Post authentication request
  const handleLogin = async (e) => {
      e.preventDefault();

      try {
          const loginData = {
              username: email,
              password: password,
          };          

          const response = await axios.post(`${apiUrl}/login_check`, loginData, {
              headers: {
              'Content-Type': 'application/json',                         
              },
          });
          // Token registration       
          const token = response.data.token;         
          
          // Update authentication context         
          login(token);   
          saveCredentials(email, password);       

          //redirect
          setRedirectToDashboard(true);
      
      } catch (error) {
          if (error.response) {
              // Specific error message
              if (error.response.status === 401) {
                // Authentication error
                setError("Identifiants incorrects. Veuillez réessayer.");
              } else {
                // Server error
                setError("Une erreur s'est produite lors de la requête de login.");
              }
          } else {
            // other error
            setError("Une erreur inattendue s'est produite.");
          }           
      }
  };  

  return (
    <section className="login">
        <img src={logo}/>
        <form className="login__form" onSubmit={handleLogin}>
            <input type="email" className="login__input" id="login__email" name="login__email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />            
            <input type="password" className="login__input" id="login__password" name="login__password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="min-button button-green">Se connecter</button>
        </form> 

        {redirectToDashboard && <Navigate to="/dashboard" />} 
    </section>
  );
}

export default LoginForm;