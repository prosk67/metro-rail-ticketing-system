//@ts-nocheck
"use server";
import { connect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connect();

    const query = "SELECT * FROM users";
    const [users] = await db.query(query);
    return NextResponse.json(users);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}