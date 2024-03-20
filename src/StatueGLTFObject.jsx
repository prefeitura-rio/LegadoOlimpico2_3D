import React, { useState } from "react";
import { useRef } from "react";
import { useGLTF, Html, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import "./App.css";

function ButtonMarker({ children, position, visibleRange,message }) {
  const { gl } = useThree();
  const data = useScroll();
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    const isVisible = data.scroll.current > visibleRange[0] && data.scroll.current < visibleRange[1];
    setOpacity(isVisible ? 1 : 0);

    // console.log("data.scroll.current  ", data.scroll.current )
  });

  return (
    <Html portal={{ current: gl.domElement.parentNode }} position={position}>
    <div className="fade button-container" style={{ opacity: opacity }}>
      <button id="round-button" onClick={() => window.alert(message)}><span className="arrow">&#8598;</span></button>
      <span className="button-text">{children}</span>
    </div>
  </Html>
  );
}


function StatueGLTFObject(props) {
  const modelRef = useRef();
  const { position, scale, modelUrl } = props;

  const gltf = useGLTF(modelUrl);

  return (
    <primitive
      ref={modelRef}
      position={position ? position : [0, 0, 0]}
      scale={scale ? scale : [1, 1, 1]}
      object={gltf.scene}
    >
      {/* Each of these markers maps an HTML element onto a point in 3D space */}
      <ButtonMarker position={[5.35, 0.02, -4.8]} visibleRange={[0.09, 0.14]} message="hakuna matata 1">Texto explicativo 1</ButtonMarker>
      <ButtonMarker position={[4.3, 0.02, -4.6]} visibleRange={[0.16, 0.25]} message="hakuna matata 2">Texto explicativo 2</ButtonMarker>
      <ButtonMarker position={[4.4, 0.02, -5.2]} visibleRange={[0.27, 0.35]} message="hakuna matata 3">Texto explicativo 3</ButtonMarker>
      <ButtonMarker position={[3, 0.02, -5.7]} visibleRange={[0.36, 0.48]} message="hakuna matata 4">Texto explicativo 4</ButtonMarker>
      <ButtonMarker position={[1.5, 0.02, -3.5]} visibleRange={[0.52, 0.67]} message="hakuna matata 5">Texto explicativo 5</ButtonMarker>
      <ButtonMarker position={[-2.0, 0.02, -4.5]} visibleRange={[0.79, 0.88]} message="hakuna matata 6">Texto explicativo 6</ButtonMarker>

    </primitive>
  );
}

export default StatueGLTFObject;