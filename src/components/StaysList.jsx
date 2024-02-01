// StaysList component : filter and result

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from "../contexts/AuthContext";

import axios from 'axios';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import '../css/stays.css';

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function StaysList(){

    // Context d'authentification
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Entry/Exit data
    const [entriesList, setEntriesList] = useState(null);
    const [exitsList, setExitsList] = useState(null);
    const [fluxList, setFluxList] = useState(null);

    // Services name
    const [servicesList, setServicesList] = useState(null);    
    const [selectedService, setSelectedService] = useState('Services');

    // Filter state
    const [entriesEnable, setEntriesEnable] = useState(true);
    const [exitsEnable, setExitsEnable] = useState(false);    
    const [filteredFluxList, setFilteredFluxList] = useState(null);

    // Error
    const [error, setError] = useState(null);
    
    // future : modal display
    const [open, setOpen] = useState(false);
    const handleOpen = (item) => {
        {/* Future : ouverture d'une modal pour la validation de l'entrée ou de la sortie
        setOpen(true);
        setStaySelected(item); */}
    }
    const handleClose = () => {
        setOpen(false);
        setStateValidButton(null);
    }

    // Future : modal button state
    const [stateValidButton, setStateValidButton] = useState(null);

    // Selected stay
    const [staySelected, setStaySelected] = useState(null);

    // Future : post validation
    const handleValidFlux = async () => {
        if (isTokenValid()){
            setStateValidButton("loading"); // changement du visuel du bouton de validation
            try {     
                if (entriesEnable){               
                    const response = await axios.post(`${apiUrl}/stay/entry/valid/${staySelected.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },                        
                    });
                } else {
                    const response = await axios.post(`${apiUrl}/stay/exit/valid/${staySelected.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },                        
                    });
                }
                setStateValidButton("success");                   
            } catch (error) {                
                setError("Erreur lors de la requête");  
                setStateValidButton(null);                  
            }
        }
    };

    // Manage filter button state and displayed data
    const handleFilterEntries = () => {
        if (!entriesEnable) {
            setEntriesEnable(true);
            setExitsEnable(false);  

            // loading data
            setFluxList(entriesList);
        }
    };

    const handleFilterExits = () => {
        if (!exitsEnable) {            
            setEntriesEnable(false);
            setExitsEnable(true);

            // loading data
            setFluxList(exitsList); 
        }
    };

    // select service filter
    const handleServiceChange = (e) => {        
        const selectedValue = e.target.value;
        setSelectedService(selectedValue);        
    };

    // Apply service filter
    const applyFilterByService = () => {        
        if (selectedService === 'Services') {
        // Si le service sélectionné est "Services", afficher toutes les données
        setFilteredFluxList(fluxList);
        } else {
        // Sinon, filtrer les données par le nom du service
        const filteredData = fluxList.filter((item) => item.service.name === selectedService);
        setFilteredFluxList(filteredData);
        }
    };

    // call apply filter function on select input change
    useEffect(() => {
        // Apply filter
        applyFilterByService();
    }, [selectedService, fluxList]);

    // Get data
    useEffect(() => {    
        // Get entries
        const getEntries = async () => {
            if (isTokenValid()){
                try {                    
                        const response = await axios.get(`${apiUrl}/entries`, {
                            headers: {
                                'Authorization': `Bearer ${token}`                       
                            },                        
                        });                                  
                        setEntriesList(response.data);
                        setFluxList(response.data); // au lancement de la page, on affiche les entrées
                        setFilteredFluxList(response.data);
                    
                } catch (error) {                
                    setError("Erreur lors de la requête");                    
                }
            }
        };

        // Get exits
        const getExits = async () => {
            if (isTokenValid()){
                try {                    
                    const response = await axios.get(`${apiUrl}/exits`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },                        
                    });                                       
                    setExitsList(response.data);
                } catch (error) {                
                    setError("Erreur lors de la requête");                    
                }
            }
        };

        // Get services name list
        const getServices = async () => {
            if (isTokenValid()){
                try {                    
                    const response = await axios.get(`${apiUrl}/services`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },                        
                    }); 
                    setServicesList(response.data); 
                } catch (error) {                
                    setError("Erreur lors de la requête");                    
                }
            }
        };
        getEntries();
        getExits();
        getServices();
    }, [token]);

    return (
        <div className="stays">
            <div className="stays__filter">
                <h2>Filtres :</h2>
                <Button variant={entriesEnable ? "contained" : "outlined"} size="large" onClick={handleFilterEntries} color="secondary">
                Entrées
                </Button>
                <Button variant={exitsEnable ? "contained" : "outlined"} size="large" onClick={handleFilterExits} color="secondary">
                Sorties
                </Button>
                
                <select className="stays__select" onChange={handleServiceChange} value={selectedService}>
                    {servicesList !== undefined ? (
                        servicesList && servicesList.length > 0 ? (  
                            <>
                            <option>Services</option>                      
                            {servicesList.map((service) => (
                                <option key={service.name}>{service.name}</option>
                            ))}
                            </>
                        ) : (
                            <option>Aucun service</option>
                        )
                    ) : (
                        <option>Chargement des données...</option>
                    )}                    
                </select>
                
            </div>
            <div className="stays__frame">
                <div className="stays__grid">

                    {filteredFluxList !== undefined ? (
                        filteredFluxList && fluxList.length > 0 ? (
                            filteredFluxList.map((item) => (
                                <div className={"stays__item"} onClick={() => handleOpen(item)}>
                                    <Link to={`/patient/${item.patient.id}`} key={item.id}>
                                        {item.patient.user.lastName} {item.patient.user.firstName}
                                    </Link>
                                </div>                              
                            ))
                        ) : (
                            <p>Aucun séjour</p>
                        )
                    ) : (
                        <p>Chargement des données...</p>
                    )}
                    
                </div>
            </div>

            {/* Future : Modal de validation des entrées et sorties */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h4" align="center">
                        {entriesEnable ? "Validation des entrées" : "Validation des sorties"}
                    </Typography>
                    <Typography variant="body1" id="modal-modal-description" sx={{ mt: 2 }}>
                        { staySelected !== null ? (
                            entriesEnable
                                ? `Confirmer l'entrée de ${staySelected.patient.user.firstName} ${staySelected.patient.user.lastName} ?` 
                                : `Confirmer la sortie de ${staySelected.patient.user.firstName} ${staySelected.patient.user.lastName} ?`
                            
                        ) : null }                                           
                    </Typography>
                    <Typography variant="body1" id="modal-modal-description" sx={{ mt: 2 }}>
                        { staySelected !== null ? (
                            <>Voir la fiche client <Link to={`/patient/${staySelected.patient.id}`}><FileOpenIcon /></Link></>
                        ) : null }                               
                    </Typography>

                    { error !== null ? (
                        <Typography color="warning">{error}</Typography>
                    ) : null } 
                    
                    {(() => {
                        switch (stateValidButton) {
                            case "loading":
                                return (
                                    <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                    >
                                        Valider
                                    </LoadingButton>
                                );
                            case "success":
                                return (
                                    <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon />}>
                                        Valider
                                    </Button>
                                );
                            default:
                                return (
                                    <Button variant="contained" onClick={handleValidFlux}>Valider</Button>
                                );
                        }
                    })()}                    
                    <Button variant="contained" color="error" onClick={handleClose}>Annuler</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default StaysList;