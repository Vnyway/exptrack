import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Decimal128 } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ExpTrack");

    const user = await db.collection("Users").findOne({});

    const categories = await db.collection("Categories").find({}).toArray();

    if (!user) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    user.transactions = user.transactions.map((transaction: any) => {
      if (transaction.amount && transaction.amount instanceof Decimal128) {
        transaction.amount = Number(transaction.amount.toString());
      }

      const category = categories.find(
        (category: any) => category.id === transaction.categoryId
      );

      transaction.category = category ? category.title : "Unknown Category";

      delete transaction.categoryId;

      const account = user.accounts.find(
        (account: any) =>
          account.id.toString() === transaction.accountId.toString()
      );

      transaction.account = account ? account.title : "Unknown Account";

      delete transaction.accountId;

      return transaction;
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
