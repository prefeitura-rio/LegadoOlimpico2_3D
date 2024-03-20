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
      <Environment preset="sunset" />

      {/* Lights 💡 */}
      <color attach="background" args={[bgColor]} />

      {/* <fog attach="fog" color={bgColor} near={-4} far={10} /> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />


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
