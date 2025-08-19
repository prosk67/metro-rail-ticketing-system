"use client";
import { login } from "../../actions/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
export default function Login() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(true);
  
  const router = useRouter();
  const handleLogin = async (formData: FormData) => {
    const result = await login(formData);
    if (result?.redirect) {
      localStorage.setItem("id",`${result.id}`)
      router.push(result.redirect);
    }
    if (result?.status == 404) {
      setIsLoginSuccess(false);
      
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-[10vh] text-primary font-black text-6xl">
          _Metro_
      </div>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        
        onSubmit={(e) => {
          e.preventDefault();
          
          handleLogin(new FormData(e.currentTarget));
          
        }}
      >
        <Input
          isRequired
          isInvalid={!isLoginSuccess}
          errorMessage="Wrong Email or Password"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          
        />
        <Input
          isRequired
          isInvalid={!isLoginSuccess}
          errorMessage="Wrong Password or Email"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        <div className="w-full flex justify-between">
          <Button color="primary" variant="ghost" radius="full" type="submit">
            Log In
          </Button>
          <Button color="primary" variant="solid" radius="full" onPress={()=>router.push("/signup")}>
            Sign Up
          </Button>
        </div>
      </Form>

    </div>
  );
}
