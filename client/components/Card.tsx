import React from "react";
import { CardProps } from "@/types";

const Card = ({ title, amount, percentage, image }: CardProps) => {
  return (
    <div className="w-full h-[80px] flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold text-[12px] text-secondary">{title}</span>
        <div className="flex gap-[4px] items-end">
          <h3 className="text-title font-bold text-[18px]">${amount}</h3>
          <span className="text-customGreen font-bols text-[14px]">
            {percentage}%
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
