//@ts-nocheck
"use client";
import { Button } from "@heroui/button";
import { CheckIcon } from "@/components/CheckIcon";
import { Chip } from "@heroui/chip";
import { useEffect } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { addToast, ToastProvider } from "@heroui/toast";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import React from "react";
import { useRouter } from "next/navigation";
import { transaction } from "../../../actions/transaction";
import { useState } from "react";
export default function RapidPass() {
  const [rapidPassStatus, setRapidPassStatus] = React.useState("NOPASS");
  const [id, setId] = React.useState();
  const [placement, setPlacement] = React.useState("top-center");
  const [isTransactionOk, setIsTransactionOk] = React.useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [user, setUser] = React.useState([]);
  useEffect(() => {
    if (localStorage.getItem("id") === "null"|| !localStorage.getItem("id")) {
      router.push("/login");
    }
  }, []);
  const handleTransaction = async (formData: FormData) => {
    if (formData.get("amount") < 0) {
      addToast({
        title: "Wrong Input",
        description: "Recharge amount must be greater than 0",
        color: "danger",
      });
      return;
    }
    const data = await transaction(formData);

    if (data.status == 200) {

        fetchData();
        addToast({
          title: "Success",
          description: "Recharge was successful",
          color: "success",
        });
        setIsTransactionOk(true);
      }
   
  };
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
    setId(localStorage.getItem("id"));
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

  // useEffect(() => {
  //   // Fetch balance
  //   const fetchBalance = async () => {
  //     try {
  //       const res = await fetch(`/api/rapid-pass/balance/${localStorage.getItem("id")}`);
  //       const data = await res.json();
  //       if (data.balance !== undefined) {
  //         setBalance(data.balance);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchBalance();
  // }, []);
  const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/rapid-pass/balance/${localStorage.getItem("id")}`
          // `/api/users/${localStorage.getItem("id")}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const user = await response.json();
        setUser(user);
        console.log(user);
        if (user.balance !== undefined) {
          setBalance(user.balance);
        }
      } catch (e) {
        console.log(e);
      }
    };
  useEffect(() => {
    
    fetchData();
  }, []);
  const router = useRouter();

  return (
    <div className="flex ">
      <div className="fixed z-[100]">
        <ToastProvider
          placement={placement}
          toastOffset={placement.includes("top") ? 60 : 0}
        />
      </div>
      <div className="w-64 bg-cyan-50 h-[75vh] sticky top-0 shadow-lg rounded-xl">
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
          <h1 className="text-5xl text-primary-500 font-black">Rapid Pass</h1>
          <div className="mt-10">
            <div>
              <Chip color="success" variant="bordered" size="lg">
                Available Balance
              </Chip>
              <div className="p-8 h-20 font-extrabold text-5xl">
                {user.map((user) => (
                  <div key={user.id}>
                    {user.balance}{" "}
                    <span className="text-sm text-success">BDT</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-20 w-full">
            <Form
              className="flex "
              onSubmit={(e) => {
                e.preventDefault();
                handleTransaction(new FormData(e.currentTarget));
              }}
            >
              <Input type="hidden" name="id" value={id} />
              <Input
                isRequired
                className="w-60"
                name="amount"
                label="Recharge (BDT)"
                placeholder="Enter Amount"
                radius="lg"
                type="number"
                size="lg"
              />
              <Button
                color="success"
                className="text-white mt-4"
                key={"top-center"}
                type="submit"
              >
                Recharge
              </Button>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
