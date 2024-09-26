"use client";

import React from "react";

import { DonutChart, DonutChartEventProps } from "@/components/DonutChart";

const chartdata = [
  {
    name: "SolarCells",
    amount: 4890,
  },
  {
    name: "Glass",
    amount: 2103,
  },
  {
    name: "JunctionBox",
    amount: 2050,
  },
  {
    name: "Adhesive",
    amount: 1300,
  },
  {
    name: "BackSheet",
    amount: 1100,
  },
  {
    name: "Frame",
    amount: 700,
  },
  {
    name: "Encapsulant",
    amount: 200,
  },
];

const ExpensesChart = () => {
  const [value, setValue] = React.useState<DonutChartEventProps>(null);
  return (
    <div className="border-[1px] border-black max-w-[500px] flex flex-col justify-center items-center gap-[40px]">
      <div className="w-full flex flex-col">
        <h3 className="font-semibold text-title text-[18px]">Expenses</h3>
        <span className="text-primary font-normal text-[14px]">in 2024</span>
      </div>
      <DonutChart
        className="mx-auto w-[200px]"
        data={chartdata}
        category="name"
        value="amount"
        onValueChange={(v) => setValue(v)}
      />
    </div>
  );
};

export default ExpensesChart;
