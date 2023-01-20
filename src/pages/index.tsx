import Head from 'next/head'
import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import * as THREE from 'three'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import g from "../../public/assets/fonts/G-Display.json"
import useWindowSize from 'hooks/useWindowSize'
import { useRouter } from 'next/router'

extend({TextGeometry})


export default function Home() {

  const router = useRouter()

  const { width, height } = useWindowSize()

  const [textSize, setTextSize] = useState<any>(null)

  const [matcap, setMatcap] = useState<any>(null)

  const [showLinks, setShowLinks] = useState(false)

  const [cameraPos, setCameraPos] = useState(new THREE.Vector3(0, 0, 6))

  useEffect(() => {

    if (width != undefined && height != undefined) { 
      if ((width * height) / 500 > 2000) {
        setTextSize(0.00025 * (width * height) / 1000)
      } else if ((width * height) / 500 > 1500) { 
        setTextSize(0.00025 * (width * height)/400)
      } else {
        setTextSize(0.00025 * (width * height)/200) 
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

    if (!showLinks) { 
      while (pos.x < 2 && pos.x > -2 && pos.y < 2 && pos.y > -2 && pos.z < 2 && pos.z > -2) {
        pos = new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10)
      }
    } else {
      while (pos.x < 4 && pos.x > -4 && pos.y < 5 && pos.y > -5 && pos.z < 4 && pos.z > -4) {
        pos = new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10)
      }
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

  const generateTextGeometry = (text : string) => {
      
    const myGeometry = new TextGeometry(text, {
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

    return myGeometry
  }
  

  const titleGeometry = generateTextGeometry("SARABIA \nPROJECT")
  const twitterGeometry = generateTextGeometry("TWITTER")
  const instagramGeometry = generateTextGeometry("INSTAGRAM")
  const youtubeGeometry = generateTextGeometry("YOUTUBE")
  const tiktokGeometry = generateTextGeometry("TIKTOK")


  const Index = () => {
    return (
      <>
      <mesh position={[0, (width != undefined ? width > height ? 0 : 1 : 1), 0]} onClick={() => console.log('sapo')} geometry={titleGeometry}>
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
      </>
    )
  }

  const Links = () => { 
    return (
      <>
        <mesh position={[0, 4, 0]} onClick={() => router.push("https://twitter.com/SarabiaProject")} geometry={twitterGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh position={[0, 2, 0]} onClick={() => router.push("https://www.instagram.com/sarabiaproject/")} geometry={instagramGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh position={[0, 0, 0]} onClick={() => router.push("https://www.youtube.com/@sarabiaproject")} geometry={youtubeGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh position={[0, -2, 0]} onClick={() => router.push("https://www.tiktok.com/@sarabiaproject")} geometry={tiktokGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>

        
      </>
    )
  }


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
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 75, }}>
          <>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            {/* <Model /> */}
            {showLinks ? <Links /> : <Index />}
            
            {/* To add environment effect to the model */}
            <Environment preset="city" />
            {RandomGeometries()}
                </Suspense>
            <OrbitControls maxDistance={10} minDistance={3} autoRotate={!showLinks} />
          </>
        </Canvas>
      </div>
      <div className='action'>
        <button onClick={() => { setShowLinks(!showLinks); }}>
          {showLinks ? "Volver atras." : "Visita mis links."}
        </button>
      </div>
    </div>
  )
}