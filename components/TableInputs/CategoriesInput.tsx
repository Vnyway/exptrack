import React, { useRef, useState } from "react";

const CategoriesInput = (transaction: any) => {
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
    <div onClick={handleDivClick} className="text-title font-bold text-[14px]">
      <input
        ref={inputRef}
        className="w-full border-0 outline-none focus:ring-0 pl-0"
        value={transaction.transaction.category}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div></div>
    </div>
  );
};

export default CategoriesInput;
