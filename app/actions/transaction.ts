"use server";
import { connect } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

export async function transaction(formData: FormData) {
  const db = await connect();
  
  const req = {
    id: localStorage.getItem("id"),
    amount: formData.get("amount"),

    
  };
  const query = "SELECT rapid_pass_id FROM users WHERE id = ?;";
  const [user_id] = await db.query(query, req.id);
  console.log(user_id);
  const query2 = "UPDATE rapid_pass SET balance = balance + ? WHERE id = ?;";

  return {redirect: "/dashboard", status: 200}
}
