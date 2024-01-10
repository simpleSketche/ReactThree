import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef, useEffect, useCallback, useState } from 'react'

type glbProps = {
    glb?: Object;
  }


const Gltf: React.FC<glbProps> = ({glb}) => {

    const [url, setUrl] = useState();

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(glb)
        reader.onloadend = () => {
          setUrl(reader.result)
        }
      },[glb])


    const glbModel = url ? useLoader(GLTFLoader, url) : null;
    const glbMesh = () => {
      return glbModel ? <primitive object ={glbModel.scene} matrix={trans}/> : null;
    }

    return (
        <>
        </>
    )

}

export default Gltf;