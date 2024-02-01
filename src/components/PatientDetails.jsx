// Patient details component : 3 sections (stays, prescriptions and comments)

import { useState, useEffect } from "react";
import axios from 'axios';

import { useAuth } from "../contexts/AuthContext";

import Comments from "./Comments";
import Header from "./Header";
import Prescriptions from "./Prescriptions";
import Stays from "./Stays";

import '../css/patient.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function PatientDetails(props){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // User profile
    const [profile, setProfile] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get user profile
    useEffect(() => {    
        const getProfile = async () => {            
            if (isTokenValid()){
                try {   
                    // Checking the presence of the ID
                    if (!props.id) {
                        throw new Error("ID du patient non défini");
                    } 

                    // Request
                    const response = await axios.get(`${apiUrl}/patient/${props.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },
                    });          
                    setProfile(response.data);                
                } catch (error) {   
                    console.log(error);                             
                    setError("Erreur lors de la récupération du profil");                                 
                }
            }
        };
        getProfile();
    }, [token]); 

    return (
        <div className="content">
            <Header title="Fiche patient" />
            <div className="patient">
                <div className="patient__title">
                    {profile !== null ? (
                        <h2>Patient : {profile.user.firstName} {profile.user.lastName}</h2>
                    ) : (
                        <p>loading...</p>
                    )}
                    
                </div>
                <Stays id={props.id}/>  
                <Prescriptions id={props.id}/>
                <Comments id={props.id}/>                      
            </div>                
        </div>
    );
}

export default PatientDetails;