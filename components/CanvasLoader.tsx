import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <p className="text-[14px] text-[#F1F1F1] font-[800] mt-[40px]">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
