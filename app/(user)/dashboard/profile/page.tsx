//@ts-nocheck
"use client";
import { useEffect } from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import React from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const users = response.json();
        console.log(users);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const router = useRouter();

  return (
    <div className="flex ">
      <div className="w-64 bg-cyan-50 h-[40em] sticky top-0 shadow-lg rounded-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 ">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Button
              color="primary"
              className="w-full justify-start"
              variant="ghost"
              onPress={() => router.push("/dashboard")}
            >
              Book a ticket
            </Button>
            <Button
              color="primary"
              className="w-full justify-start"
              variant="ghost"
              onPress={() => router.push("/dashboard/profile")}
            >
              Profile
            </Button>
            <Button
              color="primary"
              className="w-full justify-start"
              variant="ghost"
              onPress={() => router.push("/dashboard/trip")}
            >
              Trip History
            </Button>
          </nav>

          <div className="p-4 mt-auto">
            <Button
              color="primary"
              variant="solid"
              className="w-full rounded-lg"
            >
              Request Rapid Pass
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-primary font-black">
            Welcome to your profile
          </h1>
        </div>
        <div></div>
      </main>
    </div>
  );
}
