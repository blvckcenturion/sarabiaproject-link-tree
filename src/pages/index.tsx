import Head from 'next/head'
import { Suspense, useEffect, useState } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import ade from "../../public/assets/fonts/Ade_Display.json" 
import droidsans from "three/examples/fonts/droid/droid_sans_regular.typeface.json"
import g from "../../public/assets/fonts/G-Display.json"
import { useRef } from 'react';


extend({TextGeometry})


export default function Home() {
  const [matcap, setMatcap] = useState<any>(null)


  useEffect(() => {
    (async () => {
      const textureLoader = new THREE.TextureLoader();
      const mat = textureLoader.load("/assets/models/materials/4.png");
      setMatcap(mat)
    })()
  }, [])

  const font = new FontLoader().parse(g);

  const myGeometry = new TextGeometry("SARABIA \nPROJECT", {
    font: font,
    size: 0.3,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  })

  myGeometry.center()



  return (
    <div>
      <Head>
        <title>SARABIA PROJECT</title>
        <meta name="description" content="SARABIA PROJECT" />
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/favicon/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/assets/favicon/manifest.json"/>
        <meta name="msapplication-TileColor" content="#fff"/>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#000"></meta>
      </Head>

      <div className="scene">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            {/* <Model /> */}
            <mesh position={[0, 0, 0]} onClick={() => console.log('sapo')} geometry={myGeometry}>
              <meshMatcapMaterial matcap={matcap} />
            </mesh>
            {/* To add environment effect to the model */}
            <Environment preset="city" />
          </Suspense>
          <OrbitControls/>
        </Canvas>
      </div>
      <div className='action'>
        <button>
          Visita mis links.
        </button>
      </div>

    </div>
  )
}
