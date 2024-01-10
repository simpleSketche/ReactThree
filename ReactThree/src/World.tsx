import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { useControls } from 'leva'

type glbProps = {
  glb?: Object;
}

const GlbMesh = ({glb, matrix}) => {

  const camera = useThree(state => state.camera)
  console.log(THREE.Object3D.DEFAULT_UP)
  camera.up.set(0,0,1)

  const [url, setUrl] = useState();

  const glbModel = url ? useLoader(GLTFLoader, url) : null;

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(glb)
    reader.onloadend = () => {
      setUrl(reader.result)
    }
  },[glb])

  useEffect(() => {
    if (glbModel && matrix) {
      glbModel.scene.rotation.set(0,0,Math.PI/2)
      console.log(glbModel.scene)
      glbModel.scene.matrix = matrix;
      glbModel.scene.matrixAutoUpdate = false;
    }
  },[glbModel, matrix])

  return glbModel ? <primitive object ={glbModel.scene}/> : null;
}

const World: React.FC<glbProps> = ({glb}) => {

      useEffect(() => {
        THREE.Object3D.DEFAULT_UP.set(0,0,1)
      },[])

      const options = useMemo(() => {
        return {
          m00:{value: 1, min: -10, max: 10, step: 0.01},
          m01:{value: 0, min: -10, max: 10, step: 0.01},
          m02:{value: 0, min: -10, max: 10, step: 0.01},
          m03:{value: 0, min: -10, max: 10, step: 0.01},
  
          m10:{value: 0, min: -10, max: 10, step: 0.01},
          m11:{value: 1, min: -10, max: 10, step: 0.01},
          m12:{value: 0, min: -10, max: 10, step: 0.01},
          m13:{value: 0, min: -10, max: 10, step: 0.01},
  
          m20:{value: 0, min: -10, max: 10, step: 0.01},
          m21:{value: 0, min: -10, max: 10, step: 0.01},
          m22:{value: 1, min: -10, max: 10, step: 0.01},
          m23:{value: 0, min: -10, max: 10, step: 0.01},
  
          m30:{value: 0, min: -10, max: 10, step: 0.01},
          m31:{value: 0, min: -10, max: 10, step: 0.01},
          m32:{value: 0, min: -10, max: 10, step: 0.01},
          m33:{value: 1, min: -10, max: 10, step: 0.01},
        }
      })

    const transition = useControls('transition', options)
  
    const trans = new THREE.Matrix4();

    useEffect(() => {
      if(transition){
        trans.set(
          transition.m00, transition.m01, transition.m02, transition.m03,
          transition.m10, transition.m11, transition.m12, transition.m13,
          transition.m20, transition.m21, transition.m22, transition.m23,
          transition.m30, transition.m31, transition.m32, transition.m33,
         )
      }
    }, [transition])
    
    

    const cube = useCallback(node => {
      cube.current = node;
      if(node){
        console.log("move the cube!!!")

        // Apply the matrix transformation
        cube.current.matrix = trans;
        cube.current.matrixAutoUpdate = false;
      }
    })
    

    return (
      <>
      <Canvas>
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh ref={ cube }  >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <GlbMesh glb={glb} matrix={trans}/>

        {/* <TransformControls object={ cube } /> */}

        <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
            <planeGeometry/>
            <MeshReflectorMaterial
                resolution={ 512 }
                blur={ [ 1000, 1000 ] }
                mixBlur={ 1 }
                mirror={ 0.5 }
                color="greenyellow"
            />
        </mesh>
        <axesHelper args={[5]}/>
        </Canvas>
      </>
    );
  };

  export default World