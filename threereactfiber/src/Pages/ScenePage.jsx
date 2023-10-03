import { Canvas, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import World from '../Components/World.jsx'

import * as THREE from 'three'
import { useEffect, Suspense, useRef } from 'react'

extend({OrbitControls : OrbitControls})

export default function ScenePage(){

    return <>
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
                            far:50,
                            position:[5,5,5]
                        }
                    }
                >
                    <Suspense>
                        <World/>
                    </Suspense>
                </Canvas>
        </>

}


