import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const SourceInput = (transaction: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<boolean>(false);

  const handleDivClick = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const handleFocus = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <div
      onClick={handleDivClick}
      className="text-title font-bold text-[14px] p-1 flex flex-col">
      <input
        ref={inputRef}
        className="w-full border-0 outline-none focus:ring-0 pl-0"
        value={transaction.transaction.source}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <motion.span
        animate={{
          backgroundPositionX: selected ? "left" : "right",
        }}
        style={{
          width: "90%",
          height: "2px",
          background: "linear-gradient(to right, #2d3748 50%, #ffffff 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "right bottom",
          transition: "all 0.3s ease-out",
        }}></motion.span>
    </div>
  );
};

export default SourceInput;
