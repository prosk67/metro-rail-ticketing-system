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

export async function deduction(id: any,fare: any){
  try{
    
    const db = await connect();
    const user_id = id;
    const calculated_fare = fare;
    const query = "SELECT rapid_pass_id FROM users WHERE id = ?;";
    const [rapid_pass] = await db.query(query, user_id);
    console.log(rapid_pass);
    const query2 = "UPDATE rapid_pass SET balance = balance - ? WHERE id = ? AND balance >= ?;";
    const res = await db.query(query2, [calculated_fare, rapid_pass[0].rapid_pass_id, calculated_fare]);
    if(res){

      return {redirect: "/dashboard", status: 200}
    }
    return {redirect: "/dashboard", status: 500}
  }catch(e){
    console.log(e)
  }
}