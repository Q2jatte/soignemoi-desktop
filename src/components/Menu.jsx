/* Menu : authentification des users */
import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import logo from '../assets/icon/logo.svg';

import axios from 'axios';
import '../css/menu.css';

function Menu() {  

  return (
    <div className="menu">
        <div>Logo</div>
        <div>Profil</div>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>

    
  );
}

export default Menu;