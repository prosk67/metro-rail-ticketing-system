"use client";
import { Button } from "@heroui/button";
import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex ">
      {/* Sticky Floating Sidebar */}
      <div className="w-64 bg-background h-[40em] sticky top-0 shadow-lg rounded-xl bg-gray-100">
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
            <Button
              color="danger"
              variant="ghost"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Main Content</h1>
          {/* Your page content goes here */}
        </div>
      </main>
    </div>
  );
}
