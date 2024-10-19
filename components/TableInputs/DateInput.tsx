import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const DateInput = (transaction: any) => {
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

  const formatDateToDDMMYYYY = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div
      onClick={handleDivClick}
      className="text-title font-bold text-[14px] p-1 flex flex-col">
      <input
        ref={inputRef}
        className="w-full border-0 outline-none focus:ring-0 pl-0"
        value={formatDateToDDMMYYYY(transaction.transaction.date)}
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

export default DateInput;
