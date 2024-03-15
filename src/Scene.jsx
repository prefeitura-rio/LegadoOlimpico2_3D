import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import AnimatedCamera from "./AnimatedCamera";
import StatueGLTFObject from "./StatueGLTFObject";
import { Environment, OrbitControls } from "@react-three/drei";

function Scene() {
  return (
    <div id="canvas_wrapper">
      <Canvas>
      <Environment preset="sunset" />
      
        {/* Camera 🎥 */}
        <AnimatedCamera />

        {/* Lights 💡 */}
        <ambientLight intensity={1} />
        <pointLight position={[1, 3, 2]} intensity={15} />

        {/* We can create a background color as a child element of the canvas we just have to attach it */}
        <color args={["black"]} attach="background" />

        {/* Objects 📦 */}
        <Suspense fallback={null}>
          <StatueGLTFObject position={[0, 0, 0]}  modelUrl={"/base_cidade.glb"} />
        </Suspense>
        <gridHelper position={[0,0.01,0]}/>
        {/* <OrbitControls/> */}
      </Canvas>
    </div>
  );
}

export default Scene;
