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

export default function Dashboard() {
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
          <div>
            <div>
              <h1 className="text-5xl text-primary-500 font-black">Trip Summary</h1>
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
                  <DropdownItem key="uttara-north">Uttara-North</DropdownItem>
                  <DropdownItem key="uttara-center">Uttara-Center</DropdownItem>
                  <DropdownItem key="uttara-south">Uttara-South</DropdownItem>
                  <DropdownItem key="mirpur-10">Mirpur-10</DropdownItem>
                  <DropdownItem key="mirpur-11">Mirpur-11</DropdownItem>
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
                  <DropdownItem key="uttara-north">Uttara-North</DropdownItem>
                  <DropdownItem key="uttara-center">Uttara-Center</DropdownItem>
                  <DropdownItem key="uttara-south">Uttara-South</DropdownItem>
                  <DropdownItem key="mirpur-10">Mirpur-10</DropdownItem>
                  <DropdownItem key="mirpur-11">Mirpur-11</DropdownItem>
                  <DropdownItem key="agargaon">Agargaon</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="mt-62">
            <div className="flex justify-between border-t-1 w-full mx-auto pt-4">
              <div className="text-xl">Fare</div>
              <div className="text-2xl font-semibold">123 BDT</div>
            </div>
            <div className="flex justify-end mt-4">
              <Button color="success" className="text-white">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
