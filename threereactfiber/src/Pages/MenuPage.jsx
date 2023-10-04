import {apiGet} from '../services/api.js'
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import {fetchGHDefinitionFileNames, collectInputParams} from '../services/api.js'
import { Link, useNavigate } from 'react-router-dom';
import {useStore} from '../../Plugins/store.js'



export default function MenuPage(){

    const ghDefinitionList = useStore((state) => state.ghDefinitionList);
    const getGhDefinitions = useStore((state) => state.getGhDefinitions);

    const selGhDefinition = useStore((state) => state.selGhDefinition);
    const getSelGhDefinition = useStore((state) => state.setSelGhDefinition);
    
    const [ghDefinitionFilesNames, setGhDefinitionFilesNames] = useState([]);

    const navigate = useNavigate();

    const clickToScene = async(definitionName) => {
      // getParams to collect UI control info of the selected gh definition
      await getSelGhDefinition(definitionName)
      // and navigate to the particular page route
      navigate(`/scene/${definitionName}`)
    }

    useEffect(() => {
      getGhDefinitions();
    }, [])

    useEffect(() => {
      setGhDefinitionFilesNames(ghDefinitionList)
    }, [ghDefinitionList])

    
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
                              <Button variant="contained" color="success" onClick={async() => clickToScene(item.name)}>{item.name}</Button>
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