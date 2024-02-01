// Profile component : include image, complete name and position or service (for doctor)

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useAuth } from "../contexts/AuthContext";

import '../css/menu.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

// Profile image URL
const imgUrl = import.meta.env.VITE_IMG_URL;

function Profile(){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Profile data
    const [profile, setProfile] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get user profile
    useEffect(() => {    
        const getProfile = async () => {
            if (isTokenValid()){
                try { 
                    // Request
                    const response = await axios.get(`${apiUrl}/user/profile`, {
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
        <>    
        {profile !== null ? (
            <div className="menu__profile">
                <img className="menu__profile-image" src={`${imgUrl}/${profile.profileImageName}`} alt="image de l'utilisateur" />
                    <div>
                        <p className="menu__profile-text text-bold">{profile.firstName} {profile.lastName}</p>
                        {profile.staff !== null && (
                            <p>{profile.staff.position}</p>
                        )}

                        {profile.doctor !== null && (
                            <p>{profile.doctor.service.name}</p>
                        )}
                        
                    </div>
            </div>
        ) : (
            <p>loading...</p>
        )}
        </>
    );

}

export default Profile;