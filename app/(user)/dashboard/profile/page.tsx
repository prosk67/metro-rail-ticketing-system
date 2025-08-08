//@ts-nocheck
"use client";
import { useEffect } from "react";
import { Input } from "@heroui/input";
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
  const [user, setUser] = React.useState([]);
  const [rapidPassStatus, setRapidPassStatus] = React.useState("NOPASS");
  const approvalRequest = async () => {
    // Logic for requesting rapid pass
    await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "PENDING",
        id: localStorage.getItem("id"),
      }),
    });
  };

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(
          `/api/rapid-pass/${localStorage.getItem("id")}`
        );
        const status = await response.json();
        console.log(status);
        if (!status) {
          throw new Error("No status found");
        }
        switch (status[0].rapid_pass_status) {
          case "PENDING":
            setRapidPassStatus("PENDING");
            break;
          case "APPROVED":
            setRapidPassStatus("APPROVED");
            break;

          default:
            setRapidPassStatus("NOPASS");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getStatus();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/users/${localStorage.getItem("id")}`
        );
        const user = await response.json();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setUser(user);
        console.log(user);
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
            {rapidPassStatus === "PENDING" && (
              <Button
                isDisabled
                color="primary"
                variant="solid"
                className="w-full rounded-lg"
              >
                Pending Approval
              </Button>
            )}
            {rapidPassStatus === "APPROVED" && (
              <Button
                color="primary"
                variant="solid"
                className="w-full rounded-lg"
                onPress={() => router.push("/dashboard/rapid-pass")}
              >
                Recharge Rapid Pass
              </Button>
            )}
            {rapidPassStatus === "NOPASS" && (
              <Button
                color="primary"
                variant="solid"
                className="w-full rounded-lg"
                onPress={approvalRequest}
              >
                Request Rapid Pass
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-primary font-black">
            Welcome to your profile
          </h1>
          <div>
            {user.map((user) => (
              <div key={user.email} className="mt-10">
                <Input
                  isDisabled
                  className="max-w-xs"
                  defaultValue={user.name}
                  label="Name"
                  type="name"
                  color="primary"
                  variant="faded"
                />
                <Input
                  isDisabled
                  className="max-w-xs mt-4"
                  defaultValue={user.email}
                  label="Email"
                  type="email"
                  color="primary"
                  variant="faded"
                />
                <Input
                  isDisabled
                  className="max-w-xs mt-4"
                  defaultValue={user.contactno}
                  label="Phone Number"
                  type="tel"
                  color="primary"
                  variant="faded"
                />
                <Input
                  isDisabled
                  className="max-w-xs mt-4"
                  defaultValue={user.nid}
                  label="NID"
                  type="nid"
                  color="primary"
                  variant="faded"
                />
                <Input
                  isDisabled
                  className="max-w-xs mt-4"
                  defaultValue={user.rapid_pass_status}
                  label="Status of Rapid Pass"
                  type="rapid_pass_status"
                  color="primary"
                  variant="faded"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
