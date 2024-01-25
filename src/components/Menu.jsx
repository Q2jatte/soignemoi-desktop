/* Menu : authentification des users */
import React from 'react';
import { Link } from 'react-router-dom';


import logo from '../assets/images/full-logo.png';
import fluxIcon from '../assets/icon/personn-circle.svg';
import dashboardIcon from '../assets/icon/dashboard.svg';
import patientIcon from '../assets/icon/personn3.svg';

import '../css/menu.css';

function Menu() {  

  return (
    <div className="menu">
        <div className="menu__logo"><img src={logo} alt="" /></div>
        <div className="menu__profile">
          <img className="menu__profile-image" src="http://127.0.0.1:8000/upload/images/img-01.png" alt="" />
          <div>
            <p className="menu__profile-text text-bold">Maya Harington</p>
            <p>Agent hospitalier</p>
          </div>
        </div>
        <ul className="menu__list">
            <li><Link className="menu__item" to="/dashboard"><img src={dashboardIcon} alt="icone du lien tableau de bord" /><h2>Tableau de bord</h2></Link></li>
            <li><Link className="menu__item" to="/flux"><img src={fluxIcon} alt="icone du lien admission" /><h2>Admissions</h2></Link></li>
            <li><Link className="menu__item" to="/search"><img src={patientIcon} alt="icone du lien patient" /><h2>Patients</h2></Link></li>            
        </ul>
    </div>

    
  );
}

export default Menu;