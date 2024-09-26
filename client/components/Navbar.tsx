"use client";

import { navLinks, profileLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  const pathname = usePathname();
  if (pathname === "/auth/login" || pathname === "/auth/registration")
    return null;
  return (
    <nav className="w-[265px] shrink-0 h-[100vh] relative overflow-hidden">
      <div className="fixed top-0 h-[100vh] w-[265px] flex justify-center py-[50px]">
        <div className="flex flex-col gap-[30px]">
          <Link href="/" className="flex items-center gap-[7px] pl-[14px]">
            <img src="./logo.svg" alt="logo" />
            <h2 className="font-bold text-[24px]">
              Exp<span className="text-primary">Track</span>
            </h2>
          </Link>
          <div
            style={{
              background:
                "linear-gradient(to right, rgba(224, 225, 226, 0.16), rgba(224, 225, 226, 1), rgba(224, 225, 226, 0.16))",
            }}
            className="h-[1px] w-[233px] bg-[#E0E1E2]"
          />
          <div className="w-full flex flex-col gap-[20px]">
            <div className="w-full flex flex-col">
              {navLinks.map((link) => (
                <NavbarLink
                  key={link.id}
                  id={link.id}
                  reference={link.ref}
                  image={link.image}
                  title={link.title}
                  selected={pathname === link.ref}
                />
              ))}
            </div>
            <h2 className="font-bold text-[15px] text-[#2D3748] pl-[12px]">
              ACCOUNT PAGES
            </h2>
            <div className="w-full flex flex-col">
              {profileLinks.map((link) => (
                <NavbarLink
                  key={link.id}
                  id={link.id}
                  reference={link.ref}
                  image={link.image}
                  title={link.title}
                  selected={pathname === link.ref}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
