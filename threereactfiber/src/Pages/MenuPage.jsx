import {apiGet} from '../services/api.js'
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import {fetchGHDefinitionFileNames, collectInputParams} from '../services/api.js'
import { Link, useNavigate } from 'react-router-dom';


export default function MenuPage(){

    const navigate = useNavigate();

    const clickToScene = async (definitionName) => {
      // getParams to collect UI control info of the selected gh definition
      let requestDefinition = {
        "DefinitionName":definitionName
      }
      const definitionInfo = await collectInputParams(requestDefinition)

      console.log(definitionInfo)
      // and navigate to the particular page route
      navigate('/scene')
    }

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
            const result = await fetchGHDefinitionFileNames();
            setGhDefinitionFilesNames(result["ghDefinitionList"])
            // setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData(); 
    
      }, []);

    useEffect(() => {
      console.log(ghDefinitionFilesNames);
    }, [ghDefinitionFilesNames]);

  
    const containerStyle = {
      'minHeight': '100vh'
    }

    return<>
        <div style={containerStyle}>
          <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                  {ghDefinitionFilesNames ? (
                      ghDefinitionFilesNames.map((item, index) => (
                          <Grid xs={3} key={index}>
                              <Button variant="contained" color="success" onClick={() => clickToScene(item.name)}>{item.name}</Button>
                          </Grid>
                      ))
                      ) : (
                      <Grid item xs={12}>
                          Loading...
                      </Grid>
                  )}
              </Grid>
          </Box>
        </div>
    </>

}