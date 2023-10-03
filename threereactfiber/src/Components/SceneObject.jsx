import { Canvas, useThree, extend } from '@react-three/fiber'
import React, { useState, useRef,useEffect } from 'react';
import * as THREE from 'three'
import {fetchGHDefinitionFileNames, collectInputParams, solveParams} from '../services/api.js'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import Rhino from '../Plugins/rhino.js'


const clearScene = () => {
    const {scene} = useThree();

    scene.traverse = () => {
        scene.traverse(child => {
            if(!child.isLight){
                scene.remove(child)
            }
        })
    }
}

const GHGeo = (props) => {
    const { data } = props
    const {scene} = useThree();
    const groupRef = useRef()

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

const zoomCameraToSelection = (camera, controls, scene,fitOffset = 1.2) => {
    
    const selection = scene.children
    const box = new THREE.Box3();
  
    for (const object of selection) {
      if (object.isLight) continue;
      box.expandByObject(object);
    }
  
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
  
    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);
    console.log(controls)
    // const direction = controls.target
    //   .clone()
    //   .sub(camera.position)
    //   .normalize()
    //   .multiplyScalar(distance);
  
    // controls.maxDistance = distance * 10;
    // controls.target.copy(center);
  
    // camera.near = distance / 100;
    // camera.far = distance * 100;
    // camera.updateProjectionMatrix();
    // camera.position.copy(controls.target).sub(direction);
  
    // controls.update();
  }

export default function SceneObject(){

    const { camera, scene, gl } = useThree(); // access three objects
    const rhino = new Rhino();

    const [globalList, setGlobalList] = useState([]);

    // set up loader for converting the results to threejs
    const loader = new Rhino3dmLoader()
    loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/' )

    const assignInputs = (inputs) => {

        const requestInputs = []

        inputs.map((input) => {
            input.value = input.value ? input.value : input.default.value
            let curInput = {
                "Value": input.value
            }

            requestInputs.push(curInput)
        })
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

    const Solve = async (definitionName) => {
        // getParams to collect UI control info of the selected gh definition
        let requestDefinition = {
            DefinitionName:definitionName
        }
        const definitionInfo = await collectInputParams(requestDefinition)
        

        let requestInputs = assignInputs(definitionInfo.inputs)
        let solveRequest = {
            "Inputs": requestInputs,
            "InputNames": definitionInfo.inputNames,
            "DefinitionPath": definitionInfo.definitionPath
        }

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

    // mount, call this method whenever this ui component is mounted
    useEffect(() => {

        const fetchData = async() => {
            let resultObj = await Solve("value_list.gh");
            setGlobalList([...globalList, resultObj])
        }
        fetchData();
    }, [])

    // watcher, call this method whenever globalList is updated
    useEffect(() => {
        
        console.log(controls)
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


