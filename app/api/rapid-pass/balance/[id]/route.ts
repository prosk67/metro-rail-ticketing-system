//@ts-nocheck
"use server";
import { connect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = await connect();
    const { id } = await params;
    const query = "SELECT * FROM users NATURAL JOIN rapid_pass WHERE users.id = ?";
    const [ user ]= await db.query(query, [id]);
    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}