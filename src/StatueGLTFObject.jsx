import { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Marker(props) {
  const { children, position } = props;
  return (
    <Html  position={position}   >
      {children}
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
      <Marker position={[0, 0, -2]}><button>botão1</button></Marker>
      <Marker position={[0, 0, -5]}><button>botão2</button></Marker>
      <Marker position={[2, 0, -7]}><button>botão3</button></Marker>
      <Marker position={[-2, 0, -3]}><button>botão4</button></Marker>
      <Marker position={[3, 0, -4]}><button>botão5</button></Marker>
    </primitive>
  );
}

export default StatueGLTFObject;
