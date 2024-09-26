import Card from "@/components/Card";
import React from "react";
import { cards } from "@/constants";
import BreadCrumbs from "@/components/BreadCrumbs";

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
    </>
  );
};

export default page;
