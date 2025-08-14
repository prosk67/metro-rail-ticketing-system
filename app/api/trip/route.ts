//@ts-nocheck
"use server";
import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
function toTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

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
    const source = toTitleCase(body.src);
    const destination = toTitleCase(body.dest);
    const [src] = await db.query(
      "SELECT id FROM station WHERE location = ?",
      source
    );
    const [dest] = await db.query(
      "SELECT id FROM station WHERE location = ?",
      destination
    );

    
    const query =
      "INSERT INTO mrt_pass (`issue_date`, `validity`,`user_id`) values (?,?,?)";
    const [mrt] = await db.query(query, [new Date(), 1, body.id]);

    const query2 =
      "INSERT INTO trip (`src`, `dest`, `fare`,`mrt_pass_id`) values (?,?,?,?)";

    const [trip] = await db.query(query2, [
      src[0].id,
      dest[0].id,
      parseInt(body.fare),
      mrt.insertId,
    ]);

    return NextResponse.json(mrt.insertId);
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
    const { status, id } = await request.json();

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
