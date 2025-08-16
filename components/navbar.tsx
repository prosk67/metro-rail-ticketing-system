"use client";
import { useRouter } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";

import Image from "next/image";
import { useEffect } from "react";
export const Navbar = () => {
  
  const router = useRouter();
  const isLoggedIn = true;
  
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-cyan-50 shadow-xl"
    >
      <div className="w-full justify-between">
        <div className="flex h-14">
          <div className="h-auto w-full text-4xl flex items-center font-black text-primary-500">{`_METRO_`}</div>
          <div className="w-full flex flex-col justify-center items-end">
            <div className="grid grid-cols-2 gap-4">
              {isLoggedIn ? (
                <>
             
                  <Button
                    color="primary"
                    variant="ghost"
                    radius="full"
                    onPress={() => router.push("/dashboard")}
                  >
                    Log In
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    radius="full"
                    onPress={() => router.push("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <div></div>
                  <Button
                    color="danger"
                    variant="solid"
                    radius="full"
                    className=""
                    onPress={() => router.push("/")}
                  >
                    Log Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </HeroUINavbar>
  );
};
