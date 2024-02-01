// Comments component : display comments table 

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

// API URL
const apiUrl = import.meta.env.VITE_API_ROOT_URL;

function Comments(props){

    // Authentication context
    const { isAuthenticated, token, isTokenValid } = useAuth();

    // Comments list
    const [commentsList, setCommentsList] = useState(null);

    // Error
    const [error, setError] = useState(null);

    // Get comments request
    useEffect(() => {    
        const getAllComments = async () => {            
            if (isTokenValid()){
                try {   
                    // Checking the presence of the ID
                    if (!props.id) {
                        throw new Error("ID du patient non défini");
                    } 

                    const response = await axios.get(`${apiUrl}/comments/${props.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`                       
                        },
                    });                             
                    setCommentsList(response.data);                
                } catch (error) { 
                    console.log(error);               
                    setError("Erreur lors de la récupération des prescription");                                 
                }
            }
        };
        getAllComments();
    }, [token]); 
    
    // Formatting dates
    function formatFullDate(fullDateString) {
        const dateObject = new Date(fullDateString);
        
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Months start from zero, so we add 1
        const year = dateObject.getFullYear();
      
        const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
      
        return formattedDate;
      }

    return (        

        <div className="patient__section">
            <h2 className="patient__subtitle">Avis médicaux</h2>            
                {commentsList !== undefined ? (
                    commentsList && commentsList.length > 0 ? (                        
                        <div className="patient__table">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Créé le</StyledTableCell>
                                        <StyledTableCell align="right">Titre</StyledTableCell>
                                        <StyledTableCell align="right">Note</StyledTableCell>                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {commentsList.map((row) => (
                                        <StyledTableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <StyledTableCell component="th" scope="row">
                                            {formatFullDate(row.createAt)}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.title}</StyledTableCell>
                                        <StyledTableCell align="right">{row.content}</StyledTableCell>                                    
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                        </div>                                    
                        
                    ) : (
                        <p>Aucun avis médical</p>
                    )
                ) : (
                    <p>Chargement des données...</p>
                )}            
        </div>
    );
}

export default Comments;