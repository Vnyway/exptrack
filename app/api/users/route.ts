import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Decimal128 } from "mongodb";

interface MonthlyBalance {
  income: number;
  expense: number;
  balance: number;
}

interface ChartData {
  date: string;
  balance: number;
  income: number;
  expense: number;
}

interface BaseTransaction {
  id: number;
  accountId: number;
  category: number;
  amount: Decimal128 | number;
  date: string;
  source: string;
}

interface TransformedTransaction {
  id: number;
  category: string;
  amount: number;
  date: string;
  source: string;
  image: string;
  account: string;
}

export interface TypedTransaction {
  id: number;
  category: string;
  amount: number;
  date: string;
  source: string;
  image: string;
  account: string;
  type: string;
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ExpTrack");

    const user = await db.collection("Users").findOne({});

    if (!user) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    const categoriesIncomesDocument = await db
      .collection("Categories")
      .findOne({ title: "Incomes" });
    const categoriesExpensesDocument = await db
      .collection("Categories")
      .findOne({ title: "Expenses" });

    const categoriesIncomes = categoriesIncomesDocument?.categories;
    const categoriesExpenses = categoriesExpensesDocument?.categories;

    //function for changing transactions

    const transformTransactions = (
      transactions: BaseTransaction[],
      categories: { id: number; title: string; image: string }[],
      accounts: { id: string; title: string }[]
    ): TransformedTransaction[] => {
      return transactions.map(
        (transaction: BaseTransaction): TransformedTransaction => {
          // Convert amount if it's a Decimal128
          if (transaction.amount && transaction.amount instanceof Decimal128) {
            transaction.amount = Number(transaction.amount.toString());
          }

          // Find the matching category
          const category = categories.find(
            (category) => category.id === transaction.category
          );

          // Find the matching account
          const account = accounts.find(
            (account) =>
              account.id.toString() === transaction.accountId.toString()
          );

          // Return the new transformed transaction object
          return {
            id: transaction.id,
            category: category ? category.title : "Unknown Category",
            amount:
              typeof transaction.amount === "number" ? transaction.amount : 0,
            date: transaction.date,
            source: transaction.source,
            image: category ? category.image : "No Image Found",
            account: account ? account.title : "Unknown Account",
          };
        }
      );
    };

    user.transactions.expenses = transformTransactions(
      user.transactions.expenses,
      categoriesExpenses,
      user.accounts
    );

    user.transactions.incomes = transformTransactions(
      user.transactions.incomes,
      categoriesIncomes,
      user.accounts
    );

    //calculating balance, incomes, expenses for each month

    // Define the type for the entire balanceByMonth object
    const balanceByMonth: Record<string, MonthlyBalance> = {};

    // Helper function to format date to "YYYY-MM" (year-month)
    const formatDateToMonth = (dateStr: string): string => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    };

    // Helper function to get the current month formatted as "YYYY-MM"
    const getCurrentMonth = (): string => {
      const now = new Date();
      return formatDateToMonth(now.toISOString());
    };

    // Helper function to add months to a date
    const addMonths = (date: Date, months: number): Date => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + months);
      return newDate;
    };

    // Initialize starting balance
    let runningBalance = 0; // Set to whatever the initial balance is (e.g., 0, or a predefined value)

    // Group transactions by month and calculate the running balance
    const calculateMonthlyBalance = (transactions: {
      incomes: TransformedTransaction[];
      expenses: TransformedTransaction[];
    }) => {
      // Combine both incomes and expenses
      const allTransactions = [
        ...transactions.incomes.map((t: TransformedTransaction) => ({
          ...t,
          type: "income",
        })),
        ...transactions.expenses.map((t: TransformedTransaction) => ({
          ...t,
          type: "expense",
        })),
      ];

      // Sort transactions by date to ensure we process them in chronological order
      allTransactions.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Get the first transaction month and current month
      const firstTransactionMonth = formatDateToMonth(allTransactions[0].date);
      const currentMonth = getCurrentMonth();

      // Iterate from first transaction month to current month
      let currentDate = new Date(firstTransactionMonth);

      while (formatDateToMonth(currentDate.toISOString()) <= currentMonth) {
        const month = formatDateToMonth(currentDate.toISOString());

        // If this month is not yet in balanceByMonth, initialize it
        if (!balanceByMonth[month]) {
          balanceByMonth[month] = {
            income: 0,
            expense: 0,
            balance: runningBalance, // Carry over the running balance from the previous month
          };
        }

        // Process all transactions for the current month
        allTransactions.forEach((transaction: TypedTransaction) => {
          const transactionMonth = formatDateToMonth(transaction.date);
          const amount = transaction.amount;

          if (transactionMonth === month) {
            if (transaction.type === "income") {
              balanceByMonth[month].income += amount;
            } else {
              balanceByMonth[month].expense += amount;
            }
          }
        });

        // Calculate the monthly difference (incomes - expenses)
        const monthlyDifference =
          balanceByMonth[month].income - balanceByMonth[month].expense;

        // Update the running balance (carry it over to next month)
        runningBalance += monthlyDifference;

        // Set the balance for the month
        balanceByMonth[month].balance = runningBalance;

        // Move to the next month
        currentDate = addMonths(currentDate, 1);
      }

      return balanceByMonth;
    };

    const monthlyBalance = calculateMonthlyBalance(user.transactions);
    const chartdata: ChartData[] = [];

    // Function to format "YYYY-MM" into "Mon YY"
    const formatMonthYear = (month: string): string => {
      const [year, monthNum] = month.split("-");
      const date = new Date(Number(year), Number(monthNum) - 1);
      return date.toLocaleString("en-US", { month: "short", year: "2-digit" });
    };

    // Convert balanceByMonth into chartdata format with incomes and expenses
    const convertToChartData = (
      balanceByMonth: Record<string, MonthlyBalance>
    ) => {
      for (const month in balanceByMonth) {
        chartdata.push({
          date: formatMonthYear(month), // Convert to "Mon YY" format (e.g., "Jan 23")
          balance: balanceByMonth[month].balance, // Store the balance for the month
          income: balanceByMonth[month].income, // Store the incomes for the month
          expense: balanceByMonth[month].expense, // Store the expenses for the month
        });
      }

      return chartdata;
    };

    // Assuming balanceByMonth is populated after previous steps
    const chartDataArray = convertToChartData(balanceByMonth);

    // Update user with balance data
    user.balance = chartDataArray;

    //all transactions array

    user.allTransactions = [
      ...user.transactions.incomes.map((t: TransformedTransaction) => ({
        ...t,
        type: "income",
      })),
      ...user.transactions.expenses.map((t: TransformedTransaction) => ({
        ...t,
        type: "expense",
      })),
    ];

    user.allTransactions.sort(
      (a: TransformedTransaction, b: TransformedTransaction) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
