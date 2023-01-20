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
import { create } from 'zustand'


extend({TextGeometry})

const useStore = create(set => ({
  position: [0, 0, 6],
  setPosition: (position : any) => set({ position })
}))

const Scene = ({ showLinks }: { showLinks: boolean }) => {

  const router = useRouter()
  
  const [x, y, z] = useStore((state : any) => state.position)
  useFrame(state => {
    if (showLinks) {
      state.camera.position.lerp(new THREE.Vector3(x, y, z), 0.1)
      state.camera.lookAt(0, 0, 0)
    }
    
  })

  const { width, height } = useWindowSize()

  const [titleSize, setTitleSize] = useState<any>(null)
  const [textSize, setTextSize] = useState<any>(null)

  const [matcap, setMatcap] = useState<any>(null)

  useEffect(() => {

    if (width != undefined && height != undefined) { 
      const basicCalc = 0.00025 * (width * height) 

      if ((width * height) / 500 > 2000) {
        setTitleSize(basicCalc/ 1000)
        setTextSize(basicCalc / 700)
      } else if ((width * height) / 500 > 1500) { 
        setTitleSize(basicCalc/400)
        setTextSize(basicCalc / 200)
      } else {
        setTitleSize(basicCalc / 100) 
        setTextSize(basicCalc / 50)
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

    while (pos.x < 3 && pos.x > -3 && pos.y < 3 && pos.y > -3 && pos.z < 3 && pos.z > -3) {
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

  const generateTextGeometry = (text : string, textSize: number) => {
      
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

  const titleGeometry = generateTextGeometry("SARABIA \nPROJECT", titleSize)
  const twitterGeometry = generateTextGeometry("TWITTER", textSize)
  const instagramGeometry = generateTextGeometry("INSTAGRAM", textSize)
  const youtubeGeometry = generateTextGeometry("YOUTUBE", textSize)
  const tiktokGeometry = generateTextGeometry("TIKTOK", textSize)

  const Index = () => {
    return (
      <mesh position={[0, (width != undefined ? width > height ? 0 : 1 : 1), 0]} onClick={() => console.log('sapo')} geometry={titleGeometry}>
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    )
  }

  const Links = () => { 
    return (
      <>
        <mesh position={[0, 5, 0]} onClick={() => router.push("https://twitter.com/SarabiaProject")} geometry={twitterGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh position={[0, 2.5, 0]} onClick={() => router.push("https://www.instagram.com/sarabiaproject/")} geometry={instagramGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh position={[0, 0, 0]} onClick={() => router.push("https://www.youtube.com/@sarabiaproject")} geometry={youtubeGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh position={[0, -2.5, 0]} onClick={() => router.push("https://www.tiktok.com/@sarabiaproject")} geometry={tiktokGeometry}>
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      </>
    )
  }


  return (
    <Suspense fallback={null}>
      {/* <Model /> */}
      {showLinks ? <Links /> : <Index />}
      
      {/* To add environment effect to the model */}
      <Environment preset="city" />
      {!showLinks && RandomGeometries()}
    </Suspense>
  )

  
}


export default function Home() {

  const [showLinks, setShowLinks] = useState(false)

  const setPosition = useStore((state: any) => state.setPosition)

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
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Scene showLinks={showLinks} />
          <OrbitControls maxDistance={10} minDistance={3} autoRotate={!showLinks} />
        </Canvas>
      </div>
      <div className='action'>
        <button onClick={() => { setShowLinks(!showLinks);setPosition([0,0,10]) }}>
          {showLinks ? "Volver atras." : "Ver links."}
        </button>
      </div>
    </div>
  )
}