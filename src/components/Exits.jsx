// Exits component : exits counter

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

import '../css/entries.css';
import { Link } from "react-router-dom";

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function Exits(){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Number of exits
    const [exits, setExits] = useState(null);
    const [validExits, setValidExits] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get current day exits
    useEffect(() => {    
        const getExits = async () => {
            if (isTokenValid()){
                try {                    
                    const response = await axios.get(`${apiUrl}/exits`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },
                    });                    
                    const data = response.data;                   
                    setExits(data.length);
                    setValidExits(data.filter(item => item.validDischarge === true).length);
                    
                } catch (error) {                
                    setError("Erreur lors de la récupération des dates"); 
                    console.log(error);                   
                }
            }
        };
        getExits();
    }, [token]);        

    return (
       
        <div className="exits">
            <Link to="/flux">
                <h2>Sorties</h2>
                <div className="entries__content">
                    <div className="entries__text-block">
                        <p className="entries__text-highlight">{exits}</p>
                        <p className="text-bold">attendues</p>
                    </div>
                    <hr className="entries__divider"/>
                    <div className="entries__text-block">
                        <p className="entries__text-highlight">{exits - validExits}</p>
                        <p className="text-bold">restantes</p>
                    </div>
                </div>
            </Link>
        </div>
    );

}

export default Exits;