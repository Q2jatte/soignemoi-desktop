// Future component : table content all visits of the current day

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import '../css/visits.css';

function createData(doctor, service, visits) {
    return { doctor, service, visits };
}

function DailyVisits(){

    const rows = [
        createData('Dr. Serena Hawthorne', 'Cardiologie', 5),
        createData('Dr. Victor Everest', 'Neurologie', 4),
        createData('Dr. Isabella Sterling', 'Pédiatrie', 5),        
      ];

    return (
        <div className="visits">
            <h2>Visites du jour</h2>
            <div className="visits__content">

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Praticien</TableCell>
                            <TableCell align="right">Service</TableCell>
                            <TableCell align="right">Visites</TableCell>                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.doctor}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.doctor}
                            </TableCell>
                            <TableCell align="right">{row.service}</TableCell>
                            <TableCell align="right">{row.visits}</TableCell>                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
                
            </div>
        </div>
    );

}

export default DailyVisits;