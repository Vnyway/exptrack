import { UserContext } from "@/contexts/UserContextProvider";
import React, { useContext, useRef, useState } from "react";

const AccountInput = (transaction: any) => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { userData } = context;
  const accounts = userData?.accounts;
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
        value={transaction.transaction.account}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className={`${selected ? "block" : "hidden"} absolute`}>
        {accounts?.map((category: any) => (
          <div className="w-full bg-white">{category.title}</div>
        ))}
      </div>
    </div>
  );
};

export default AccountInput;
