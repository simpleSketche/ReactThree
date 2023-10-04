import { Canvas, useThree, extend } from '@react-three/fiber'
import React, { useState, useRef,useEffect } from 'react';
import * as THREE from 'three'
import {fetchGHDefinitionFileNames, collectInputParams, solveParams} from '../services/api.js'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import Rhino from '../../Plugins/rhino.js'
import UITemplate from './UITemplate.jsx';
import { Typography } from '@mui/material';

const GHGeo = (props) => {
    const { data } = props
    const {scene} = useThree();
    const groupRef = useRef()
    console.log(props)
    return <>
        {   
            data.length > 0 && data.map((o, i) => {
            return (<group ref={groupRef} key = {i}>
                {
                    o.children.map((child, j) => {
                        return <primitive object={child} key={j} />
                    })
                }
                    </group>)
        })}
    </>
}

export default function SceneObject(props){

    const {definitionInfo} = props;
    console.log(definitionInfo)

    const { camera, scene, gl } = useThree(); // access three objects
    const rhino = new Rhino();

    const [globalList, setGlobalList] = useState([]);
    const [inputList, setInputList] = useState([]);

    // set up loader for converting the results to threejs
    const loader = new Rhino3dmLoader()
    loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/' )

    const clearScene = () => {
        console.log("reset the scene")
        scene.traverse = () => {
            scene.traverse(child => {
                if(!child.isLight){
                    scene.remove(child)
                }
            })
        }
    }

    const assignInputs = (inputs) => {

        setInputList([...inputList, inputs])
        console.log(inputs)
        const requestInputs = []

        console.log(inputs)

        inputs.map((input) => {
            console.log(input)
            input.value = input.value ? input.value : input.default.value
            let curInput = {
                "Value": input.value
            }

            requestInputs.push(curInput)
        })
        console.log(requestInputs)
        return requestInputs
    }

    const collectResults = async (responseJson) => {

        const values = responseJson.outputResult;
        let doc = undefined;

        // Clear doc
        if (doc !== undefined) {
            doc.delete();
        }

        doc = rhino.GetRhinoFile3dm();

        // Iterate through the response data
        for (let i = 0; i < values.length; i++) {
            for (const path in values[i].innerTree) {
            const branch = values[i].innerTree[path];
            for (let j = 0; j < branch.length; j++) {
                // Load Rhino geometry into doc
                let rhinoModel = branch[j];
                const rhinoObject = rhino.DecodeRhinoJson(rhinoModel);
                if (rhinoObject !== null) {
                doc.objects().add(rhinoObject, null);
                }
            }
            }
        }

        if (doc.objects().count < 1) {
            console.error('No Rhino objects to load!');
            return;
        }

        // Convert the Rhino doc to a buffer
        const buffer = new Uint8Array(doc.toByteArray()).buffer;

        return new Promise((resolve) => {
            // Use the loader to parse the buffer and resolve the promise
            loader.parse(buffer, (object) => {
            resolve(object);
            });
        });
        
    }


    const Solve = async (definitionInfo) => {

        // first clear the scene
        clearScene();
        console.log(definitionInfo)
        if(definitionInfo && definitionInfo.hasOwnProperty("inputs")){
            let requestInputs = assignInputs(definitionInfo.inputs)
            
            let solveRequest = {
                "Inputs": requestInputs,
                "InputNames": definitionInfo.inputNames,
                "DefinitionPath": definitionInfo.definitionPath
            }

            console.log(solveRequest)

            try{
                const solveRes = await solveParams(solveRequest)
                let resultObj = await collectResults(solveRes)
                return resultObj;
                
            }
            catch(e){
                console.log(e)
                console.log(e.message)
            }
        }
        
    }

    // mount, call this method whenever this ui component is mounted
    useEffect(() => {
        const fetchData = async() => {
            if(definitionInfo.hasOwnProperty('inputs')){
                let resultObj = await Solve(definitionInfo);
                setGlobalList([...globalList, resultObj])
            }
        }
        fetchData();
        
    }, [definitionInfo])

    useEffect(() => {
        console.log(globalList)
    },[globalList])

    // watcher, call this method whenever globalList is updated
    useEffect(() => {

        // zoomCameraToSelection(camera, controls, scene);

    }, [scene.children])

    return <>

        {/* {globalList.length > 0 && <primitive object={globalList[0].children[0]} />} */}

        <GHGeo data={globalList}/>
        {/* <group ref={groupRef}>
             {globalList.length > 0 && <primitive object={globalList[0].children[0]} />}
        </group> */}

        <mesh position-y={3} rotation-x={-Math.PI * 0.5} scale={[10,10,10]}>
                <planeGeometry/>
                <meshStandardMaterial color="lightgreen"/>
        </mesh>
    
    </>

}


