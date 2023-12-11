/* Login Form : authentification des users */
import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import logo from '../assets/icon/logo.svg';

import axios from 'axios';
import '../css/loginForm.css';

function LoginForm() {  

  // valeurs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  // Context d'authentification
  const { login } = useAuth();
  
  // génération du cookie avec le token JWT
  const setHttpOnlySecureCookie = (cookieName, cookieValue, expirationDays = 7) => {

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookieOptions = {
      path: '/',  // Chemin du cookie (modifiable selon vos besoins)
      expires: expirationDate,
      secure: false, // TODO true pour https
      httpOnly: true,
      sameSite: 'strict',
      };

    const formattedCookie = `${cookieName}=${cookieValue}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
    
    // création du cookie
    document.cookie = formattedCookie;
   
    console.log("Cookie enregistré : " + formattedCookie);    
  };  

  const handleLogin = async (e) => {
      e.preventDefault();

      try {
          const loginData = {
              username: email,
              password: password,
          };          

          const response = await axios.post('http://127.0.0.1:8000/api/login_check', loginData, {
              headers: {
              'Content-Type': 'application/json',                         
              },
          });
          // enregistrement du token
          console.log('Réponse de la requête de login :', response.data);
          const token = response.data.token;
          setHttpOnlySecureCookie('auth_token', token);

          // màj du contexte
          login({ username: 'test@test.fr' });          

          //redirection 
          setRedirectToDashboard(true);
      
      } catch (error) {
          if (error.response) {
              // La requête a été effectuée, mais le serveur a répondu avec un code d'erreur
              if (error.response.status === 401) {
                // Traitement spécifique pour une erreur 401 (Non autorisé)
                setError("Identifiants incorrects. Veuillez réessayer.");
              } else {
                // Autres erreurs de réponse du serveur
                setError("Une erreur s'est produite lors de la requête de login.");
              }
            } else if (error.request) {
              // La requête n'a pas été effectuée
              setError("La requête de login n'a pas pu être effectuée.");
            } else {
              // Autres erreurs
              setError("Une erreur inattendue s'est produite : " + error);
            }           
      }
  };  

  return (
    <section className="login">
        <img src={logo}/>
        <form className="login__form" onSubmit={handleLogin}>
            <input type="email" className="login__input" id="login__email" name="login__email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />            
            <input type="password" className="login__input" id="login__password" name="login__password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <p><a href="#">Mot de passe oublié ?</a></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="min-button button-green">Se connecter</button>
        </form> 

        {redirectToDashboard && <Navigate to="/dashboard" />} 
    </section>
  );
}

export default LoginForm;