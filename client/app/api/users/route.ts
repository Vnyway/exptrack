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

    user.transactions.incomes = user.transactions.incomes.map(
      (transaction: any) => {
        if (transaction.amount && transaction.amount instanceof Decimal128) {
          transaction.amount = Number(transaction.amount.toString());
        }

        const category = categoriesIncomes.find(
          (category: any) => category.id === transaction.category
        );

        transaction.category = category ? category.title : "Unknown Category";
        transaction.image = category ? category.image : "No Image Found";

        const account = user.accounts.find(
          (account: any) =>
            account.id.toString() === transaction.accountId.toString()
        );

        transaction.account = account ? account.title : "Unknown Account";

        delete transaction.accountId;

        return transaction;
      }
    );

    user.transactions.expenses = user.transactions.expenses.map(
      (transaction: any) => {
        if (transaction.amount && transaction.amount instanceof Decimal128) {
          transaction.amount = Number(transaction.amount.toString());
        }

        const category = categoriesExpenses.find(
          (category: any) => category.id === transaction.category
        );

        transaction.category = category ? category.title : "Unknown Category";
        transaction.image = category ? category.image : "No Image Found";

        const account = user.accounts.find(
          (account: any) =>
            account.id.toString() === transaction.accountId.toString()
        );

        transaction.account = account ? account.title : "Unknown Account";

        delete transaction.accountId;

        return transaction;
      }
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
      incomes: any[];
      expenses: any[];
    }) => {
      // Combine both incomes and expenses
      const allTransactions = [
        ...transactions.incomes.map((t) => ({ ...t, type: "income" })),
        ...transactions.expenses.map((t) => ({ ...t, type: "expense" })),
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
      let previousMonth = "";

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
        allTransactions.forEach((transaction) => {
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

    const formatMonthYear = (month: string): string => {
      const [year, monthNum] = month.split("-");
      const date = new Date(Number(year), Number(monthNum) - 1);
      return date.toLocaleString("en-US", { month: "short", year: "2-digit" });
    };

    // Convert balanceByMonth into chartdata format
    const convertToChartData = (
      balanceByMonth: Record<string, MonthlyBalance>
    ) => {
      for (const month in balanceByMonth) {
        chartdata.push({
          date: formatMonthYear(month), // Convert to "Mon YY" format (e.g., "Jan 23")
          balance: balanceByMonth[month].balance, // Store the balance for the month
        });
      }

      return chartdata;
    };

    // Assuming balanceByMonth is populated after previous steps
    const chartDataArray = convertToChartData(balanceByMonth);
    console.log(chartDataArray);
    user.balance = chartDataArray;

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
