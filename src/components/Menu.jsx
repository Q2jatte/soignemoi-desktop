/* Menu component : fixed menu with logo, user profile and other pages links */
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';


import logo from '../assets/images/full-logo.png';
import fluxIcon from '../assets/icon/personn-circle.svg';
import dashboardIcon from '../assets/icon/dashboard.svg';
import patientIcon from '../assets/icon/personn3.svg';

import LogoutIcon from '@mui/icons-material/Logout';

import '../css/menu.css';

import Profile from './Profile';

function Menu() {  

  // Authentication context
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="menu">
        <div className="menu__logo"><img src={logo} alt="" /></div>
        <Profile />
        <ul className="menu__list">
            <li><Link className="menu__item" to="/dashboard"><img src={dashboardIcon} alt="icone du lien tableau de bord" /><h2>Tableau de bord</h2></Link></li>
            <li><Link className="menu__item" to="/flux"><img src={fluxIcon} alt="icone du lien admission" /><h2>Admissions</h2></Link></li>
            <li><Link className="menu__item" to="/search"><img src={patientIcon} alt="icone du lien patient" /><h2>Patients</h2></Link></li>
            <li><button className="menu__item" onClick={logout}><LogoutIcon /><h2>Déconnexion</h2></button></li>           
        </ul>
    </div>

    
  );
}

export default Menu;