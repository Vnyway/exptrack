import { UserContext, UserContextType } from "@/contexts/UserContextProvider";
import { greenCheckmark } from "@/public";
import React, { useContext, useRef, useState } from "react";
import SourceInput from "./TableInputs/SourceInput";
import CategoriesInput from "./TableInputs/CategoriesInput";
import AmountInput from "./TableInputs/AmountInput";
import { TypedTransaction } from "@/app/api/users/route";
import DateInput from "./TableInputs/DateInput";
import AccountInput from "./TableInputs/AccountInput";
const headings = ["SOURCE", "CATEGORY", "AMOUNT", "ACCOUNT", "DATE"];

const TransactionsTable = () => {
  const userContext = useContext<UserContextType | undefined>(UserContext);
  if (!userContext) return null;
  const { userData, setUserData, categoriesIncomes, categoriesExpenses } =
    userContext;

  const [currentTransactions, setCurrentTransactions] = useState<any>(
    userData?.allTransactions
  );
  return (
    <div className="rounded-[15px] shadow-md p-[20px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[4px]">
        <h3 className="font-bold text-title text-[18px]">Recent changes</h3>
        <div className="flex gap-[5px] items-center">
          <img src={greenCheckmark.src} alt="greenCheckmark" />
          <p className="font-normal text-secondary text-[14px]">
            <span className="font-bold">30</span> this month
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {headings.map((heading, index) => (
          <div key={index} className="font-bold text-secondary text-[12px]">
            {heading}
          </div>
        ))}
        {currentTransactions.map((transaction: any) => (
          <React.Fragment key={transaction.id}>
            <SourceInput transaction={transaction} />
            <CategoriesInput transaction={transaction} />
            <AmountInput transaction={transaction} />
            <AccountInput transaction={transaction} />
            {/* <div className="text-title font-bold text-[14px]">
              <input
                className="w-full border-0 outline-none focus:ring-0 pl-0"
                value={transaction.account}
                type="text"
              />
            </div> */}
            <DateInput transaction={transaction} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TransactionsTable;
