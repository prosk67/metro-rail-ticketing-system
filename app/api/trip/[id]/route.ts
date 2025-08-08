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
    const query = `SELECT * 
                   FROM trip
                   JOIN mrt_pass ON trip.mrt_pass_id = mrt_pass.id 
                   WHERE user_id = ?`;
    const [trips] = await db.query(query, [id]);
    return NextResponse.json(trips);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
