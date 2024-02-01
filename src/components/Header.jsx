// Header component : title and illustrtion and widgets

import React, { useState, useEffect } from "react";

import axios from 'axios';

import { useAuth } from "../contexts/AuthContext";

import family from '../assets/images/family.png';
import calendar from '../assets/icon/calendar-badge-clock.svg';
import waveform from '../assets/icon/waveform-path.svg';

import '../css/header.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function Header(props){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Occupation
    const [occupation, setOccupation] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get current day patient occupation
    useEffect(() => {    
        const getOccupation = async () => {
            if (isTokenValid()){
                try {                   
                    const response = await axios.get(`${apiUrl}/stay/occupation`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },
                    });                    
                    const data = response.data;
                    setOccupation(data);
                } catch (error) {                
                    setError("Erreur lors de la récupération de l'occupation"); 
                    console.log(error);                   
                }
            }
        };
        getOccupation();
    }, [token]);       

    return(
        <div className="header">
            <div className="header__widgets">
                <h1 className="header__title">{props.title}</h1>
                <div className="header__widget">
                    <div className="header__icon-frame">
                        <img className="header__icon-image" src={calendar} alt="" />
                    </div>
                    <div className="header__widget-block-text">
                        <p className="header__widget-text">Mardi 11 Novembre</p>
                        <p className="header__widget-text">2023</p>
                    </div>
                </div>
                <div className="header__widget">
                    <div className="header__icon-frame">
                        <img className="header__icon-image" src={waveform} alt="" />
                    </div>
                    <div className="header__widget-block-text">
                        <p className="header__widget-text">{occupation !== null && (occupation)} patient{occupation > 1 && 's'}</p>
                        <p className="header__widget-text">en séjour</p>
                    </div>
                </div>
            </div>
            <div className="header__illustration">
                <img className="header__illustration-image" src={family} alt="" />
            </div>            
        </div>
    );
}

export default Header;