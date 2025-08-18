//@ts-nocheck
"use client";
import { addToast, ToastProvider } from "@heroui/toast";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isTripConfirmed, setIsTripConfirmed] = React.useState(false);
  const [placement, setPlacement] = React.useState("top-center");
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Select location"])
  );
  const [selectedKeys2, setSelectedKeys2] = React.useState(
    new Set(["Select location"])
  );
  const [rapidPassStatus, setRapidPassStatus] = React.useState("NOPASS");
  const [fare, setFare] = React.useState(0);
  const confirmTrip = async () => {
    const response = await fetch("/api/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("id"),
        src: selectedValue,
        dest: selectedValue2,
        fare: fare,
      }),
    });

    if (response.ok) {
      addToast({
        title: "Trip Confirmed",
        description: `Your trip from ${selectedValue} to ${selectedValue2} has been confirmed.`,
        color: "success",
      });
      setIsTripConfirmed(true);
      return true;
    }
  };
  const approvalRequest = async () => {
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
    router.push("/dashboard");
  };

  const calculateFare = () => {
    if (
      selectedValue === "Select location" ||
      selectedValue2 === "Select location"
    ) {
      setFare(0);
    } else {
      const fareMap = {
        "uttara-north": 0,
        "uttara-center": 2,
        "uttara-south": 5,
        "mirpur-11": 8,
        "mirpur-10": 9,
        agargaon: 12,
      };
      setFare(Math.abs(fareMap[selectedValue] - fareMap[selectedValue2]) * 10);
    }
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

  //storing a dummy user data
  useEffect(() => {
    localStorage.setItem("id", 1);
  }, []);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );
  const selectedValue2 = React.useMemo(
    () => Array.from(selectedKeys2).join(", "),
    [selectedKeys2]
  );
  useEffect(() => {
    calculateFare();
  }, [selectedValue, selectedValue2]);
  return (
    <div className="flex ">
      <div className="fixed z-[100]">
        <ToastProvider
          placement={placement}
          toastOffset={placement.includes("top") ? 60 : 0}
        />
      </div>
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
          <div>
            <div>
              <h1 className="text-5xl text-primary-500 font-black">
                Trip Summary
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-16">
            <div className="flex flex-col justify-center">
              <div className="mb-[1rem]">From</div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="capitalize bg-white border-2 border-black"
                    variant="bordered"
                    onChange={calculateFare}
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Single selection example"
                  selectedKeys={selectedKeys}
                  selectionMode="single"
                  variant="flat"
                  onSelectionChange={setSelectedKeys}
                >
                  <DropdownItem key="uttara-north">Uttara North</DropdownItem>
                  <DropdownItem key="uttara-center">Uttara Centre</DropdownItem>
                  <DropdownItem key="uttara-south">Uttara South</DropdownItem>
                  <DropdownItem key="mirpur-10">Mirpur 10</DropdownItem>
                  <DropdownItem key="mirpur-11">Mirpur 11</DropdownItem>
                  <DropdownItem key="agargaon">Agargaon</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="flex flex-col justify-center w-full">
              <div className="text-center mt-[2.5rem] w-full border-black">{`- - - - - - - - - - - - - - ->`}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-[1rem]">To</div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="capitalize bg-black text-white"
                    variant="solid"
                    onChange={calculateFare}
                  >
                    {selectedValue2}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Single selection example"
                  selectedKeys={selectedKeys2}
                  selectionMode="single"
                  variant="flat"
                  onSelectionChange={setSelectedKeys2}
                >
                  <DropdownItem key="uttara-north">Uttara North</DropdownItem>
                  <DropdownItem key="uttara-center">Uttara Centre</DropdownItem>
                  <DropdownItem key="uttara-south">Uttara South</DropdownItem>
                  <DropdownItem key="mirpur-10">Mirpur 10</DropdownItem>
                  <DropdownItem key="mirpur-11">Mirpur 11</DropdownItem>
                  <DropdownItem key="agargaon">Agargaon</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="mt-62">
            <div className="flex justify-between border-t-1 w-full mx-auto pt-4">
              <div className="text-xl">Fare</div>
              <div className="text-2xl font-semibold">{fare} BDT</div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                color="success"
                className="text-white"
                key={"top-center"}
                onPress={() => {
                  setPlacement("top-center");
                  const trip = confirmTrip();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
