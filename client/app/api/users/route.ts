import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Decimal128 } from "mongodb";

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
    console.log(categoriesExpenses);

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

    console.log(user.transactions.incomes);

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

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
