// Search component : specific header, search bar and result

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';

import { useAuth } from "../contexts/AuthContext";
import Header from './Header';

import '../css/search.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function Search(){    

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Search text
    const [searchTerm, setSearchTerm] = useState('');

    // Search result list
    const [resultList, setResultList] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Input search value
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Post search request
    const handleSearch = async () => {
        if (isTokenValid()){
            if (searchTerm.length > 2) {
                try {   
                    // query
                    const queryData = {
                        query: searchTerm,                    
                    }; 
                       
                    // Request
                    const response = await axios.post(`${apiUrl}/patients/search`, queryData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`                       
                        },                        
                    }); 
                    setResultList(response.data); 
                } catch (error) {                
                    setError("Erreur lors de la requête");                                  
                }
            } else {
                setError("3 caractères minimum");
            } 
        }     
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        handleSearch();
        }
    };

    return (
        <div className="content">
            <Header title="Recherche d'un patient"/>
            <div className="search">
                <div className="search__bar">            
                    <input
                        className="search__input"
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <Button variant="contained" size="large" color="secondary" startIcon={<SearchIcon />} onClick={handleSearch}>Rechercher</Button>                
                </div>

                <div>{error}</div>

                <div className="search__result">
                    <List>
                        {resultList !== undefined ? (
                            resultList && resultList.length > 0 ? (
                                resultList.map((item) => (
                                    <>
                                    <Link to={`/patient/${item.id}`} key={item.id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={item.user.lastName} 
                                                secondary={item.user.firstName}                                       
                                            />
                                        </ListItem> 
                                    </Link>
                                    <Divider variant="middle" component="li" />  
                                    </>                                              
                                ))
                            ) : (
                                <p>Aucun résultat</p>
                            )
                        ) : (
                            <p>Chargement des données...</p>
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default Search;