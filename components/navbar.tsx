'use client';
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
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import Image from "next/image";
export const Navbar = () => {
  const router = useRouter();
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <div className="w-full justify-between">
        <div className="flex">
          <Image
            src={"/next.svg"}
            alt="Logo"
            width={50}
            height={50}
            className="mr-4"
          ></Image>
          <div className="w-full flex flex-col items-end">
            <div className="grid grid-cols-2 gap-4">
              <Button color="primary" variant="ghost" radius="full" onPress={() => router.push("/dashboard")}>
                Log In
              </Button>
              <Button color="primary" variant="solid" radius="full">
                Book a ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HeroUINavbar>
  );
};
