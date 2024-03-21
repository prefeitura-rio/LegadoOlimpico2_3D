import { Suspense, useEffect, useState } from "react";

import Scene from "./Scene";
import SimpleSlide from "./SimpleSlide";
// import { CameraTimeline } from "./AnimatedCamera";

// We add a CSS file here so we can style components
import "./App.css";

import theatreState from "./theatreState.json";

import { SheetProvider } from "@theatre/r3f";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";

import { Html, useProgress } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  console.log(Math.ceil(progress));
  return <Html center>
    <div className="loading">
      {Math.ceil(progress)} % carregado
    </div>
  </Html>;
}

function Cover() {
  const [isCapa, setIsCapa] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [zindex, setZindex] = useState(1);

  const handleButtonClick = () => {
    setIsCapa(false);
    setZindex(-1)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // 2000ms = 2s

    return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
  }, []);

  return (
    <div
      style={{
        background: "white",
        position: "fixed",
        zIndex: zindex,
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        transition: "opacity 1s ease-in-out",
        opacity: isCapa ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="logo.png" alt="Logo" style={{ width: "200px", position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)" }} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ textAlign: "center", lineHeight: "1rem" }}>
        <h1 style={{ fontSize: "5rem" }}>Legado Olímpico</h1>
        <h2>Texto introdutório</h2>
      </div>
      <br></br>
      <br></br>
      <br></br>

      {!showButton && <div className="loader"></div>}
      {showButton && <button
        onClick={handleButtonClick}
        style={{
          backgroundColor: "white", 
          color: "black",
          padding: "15px 50px", 
          textAlign: "center", 
          textDecoration: "none", 
          display: "inline-block", 
          fontSize: "16px", 
          margin: "4px 2px", 
          cursor: "pointer",
          borderRadius: "12px", 
          border: "2px solid black" 
        }}
      >
        Tour 3D
      </button>}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h5>Produzido pelo Escritório de Dados da Prefeitura da Cidade do Rio de Janeiro</h5>
    </div>
  );
}
function App() {

  const sheet = getProject("Fly Through", { state: theatreState }).sheet(
    "Scene"
  );

  return (
    <>
      {/* The cover goes here */}
      <Cover />
      {/* 3D scene container */}
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={12} damping={0.5}>
          <SheetProvider sheet={sheet}>
            <Suspense fallback={<Loader />}>
              <Scene />
            </Suspense>
          </SheetProvider>
         
        </ScrollControls>
      </Canvas>
      {/* </div> */}


    </>
  );
}

export default App;
