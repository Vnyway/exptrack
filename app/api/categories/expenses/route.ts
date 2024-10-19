import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ExpTrack");
    const categoriesExpensesCluster = await db
      .collection("Categories")
      .findOne({ title: "Expenses" });
    if (!categoriesExpensesCluster) {
      return NextResponse.json(
        { message: "No expenses categories found" },
        { status: 404 }
      );
    }
    const categoriesExpenses = categoriesExpensesCluster?.categories;
    return NextResponse.json(categoriesExpenses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
