import { Suspense, useEffect } from "react";

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
  console.log(progress);
  return <Html center>
    <div className="loading">
       {Math.ceil(progress)} % carregado
    </div>
  </Html>;
}


function App() {

  const sheet = getProject("Fly Through", { state: theatreState }).sheet(
    "Scene"
  );

  return (
    <>

      {/* 3D scene container */}
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={12} damping={0.5}>
          <SheetProvider sheet={sheet}>
            <Suspense fallback={<Loader />}>
              <Scene />
            </Suspense>
          </SheetProvider>
          <Scroll html>
            <div id="article_wrapper">
              {/* HTML slides are nested here and we use vh values to specify where they are */}
              <SimpleSlide viewportPosition={50}>Oi from slide 1</SimpleSlide>
              <SimpleSlide viewportPosition={150}>Oi from slide 2</SimpleSlide>
              <SimpleSlide viewportPosition={280}>Oi from slide 3</SimpleSlide>
              <SimpleSlide viewportPosition={420}>Oi from slide 4</SimpleSlide>
              <SimpleSlide viewportPosition={550}>Oi from slide 5</SimpleSlide>
              <SimpleSlide viewportPosition={700}>Oi from slide 6</SimpleSlide>
              <SimpleSlide viewportPosition={980}>Oi from slide 7</SimpleSlide>
              <SimpleSlide viewportPosition={980}>Oi from slide 7</SimpleSlide>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
      {/* </div> */}


    </>
  );
}

export default App;
