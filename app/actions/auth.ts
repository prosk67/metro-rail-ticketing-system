//@ts-nocheck
"use server";
import { connect } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

export async function signup(formData: FormData) {
  try {
    const db = await connect();
    const req = {
      name: formData.get("name"),
      nid: formData.get("nid"),
      contact: formData.get("contact"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const query =
      "INSERT INTO `users`(`name`, `nid`, `contact`, `email`, `password`) VALUES (?,?,?,?,?);";
    const [res] = await db.query(query, [
      req.name,
      req.nid,
      req.contact,
      req.email,
      req.password,
    ]);
    console.log(res?.insertId);
    return { redirect: "/dashboard", status: 200, id: res?.insertId  };
  } catch (e) {
    return { error: "Something went wrong", status: 404 };
  }
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

    if (user[0][0] === undefined) {
      return {
        error: "User does not exist",
        status: 404,
      };
    }
    return { redirect: "/dashboard", id: user[0][0].id };
  } catch (e) {
    console.error(e);
  }
}
