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
  const transactions = userData.transactions;
  const incomes = transactions
    .filter((transaction: any) => transaction.incomes === true)
    .map((transaction: any) => {
      const categoryObj = categoriesIncomes.find(
        (cat) => cat.id === transaction.category
      );
      const categoryTitle = categoryObj ? categoryObj.title : "Unknown";

      return { category: categoryTitle, amount: transaction.amount };
    })
    .reduce((acc: any, transaction: any) => {
      const existingCategory = acc.find(
        (item: any) => item.category === transaction.category
      );

      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: transaction.amount,
        });
      }

      return acc;
    }, []);

  const expenses = transactions
    .filter((transaction: any) => transaction.incomes === false)
    .map((transaction: any) => {
      const categoryObj = categoriesExpenses.find(
        (cat) => cat.id === transaction.category
      );
      const categoryTitle = categoryObj ? categoryObj.title : "Unknown";

      return { category: categoryTitle, amount: transaction.amount };
    })
    .reduce((acc: any, transaction: any) => {
      const existingCategory = acc.find(
        (item: any) => item.category === transaction.category
      );

      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: transaction.amount,
        });
      }

      return acc;
    }, []);

  const balance = [{}];

  console.log(incomes);
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
        <CircleChart chartData={incomes} time="2023-2024" title="Expenses" />
        <CircleChart chartData={expenses} time="2023-2024" title="Incomes" />
      </section>
    </>
  );
};

export default page;
