import { Suspense, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";

// import AnimatedCamera from "./AnimatedCamera";
import StatueGLTFObject from "./StatueGLTFObject";
import { Environment, Gltf, Html, OrbitControls, useScroll } from "@react-three/drei";
import { val } from "@theatre/core";

import {
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { SoftShadows } from "@react-three/drei"


function Scene() {

  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "white";

  return (
    <>
      {/* apartment: 'lebombo_1k.hdr',
        city: 'potsdamer_platz_1k.hdr',
        dawn: 'kiara_1_dawn_1k.hdr',
        forest: 'forest_slope_1k.hdr',
        lobby: 'st_fagans_interior_1k.hdr',
        night: 'dikhololo_night_1k.hdr',
        park: 'rooitou_park_1k.hdr',
        studio: 'studio_small_03_1k.hdr',
        sunset: 'venice_sunset_1k.hdr',
        warehouse: 'empty_warehouse_01_1k.hdr', */}
      <Environment preset="night" />

      {/* Lights 💡 */}
      <color attach="background" args={[bgColor]} />

      {/* <fog attach="fog" color={bgColor} near={-4} far={10} /> */}

      {/* <pointLight shadow-bias={-0.01}  castShadow position={[6.1, 1.6, -5]} distance={3.5}  intensity={10}/>
      <ambientLight intensity={0.5} /> */}

<directionalLight
 position={[10, 12, -10]}
 intensity={1.5}
 castShadow
 shadow-mapSize-width={2048}
 shadow-mapSize-height={2048}
 shadow-bias={-0.00006} /// shadow-bias={++0.005}
/>

      <ambientLight intensity={0.5} />



      {/* Objects 📦 */}
      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"base_final.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"BRT.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"escolas.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"linhas_textos.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"obj1.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"obj2.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"obj3.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"VLT.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"parque_olimpico.glb"} />
      </Suspense>

      {/* <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"or.glb"} scale={[0.1, 0.1, 0.1]} position={[5.4, 0.02, -4.1]} />
      </Suspense> */}
      {/* <SoftShadows /> */}
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={20}
        near={0.1}
        far={70}
      />
    </>
  );
}

export default Scene;
