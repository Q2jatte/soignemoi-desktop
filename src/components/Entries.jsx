// Entries component : entries counter

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

import '../css/entries.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function Entries(){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // number of entries
    const [entries, setEntries] = useState(null);
    const [validEntrance, setValidEntrance] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get current day entries
    useEffect(() => {    
        const getEntries = async () => {
            if (isTokenValid()){
                try {                   
                    const response = await axios.get(`${apiUrl}/entries`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },
                    });                    
                    const data = response.data;
                    setEntries(data.length);
                    setValidEntrance(data.filter(item => item.validEntrance === true).length);
                    
                } catch (error) {                
                    setError("Erreur lors de la récupération des dates"); 
                    console.log(error);                   
                }
            }
        };
        getEntries();
    }, [token]);        

    return (    
        <div className="entries">
            <Link to="/flux">
                <h2>Entrées</h2>
                <div className="entries__content">
                    <div className="entries__text-block">
                        <p className="entries__text-highlight">{entries}</p>
                        <p className="text-bold">attendues</p>
                    </div>
                    <hr className="entries__divider"/>
                    <div className="entries__text-block">
                        <p className="entries__text-highlight">{entries - validEntrance}</p>
                        <p className="text-bold">restantes</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Entries;