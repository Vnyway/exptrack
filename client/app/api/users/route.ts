import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Make sure this path is correct

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ExpTrack");

    const users = await db.collection("Users").find({}).toArray();

    if (users.length > 0) {
      return NextResponse.json(users);
    } else {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
