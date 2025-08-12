"use server"
import { connect } from "@/lib/db"

export async function signup(formData: FormData) {
    const db = await connect();
    const req = { email: "nafiul.alam@example.com", password: formData.get("password") }
    
}

export async function login(formData: FormData) {

}