import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const AmountInput = (transaction: any) => {
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
      className={`${
        transaction.transaction.type === "income"
          ? "text-customGreen"
          : "text-customRed"
      } flex flex-col font-bold text-[14px] justify-center`}
      onClick={handleDivClick}>
      <div className="flex items-center">
        <span className={` pb-[1px]`}>
          {transaction.transaction.type === "income" ? "+" : "-"}$
        </span>
        <input
          ref={inputRef}
          className="w-full border-0 outline-none focus:ring-0 pl-0"
          value={transaction.transaction.amount}
          type="text"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      <motion.span
        animate={{
          backgroundPositionX: selected ? "left" : "right",
        }}
        style={{
          width: "90%",
          height: "2px",
          background:
            transaction.transaction.type === "income"
              ? "linear-gradient(to right, #48BB78 50%, #ffffff 50%)"
              : "linear-gradient(to right, #e53e3e 50%, #ffffff 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "right bottom",
          transition: "all 0.3s ease-out",
        }}></motion.span>
    </div>
  );
};

export default AmountInput;
