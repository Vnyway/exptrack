import Card from "@/components/Card";
import React from "react";
import { cards } from "@/constants";
import BreadCrumbs from "@/components/BreadCrumbs";
import { BalanceChart } from "@/components/BalanceChart";
import ExpensesChart from "@/components/ExpensesChart";

const page = () => {
  return (
    <>
      <BreadCrumbs title="Dashboard" />
      <section className="w-full flex gap-[20px]">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            amount={card.amount}
            image={card.image}
            percentage={card.percentage}
            isIncreasingGood={card.isIncreasingGood}
          />
        ))}
      </section>
      <section className="flex gap-[20px]">
        <BalanceChart />
        <ExpensesChart />
        <ExpensesChart />
      </section>
    </>
  );
};

export default page;
