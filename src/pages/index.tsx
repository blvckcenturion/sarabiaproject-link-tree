import Head from 'next/head'
import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import g from "../../public/assets/fonts/G-Display.json"
import useWindowSize from 'hooks/useWindowSize'

extend({TextGeometry})


export default function Home() {

  const { width, height } = useWindowSize()

  const [textSize, setTextSize] = useState<any>(null)

  const [matcap, setMatcap] = useState<any>(null)


  useEffect(() => {

    if (width != undefined && height != undefined) { 
      if ((width * height) / 500 > 2000) {
        setTextSize(0.00025 * (width * height) / 1000)
      } else if ((width * height) / 500 > 1500) { 
        setTextSize(0.00025 * (width * height)/500)
      } else {
        setTextSize(0.00025 * (width * height)/300) 
      }
    }
    

    (async () => {
      const textureLoader = new THREE.TextureLoader();
      const mat = textureLoader.load("/assets/models/materials/matcap.png");
      setMatcap(mat)
    })()


  }, [width, height])

  const generatePosition = () => { 
    let pos = new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10)

    while (pos.x < 2 && pos.x > -2 && pos.y < 2 && pos.y > -2 && pos.z < 2 && pos.z > -2) {
      pos = new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10)
    }
    
    return pos

  }

  const pickRandomGeometry = () => {
    const geometries = ["cone", "dodecahedron", "icosahedron", "octahedron", "tetrahedron", "torusKnot"]
    let geometry = geometries[Math.floor(Math.random() * geometries.length)]
    
    switch (geometry) {
      case "cone":
        return <coneGeometry attach="geometry" args={[1, 1, 32]} />
      case "dodecahedron":
        return <dodecahedronGeometry attach="geometry" args={[1, 0]} />
      case "icosahedron":
        return <icosahedronGeometry attach="geometry" args={[1, 0]} />
      case "octahedron":
        return <octahedronGeometry attach="geometry" args={[1, 0]} />
      case "tetrahedron":
        return <tetrahedronGeometry attach="geometry" args={[1, 0]} />
    }

  }

  const RandomGeometries = () => {
    return Array.from({ length: 200 }).map((_, i) => { 

      let scale = Math.random() * 0.5

      return (
        <mesh key={i} position={generatePosition()} rotation={[Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI]} scale={[scale, scale, scale]}>
          {pickRandomGeometry()}
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      )
    })
  }

  const font = new FontLoader().parse(g);

  const myGeometry = new TextGeometry("SARABIA \nPROJECT", {
    font: font,
    size: textSize,
    height: textSize,
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
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75,  }}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            {/* <Model /> */}
            <mesh position={[0, (width != undefined ? width > height ? 0 : 1 : 1), 0]} onClick={() => console.log('sapo')} geometry={myGeometry}>
              <meshMatcapMaterial matcap={matcap} />
            </mesh>
            <RandomGeometries/>
            {/* To add environment effect to the model */}
            <Environment preset="city" />
          </Suspense>
          <OrbitControls maxDistance={10} autoRotate/>
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
