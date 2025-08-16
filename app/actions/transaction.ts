"use server";
import { connect } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

export async function transaction(formData: FormData) {
  const db = await connect();
  
  const req = {
    id: formData.get("id"),
    amount: formData.get("amount"),

    
  };
  console.log(req.id);
  const query = "SELECT rapid_pass_id FROM users WHERE id = ?;";
  const [user_id] = await db.query(query, req.id);
  console.log(user_id);
  const query2 = "UPDATE rapid_pass SET balance = balance + ? WHERE id = ?;";
  try{
    db.query(query2,[req.amount, user_id[0].rapid_pass_id])
  }catch(e){
    throw new Error().message;
  }
  return {redirect: "/dashboard", status: 200}
}
