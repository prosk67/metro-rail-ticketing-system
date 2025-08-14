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
    const query = "SELECT email FROM users where email = ?";
    const user = await db.query(query, req.email);
    console.log(user[0][0].email)
    if (!user[0][0].email) {
      
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
