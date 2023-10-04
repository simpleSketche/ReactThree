import { useThree, extend, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import {OrbitControls} from'three/examples/jsm/controls/OrbitControls.js'
import SceneObject from '../Components/SceneObject.jsx'
import {useStore} from '../../Plugins/store.js'
import { useParams } from 'react-router-dom';

// inherit the orbitcontrols in react three fiber due to the orbitcontrol is not natively part of threejs
extend({OrbitControls})

export default function World(props){

    const {definitionInfo} = props;

    const {camera, gl, controls, scene} = useThree();
    const cubeRef = useRef()
    const groupRef = useRef()

    // access each animation frame
    useFrame((state, delta) => {
        // delta is how long it takes from the previous frame to the current frame
        cubeRef.current.rotation.y += 0.01
    })


    return <>

        <orbitControls args={[camera, gl.domElement]}/>
        
        <directionalLight position={[1,2,3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>

        <SceneObject definitionInfo={definitionInfo}/>

        <group ref={groupRef}>
            <mesh  position={[-3,0,0]}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange" wireframe/>
            </mesh>

            <mesh ref={cubeRef} rotation-y={Math.PI *0.25} position-x={2} scale={2}>
            <boxGeometry/>
            <meshStandardMaterial color="purple"/>
            </mesh>
        </group>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={[10,10,10]}>
                <planeGeometry/>
                <meshStandardMaterial color="lightgreen"/>
        </mesh>

    </>
}