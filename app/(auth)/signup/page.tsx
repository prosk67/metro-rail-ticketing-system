//@ts-nocheck
"use client";
import { signup } from "../../actions/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
export default function Signup() {
  const[error, setError] = React.useState("");
  const router = useRouter();
  const handleSignup = async (formData: FormData) => {
    const result = await signup(formData);
    if (result?.redirect) {
      localStorage.setItem("id",result?.id);
      router.push(result.redirect);
    }
    if (result?.status == 404) {
      setError(result?.error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-[10vh] text-primary font-black text-6xl">_Metro_</div>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          handleSignup(new FormData(e.currentTarget));
        }}
      >
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
        />
        <Input
          isRequired
          label="NID"
          labelPlacement="outside"
          name="nid"
          placeholder="Enter your NID"
          type="number"
        />

        <Input
          isRequired
          label="Contact No"
          labelPlacement="outside"
          name="contact"
          placeholder="Enter your contact no."
          type="number"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid Email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage="Wrong Password or Email"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        <div className="w-full flex justify-end">
          <Button color="primary" variant="ghost" radius="full" type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
      {error != "" && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
    </div>
  );
}
