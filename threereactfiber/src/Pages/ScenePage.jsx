import { Canvas, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {fetchGHDefinitionFileNames, collectInputParams, solveParams} from '../services/api.js'
import World from '../Components/World.jsx'

import * as THREE from 'three'
import { useEffect, Suspense, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

import {Slider} from '@mui/material'
import {Typography} from '@mui/material'
import {Switch} from '@mui/material'
import { Stack } from '@mui/material'

extend({OrbitControls : OrbitControls})

export default function ScenePage(){

    const [curDefinitionInfo, setCurDefinitionInfo] = useState([]);
    const [isBool, setBool] = useState(true);

    const selGhDefinitionName = useParams().ghFileName;

    const getDefinitionInfo = async() => {
        // getParams to collect UI control info of the selected gh definition
        let requestDefinition = {
            DefinitionName:selGhDefinitionName
        }
        const definitionInfo = await collectInputParams(requestDefinition)
        console.log("load the gh definition info")
        setCurDefinitionInfo(definitionInfo);
    }

    const updateInput = (event, inputToChange) => {
        let newVal = event.target.value;

        const updatedInputs = curDefinitionInfo.inputs.map((input) =>
            input.name === inputToChange.name
            ? { ...input, value: newVal }
            : input
        );

        setCurDefinitionInfo({
            ...curDefinitionInfo,
            inputs: updatedInputs
        })
    }

    const setupUiTemp = (input) => {

        const updateBool = (event) => {
            setBool(event)
        }

            const inputName = input["name"]
            const inputType = input["paramType"]
            const maxVal = input["atMost"]
            const minVal = input["atLeast"]
            const defaultValue = input["value"]

            switch(inputType){
                case 'Integer':
                    console.log(inputType)
                    return (
                    <div
                    >
                        <Typography 
                        gutterBottom
                        sx={{paddingTop:"2vh"}}>
                            {inputName}
                        </Typography>
                        <Slider
                            id={inputName}
                            sx={{
                            width: "50vw",
                            }}
                            defaultValue ={defaultValue}
                            valueLabelDisplay="auto"
                            step={1}
                            min={minVal}
                            max={maxVal}
                            onChange={(event) => updateInput(event, input)}
                        ></Slider>
                    </div>
                    )
                case 'Number':
                    return (
                    <div>
                        <Typography 
                        gutterBottom
                        sx={{paddingTop:"2vh"}}>
                            {inputName}
                        </Typography>
                        <Slider
                        sx={{
                            width: "50vw",
                            }}
                        defaultValue ={defaultValue}
                        valueLabelDisplay="auto"
                        step={0.1}
                        min={minVal}
                        max={maxVal}
                        onChange={(event) => updateInput(event, input)}
                    ></Slider>
                    </div>
                    )
                case 'Boolean':
                    updateBool(defaultValue)
                    return(
                    <div>
                        <Typography gutterBottom>
                            {inputName}
                        </Typography>
                        <Stack>
                            <Typography gutterBottom>
                                On
                            </Typography>
                            <Switch
                                checked = {isBool}
                                onChanged = {updateBool}
                                name={inputName}
                                onChange={updateInput}
                            />
                            <Typography gutterBottom>
                                Off
                            </Typography>
                        </Stack>
                    </div>
                    )
            }

    }

    useEffect(() => {
        console.log(curDefinitionInfo)
    },[curDefinitionInfo])

    useEffect(() => {
        getDefinitionInfo();
    }, [selGhDefinitionName])

    return <>
            <div>
                {
                    curDefinitionInfo["inputs"]?.length > 0 && curDefinitionInfo["inputs"].map((item, key) => {
                        return setupUiTemp(item)
                    })
                }
            </div>
            <Canvas
                    // adjust the min and max pixel ratio threashold
                    dpr={[0.5 ,2]}

                    // adjust gl
                    gl={
                        {
                        antialias:true,
                        toneMapping:THREE.ACESFilmicToneMapping,
                        outputColorSpace: THREE.SRGBColorSpace
                        }
                    }

                    // adjust camera
                    camera={
                        {
                            fov:60,
                            near:0.1,
                            far:10000,
                            position:[5,5,5],
                            up:[0,0,1] // set z as default axis going up
                        }
                    }
                >
                    <Suspense>
                        <World definitionInfo = {curDefinitionInfo}/>
                    </Suspense>
                </Canvas>
        </>

}


