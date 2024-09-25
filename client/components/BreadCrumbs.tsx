import { BreadCrumbsProps } from "@/types";
import React from "react";

const BreadCrumbs = ({ title }: BreadCrumbsProps) => {
  return (
    <section className="flex flex-col">
      <h3 className="font-medium text-[18px] text-title">
        Pages /{" "}
        <span className="font-normal text-[14px] text-secondary">{title}</span>
      </h3>
      <h2 className="font-bold text-[20px] text-title">{title}</h2>
    </section>
  );
};

export default BreadCrumbs;
