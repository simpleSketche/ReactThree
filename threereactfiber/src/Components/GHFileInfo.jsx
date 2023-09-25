import {apiGet} from '../services/api.js'
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

export default function GHFileInfo(){

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const [ghDefinitionFilesNames, setGhDefinitionFilesNames] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const result = await apiGet("GHDefinitions/GetGHDefinitions");
            setGhDefinitionFilesNames(result["ghDefinitionList"])
            // setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData(); // Call the asynchronous function
    
      }, []);

      useEffect(() => {
        console.log(ghDefinitionFilesNames);
      }, [ghDefinitionFilesNames]);

    return<>
    
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {ghDefinitionFilesNames ? (
                    ghDefinitionFilesNames.map((item, index) => (
                        <Grid xs={3} key={index}>
                            <Button variant="contained" color="success">{item.name}</Button>
                        </Grid>
                    ))
                    ) : (
                    <Grid item xs={12}>
                        Loading...
                    </Grid>
                )}
            </Grid>
        </Box>

    </>

}