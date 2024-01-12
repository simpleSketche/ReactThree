import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls, useGLTF, useHelper } from '@react-three/drei'
import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { useControls } from 'leva'

type glbProps = {
  glb?: Object;
}

const GlbMesh = ({glb, matrix, rotation}) => {

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/' );
  dracoLoader.preload();

  const camera = useThree(state => state.camera)
  camera.up.set(0,0,1)

  const [glbModel, setGlbModel] = useState(null)

  const loadGLB = (buffer) => {
    const loader = new GLTFLoader();

     // set up draco decoder in case the glb is compressed through draco
    loader.setDRACOLoader(dracoLoader)

    loader.parse(buffer, '', (glb) => {
      // gltf is the loaded scene
      // You can now add it to your Three.js scene
      console.log(glb);
      setGlbModel(glb)
    }, (error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    
    if(glb){
        const reader = new FileReader();
        reader.readAsArrayBuffer(glb);
        reader.onloadend = (e) => {
        const buffer = e.target.result;
        // Now you have the file as a buffer, you can load it with GLTFLoader
        loadGLB(buffer);
      };
    }
  },[glb])

  useEffect(() => {
    if (glbModel && matrix && rotation) {

      // rotate the glb model group to use z axis up
      glbModel.scene.rotation.x = rotation;

      const combinedMatrix = new THREE.Matrix4();

      const rotationMatrix = new THREE.Matrix4();
      rotationMatrix.makeRotationFromQuaternion(glbModel.scene.quaternion);

      combinedMatrix.multiplyMatrices(rotationMatrix, matrix)

      glbModel.scene.matrix = combinedMatrix;
      glbModel.scene.matrixAutoUpdate = false;

      
    }
  },[glbModel, matrix, rotation])

  return glbModel ? <primitive object ={glbModel.scene} /> : null;
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

          rotation:{value:Math.PI / 2, min:-2, max:2, step: 0.01}
        }
      })

    const transition = useControls('transition', options)
  
    const trans = new THREE.Matrix4();

    let rotation = transition.rotation

    useEffect(() => {
      if(transition){
        trans.set(
          transition.m00, transition.m01, transition.m02, transition.m03,
          transition.m10, transition.m11, transition.m12, transition.m13,
          transition.m20, transition.m21, transition.m22, transition.m23,
          transition.m30, transition.m31, transition.m32, transition.m33,
         )

         rotation = transition.rotation
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

        {/* <mesh ref={ cube }  >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh> */}

        <GlbMesh glb={glb} matrix={trans} rotation={rotation}/>

        {/* <TransformControls object={ cube } /> */}

        <mesh position-z={ 0 }  scale={ 10 }>
            <planeGeometry/>
            <MeshReflectorMaterial
                resolution={ 1080 }
                blur={ [ 2000, 2000 ] }
                mixBlur={ 1 }
                mirror={ 0.8 }
                color="white"
            />
        </mesh>
        <axesHelper args={[5]}/>
        </Canvas>
      </>
    );
  };

  export default World