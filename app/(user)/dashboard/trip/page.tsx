//@ts-nocheck
"use client";
import { Button } from "@heroui/button";
import { use, useEffect } from "react";
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
  const [rapidPassStatus, setRapidPassStatus] = React.useState("NOPASS");
  const [trips, setTrips] = React.useState([]);
  const [source, setSource] = React.useState([]);
  const [destination, setDestination] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem("id")==="null"|| !localStorage.getItem("id")) {
      router.push("/login");
    }
  }, []);
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
    const getTrips = async () => {
      try {
        const response = await fetch(`/api/trip/${localStorage.getItem("id")}`);
        const trips = await response.json();
        setTrips(trips);
        let src = [];
        let dest = [];

        trips?.map(async (trip) => {
          const stationMap = {
            1: "Uttara North",
            2: "Uttara Center",
            3: "Uttara South",
            4: "Mirpur 11",
            5: "Mirpur 10",
            6: "Agargaon",
          };

          source.push(stationMap[`${trip?.src}`]);
          destination.push(stationMap[`${trip?.dest}`]);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getStatus();
    getTrips();
    setIsLoading(false);
  }, []);
  useEffect(() => {}, []);
  const router = useRouter();

  return (
    <div className="flex ">
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
          <h1 className="text-5xl text-primary-500 font-black">
            Recent Visits
          </h1>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <div>Loading</div>
          ) : (
            trips.map((trip, index) => (
              <div
                key={trip?.id}
                className=" bg-white m-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {source[index] && source[index]}
                      </span>
                      <span>→</span>
                      <span className="font-semibold">
                        {destination[index] && destination[index]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(trip?.issue_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{trip?.fare} BDT</div>
                    <div className="text-sm text-green-600">completed</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
