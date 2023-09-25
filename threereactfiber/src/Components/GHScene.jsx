import { Canvas } from '@react-three/fiber'
import World from './World'
import * as THREE from 'three'

export default function GHScene(){

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
                        far:200,
                        position:[25,25,25]
                    }
                }
            >
                <World/>
            </Canvas>

        </>
}