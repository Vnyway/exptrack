import { greenCheckmark } from "@/public";
const headings = ["SOURCE", "CATEGORY", "AMOUNT", "ACCOUNT", "DATE"];

const TransactionsTable = () => {
  return (
    <div className="rounded-[15px] shadow-md p-[20px]">
      <h3>Recent changes</h3>
      <div className="flex gap-[10px] items-center">
        <img src={greenCheckmark.src} alt="greenCheckmark" />
        <span>30 this month</span>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          {headings.map((heading, index) => (
            <div key={index}>{heading}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
