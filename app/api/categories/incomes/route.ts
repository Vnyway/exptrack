import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ExpTrack");
    const categoriesIncomesCluster = await db
      .collection("Categories")
      .findOne({ title: "Incomes" });
    if (!categoriesIncomesCluster) {
      return NextResponse.json(
        { message: "No incomes categories found" },
        { status: 404 }
      );
    }
    const categoriesIncomes = categoriesIncomesCluster?.categories;
    return NextResponse.json(categoriesIncomes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
