import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useGLTF, Html, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./App.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ isOpen, onClose, message }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {message}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function ButtonMarker({ children, position, visibleRange,message }) {
  const { gl } = useThree();
  const data = useScroll();
  const [opacity, setOpacity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useFrame(() => {
    const isVisible = data.scroll.current > visibleRange[0] && data.scroll.current < visibleRange[1];
    setOpacity(isOpen ? 0 : (isVisible ? 1 : 0));
  });

  return (
    <Html portal={{ current: gl.domElement.parentNode }} position={position}>
    <div className="fade button-container" style={{ opacity: opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}>
      <button id="round-button" onClick={toggleModal}><span className="arrow">&#8598;</span></button>
      <span className="button-text">{children}</span>
      <BasicModal isOpen={isOpen} onClose={toggleModal} message={message} />
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
      <ButtonMarker position={[1.8, 0.02, -3.4]} visibleRange={[0.52, 0.67]} message="hakuna matata 5">Texto explicativo 5</ButtonMarker>
      <ButtonMarker position={[-2.0, 0.02, -4.5]} visibleRange={[0.79, 0.88]} message="hakuna matata 6">Texto explicativo 6</ButtonMarker>

    </primitive>
  );
}

export default StatueGLTFObject;