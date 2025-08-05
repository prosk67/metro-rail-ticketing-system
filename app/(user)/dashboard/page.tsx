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

export default function Dashboard() {
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
    <div className="min-h-screen flex ">
      <div className="w-64 bg-background h-[40em] sticky top-0 shadow-lg rounded-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 ">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Button className="w-full justify-start" variant="ghost">
              Home
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              Profile
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              Settings
            </Button>
          </nav>

          <div className="p-4 mt-auto">
            <Button color="danger" variant="ghost" className="w-full">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <div>
              <h1 className="text-5xl">Title Goes Here</h1>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-16">
            <div className="flex flex-col justify-center">
              <div className="mb-[2rem]">From</div>
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered">
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
                  <DropdownItem key="text">Text</DropdownItem>
                  <DropdownItem key="number">Number</DropdownItem>
                  <DropdownItem key="date">Date</DropdownItem>
                  <DropdownItem key="single_date">Single Date</DropdownItem>
                  <DropdownItem key="iteration">Iteration</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="flex flex-col justify-center w-full">
              <div className="mt-[4rem] border w-full border-black"></div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-[2rem]">To</div>
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered">
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
                  <DropdownItem key="text">Text</DropdownItem>
                  <DropdownItem key="number">Number</DropdownItem>
                  <DropdownItem key="date">Date</DropdownItem>
                  <DropdownItem key="single_date">Single Date</DropdownItem>
                  <DropdownItem key="iteration">Iteration</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="w-full mx-auto">Fare</div>
          <div className="flex justify-end mt-4">
            <Button color="primary">
              Confirm
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
