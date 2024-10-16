"use client";

import Card from "@/components/Card";
import { useContext } from "react";
import { cards, categoriesIncomes, categoriesExpenses } from "@/constants";
import BreadCrumbs from "@/components/BreadCrumbs";
import { BalanceChart } from "@/components/BalanceChart";
import CircleChart from "@/components/CircleChart";
import { UserContext } from "@/contexts/UserContextProvider";

const page = () => {
  const { userData } = useContext<any>(UserContext);
  let transactions;
  let incomes;
  let expenses;
  if (userData) {
    transactions = userData.transactions;
    incomes = transactions.incomes;

    expenses = transactions.expenses;

    const balance = [{}];
  }
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
        <BalanceChart chartData={[]} />
        {userData && (
          <>
            <CircleChart chartData={incomes} time="2023-2024" title="Incomes" />
            <CircleChart
              chartData={expenses}
              time="2023-2024"
              title="Expenses"
            />
          </>
        )}
      </section>
    </>
  );
};

export default page;
