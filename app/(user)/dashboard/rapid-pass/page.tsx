//@ts-nocheck
"use client";
import { Button } from "@heroui/button";
import { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import React from "react";
import { useRouter } from "next/navigation";

export default function RapidPass() {
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


    
  }, []);

  const trips = [
    {
      id: 1,
      from: "Agargaon",
      to: "Uttara-North",
      date: "2025-08-06",
      time: "10:30 AM",
      status: "Completed",
      price: "150",
    },
    {
      id: 2,
      from: "Mirpur-10",
      to: "Agargaon",
      date: "2025-08-05",
      time: "2:15 PM",
      status: "Completed",
      price: "200",
    },
    {
      id: 3,
      from: "Mirpur-11",
      to: "Uttara-South",
      date: "2025-08-05",
      time: "2:15 PM",
      status: "Completed",
      price: "200",
    },
    {
      id: 4,
      from: "Agargaon",
      to: "Uttara-Center",
      date: "2025-08-05",
      time: "2:15 PM",
      status: "Completed",
      price: "200",
    },
    {
      id: 5,
      from: "Mirpur-10",
      to: "Agargaon",
      date: "2025-08-05",
      time: "2:15 PM",
      status: "Completed",
      price: "200",
    },
    // Add more trips as needed
  ];
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
                onPress={()=> router.push("/dashboard/rapid-pass") }
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
          <h1 className="text-5xl text-primary-500 font-black">
            Rapid Pass
          </h1>
          <div className="mt-10">
          <div>
            Available Balance
          </div>
          <div>
            Recharge Amount
          </div>
        </div>
        </div>
        
      </main>
    </div>
  );
}
