// Stays component : all patient's stays table

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useAuth } from "../contexts/AuthContext";

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

// Table MUI custom style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F5652F",
        color: "#FFFFFF",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#54A092",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
  
function Stays(props){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Stays list
    const [staysList, setStaysList] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get stays
    useEffect(() => {    
        const getAllStays = async () => {
            if (isTokenValid()){
                try {   
                    // Checking presence of the ID
                    if (!props.id) {
                        throw new Error("ID du patient non défini");
                    } 

                    // Request
                    const response = await axios.get(`${apiUrl}/patients/${props.id}/stays/all`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },
                    });            
                    setStaysList(response.data);                
                } catch (error) { 
                    console.log(error);               
                    setError("Erreur lors de la récupération des séjours");                                 
                }
            }
        };
        getAllStays();
    }, [token]); 
    
    // Formating date
    function formatFullDate(fullDateString) {
        const dateObject = new Date(fullDateString);
        
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Les mois commencent à partir de zéro, donc on ajoute 1
        const year = dateObject.getFullYear();
      
        const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
      
        return formattedDate;
      }

    return (        

        <div className="patient__section">
            <h2 className="patient__subtitle">Séjours</h2>            
                {staysList !== null ? (
                    staysList && staysList.length > 0 ? ( 
                        <div className="patient__table">                       
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Entrée</StyledTableCell>
                                        <StyledTableCell align="right">Sortie</StyledTableCell>
                                        <StyledTableCell align="right">Service</StyledTableCell>
                                        <StyledTableCell align="right">Commentaire</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {staysList.map((row) => (
                                        <StyledTableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell component="th" scope="row">
                                                {formatFullDate(row.entranceDate)}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{formatFullDate(row.dischargeDate)}</StyledTableCell>
                                            <StyledTableCell align="right">{row.service.name}</StyledTableCell>
                                            <StyledTableCell align="right">{row.reason}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                        </div>                                    
                        
                    ) : (
                        <p>Aucun séjour</p>
                    )
                ) : (
                    <p>Chargement des données...</p>
                )}            
        </div>
    );

}

export default Stays;