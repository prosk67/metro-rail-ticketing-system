//@ts-nocheck
"use server";
import { connect } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

export async function signup(formData: FormData) {
  const db = await connect();
  
  const req = {
    email: "nafiul.alam@example.com",
    password: formData.get("password"),
  };

  return {redirect: "/dashboard", status: 200}
}

export async function login(formData: FormData) {
  const db = await connect();
  
  const req = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const query = "SELECT id FROM users where email = ? AND password = ?";
    const user = await db.query(query, [req.email, req.password]);
    console.log(user[0][0].id)
    if (!user[0][0].id) {
      
      return {
        error: "User does not exist",
        status: 404
      };
    }
    return { redirect: "/dashboard" };
  } catch (e) {
    console.error(e);
  }
}
