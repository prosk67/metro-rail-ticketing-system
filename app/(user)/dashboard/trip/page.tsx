//@ts-nocheck
"use client";
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

export default function Trip() {
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
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Select location"])
  );
  const [selectedKeys2, setSelectedKeys2] = React.useState(
    new Set(["Select location"])
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );
  const selectedValue2 = React.useMemo(
    () => Array.from(selectedKeys2).join(", ").replace(/_/g, ""),
    [selectedKeys2]
  );
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
          <h1 className="text-5xl text-primary-500 font-black">
            Recent Visits
          </h1>
        </div>
        <div className="mt-10">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className=" bg-white m-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{trip.from}</span>
                    <span>→</span>
                    <span className="font-semibold">{trip.to}</span>
                  </div>
                  <div className="text-sm text-gray-600">{trip.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{trip.price} BDT</div>
                  <div className="text-sm text-green-600">{trip.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
