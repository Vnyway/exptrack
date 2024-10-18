import React from "react";
import { CardProps } from "@/types";

const Card = ({
  title,
  amount,
  percentage,
  image,
  isIncreasingGood,
}: CardProps) => {
  const amountMoreZero = amount >= 0;
  const percentageMoreZero = percentage >= 0;
  const percentageGreen =
    (isIncreasingGood && percentageMoreZero) ||
    (!isIncreasingGood && !percentageMoreZero);
  return (
    <div className="w-full h-[80px] rounded-[15px] px-[20px] flex justify-between items-center shadow-sm">
      <div className="flex flex-col">
        <span className="font-bold text-[12px] text-secondary">{title}</span>
        <div className="flex gap-[4px] items-end">
          <h3 className="text-title font-bold text-[18px]">
            {amountMoreZero ? "" : "-"}${Math.abs(amount)}
          </h3>
          <span
            className={`${
              percentageGreen ? "text-customGreen" : "text-customRed"
            } font-bols text-[14px]`}>
            {percentageMoreZero ? "+" : "-"}
            {Math.abs(percentage)}%
          </span>
        </div>
      </div>
      <div className="size-[45px] rounded-[12px] bg-primary flex items-center justify-center">
        {image}
      </div>
    </div>
  );
};

export default Card;
