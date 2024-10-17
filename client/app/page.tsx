"use client";

import Card from "@/components/Card";
import { useContext } from "react";
import { cards } from "@/constants";
import BreadCrumbs from "@/components/BreadCrumbs";
import { BalanceChart } from "@/components/BalanceChart";
import CircleChart from "@/components/CircleChart";
import { UserContext } from "@/contexts/UserContextProvider";

const page = () => {
  const { userData } = useContext<any>(UserContext);

  const transactions = userData?.transactions;
  const incomes = transactions?.incomes;
  const expenses = transactions?.expenses;
  const balanceHistory = userData?.balance;
  let currentBalance;
  if (userData) {
    currentBalance = balanceHistory[balanceHistory.length - 1].balance;
    cards[0].amount = currentBalance;
    cards[0].percentage;
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
      <section className="flex gap-[20px] flex-col lg:flex-row">
        <BalanceChart chartData={balanceHistory} />
        {userData && (
          <div className="w-full flex-col md:flex-row flex gap-[20px] lg:max-w-[40%]">
            <CircleChart chartData={incomes} time="2023-2024" title="Incomes" />
            <CircleChart
              chartData={expenses}
              time="2023-2024"
              title="Expenses"
            />
          </div>
        )}
      </section>
    </>
  );
};

export default page;
