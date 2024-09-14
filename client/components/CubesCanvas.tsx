import React from "react";
import { Canvas } from "@react-three/fiber";

const CubesCanvas = () => {
  return (
    <Canvas>
      <mesh scale={[2, 2, 2]} position={[0, 0, 0]} rotation={[-2, 0, 1]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh scale={[0.2, 0.2, 0.2]} position={[-1, 1, 1]}>
        <sphereGeometry />
        <meshStandardMaterial color="#FAFC6E" />
      </mesh>
      <pointLight position={[1, 2, 2]} color="#FAFC6E" />
    </Canvas>
  );
};

export default CubesCanvas;
