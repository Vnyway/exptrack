"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import CanvasLoader from "./CanvasLoader";

const CubesCanvas = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { position1, rotation1 } = useSpring<any>({
    position1: animate ? [-1, 2, -1.4] : [-2, 4, -2],
    rotation1: animate ? [-0.03, 0.5, 0] : [0, 0, 0],
    config: { duration: 1200 },
  });

  const { position2, rotation2 } = useSpring<any>({
    position2: animate ? [0.5, 0.8, 0] : [5, 4, -2],
    rotation2: animate ? [0.2, -0.7, -0.4] : [0, 0, 0],
    config: { duration: 1200 },
  });

  const { position3, rotation3 } = useSpring<any>({
    position3: animate ? [1.8, 1.4, -1.3] : [3, 0, -4],
    rotation3: animate ? [0.6, 0, 0.3] : [8, 0, 0],
    config: { duration: 1200 },
  });

  const { position4, rotation4 } = useSpring<any>({
    position4: animate ? [1, -1.5, 0] : [4, -4, -2],
    rotation4: animate ? [-0.2, 0, 1] : [0, 0, 0],
    config: { duration: 1200 },
  });

  const { position5, rotation5 } = useSpring<any>({
    position5: animate ? [-0.6, -1, -1] : [-2, -6, -2],
    rotation5: animate ? [0.2, 0, 0.4] : [3, 2, 1],
    config: { duration: 1200 },
  });

  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
        <animated.mesh
          scale={[1.5, 1.5, 1.5]}
          position={position1}
          rotation={rotation1}>
          <boxGeometry />
          <meshStandardMaterial />
        </animated.mesh>
        {/* light sphere right top */}
        <pointLight position={[0.8, 1.8, 1]} intensity={2} color="#3BCBBE" />
        {/* light sphere left bottom */}
        <pointLight position={[-1, -1, 1]} intensity={1.5} color="#3BCBBE" />
        {/* box center */}
        <animated.mesh
          scale={[1.5, 1.5, 1.5]}
          position={position2}
          rotation={rotation2}>
          <boxGeometry />
          <meshStandardMaterial />
        </animated.mesh>
        {/* cilinder back right */}
        <animated.mesh scale={0.25} position={position3} rotation={rotation3}>
          <cylinderGeometry args={[1, 1, 6, 20]} />
          <meshStandardMaterial />
        </animated.mesh>
        {/* cilinder bot */}
        <animated.mesh scale={0.5} position={position4} rotation={rotation4}>
          <cylinderGeometry args={[2, 2, 2.5, 100]} />
          <meshStandardMaterial />
        </animated.mesh>
        {/* cylinder left */}
        <animated.mesh scale={0.3} position={position5} rotation={rotation5}>
          <cylinderGeometry args={[1.4, 1.4, 7, 20]} />
          <meshStandardMaterial />
        </animated.mesh>
      </Suspense>
    </Canvas>
  );
};

export default CubesCanvas;
