import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

const World: React.FC = () => {

    const cube = useRef()
    const sphere = useRef()

    return (
      <>
      <Canvas>
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh ref={ cube } position-x={ 0 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        {/* <TransformControls object={ cube } /> */}

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
            <planeGeometry/>
            <MeshReflectorMaterial
                resolution={ 512 }
                blur={ [ 1000, 1000 ] }
                mixBlur={ 1 }
                mirror={ 0.5 }
                color="greenyellow"
            />
        </mesh>
        </Canvas>
      </>
    );
  };

  export default World