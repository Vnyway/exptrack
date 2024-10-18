"use client";

import React from "react";

import { DonutChart } from "@/components/DonutChart";
import { CircleChartProps } from "@/types";

const CircleChart = ({ chartData, title, time }: CircleChartProps) => {
  return (
    <div className="rounded-[15px] shadow-md flex-1 p-[28px] flex flex-col items-center justify-between">
      <div className="w-full flex flex-col">
        <h3 className="font-semibold text-title text-[18px]">{title}</h3>
        <span className="text-primary font-normal text-[14px]">in {time}</span>
      </div>
      <DonutChart
        className="mx-auto min-h-[200px] h-full w-full"
        data={chartData}
        category="category"
        value="amount"
        valueFormatter={(number: number) =>
          `$${Intl.NumberFormat("us").format(number).toString()}`
        }
      />
    </div>
  );
};

export default CircleChart;
