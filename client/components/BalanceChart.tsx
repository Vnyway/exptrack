"use client";

import { AreaChart } from "@/components/AreaChart";

const chartdata = [
  {
    date: "Jan",
    Balance: 2890,
  },
  {
    date: "Feb 23",
    Balance: 2756,
  },
  {
    date: "Mar 23",
    Balance: 3322,
  },
  {
    date: "Apr 23",
    Balance: 3470,
  },
  {
    date: "May 23",
    Balance: 3475,
  },
  {
    date: "Jun 23",
    Balance: 3129,
  },
  {
    date: "Jul 23",
    Balance: 3490,
  },
  {
    date: "Aug 23",
    Balance: 2903,
  },
  {
    date: "Sep 23",
    Balance: 2643,
  },
  {
    date: "Oct 23",
    Balance: 2837,
  },
  {
    date: "Nov 23",
    Balance: 2954,
  },
  {
    date: "Dec 23",
    Balance: 3239,
  },
];

export const BalanceChart = () => (
  <AreaChart
    className="h-80 w-[60%]"
    data={chartdata}
    index="date"
    colors={["primary"]}
    categories={["Balance"]}
    showGridLines={false}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
    xAxisLabel="Month"
    yAxisLabel="Amount of Money"
    fill="gradient"
  />
);
