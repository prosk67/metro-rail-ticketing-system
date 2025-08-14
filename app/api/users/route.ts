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
export async function POST(request: Request) {
  try {
    const db = await connect();
    const body = await request.json();
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
export async function PUT(request: Request) {
  try {
    const db = await connect();
    const {status, id} = await request.json();

    const query = "UPDATE users SET rapid_pass_status = ? WHERE id = ?";
    const [users] = await db.query(query, [status, parseInt(id)]);
    return NextResponse.json(users);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
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
