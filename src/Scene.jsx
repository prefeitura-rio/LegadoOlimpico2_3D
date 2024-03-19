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
        <StatueGLTFObject modelUrl={"/cidade_atualizado.glb"} />
      </Suspense>

      <Suspense fallback={null}>
        <StatueGLTFObject modelUrl={"/teste_obj.glb"} />
      </Suspense>

      <mesh position={[5.3, 0.02, -4.65]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} onClick={(e) => { window.alert("cliquei") }}     
         onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
         onPointerOut={(e) => { document.body.style.cursor = 'default'; }}>
        <circleGeometry args={[0.03]} />
        <meshBasicMaterial color="red" />
      </mesh>

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
