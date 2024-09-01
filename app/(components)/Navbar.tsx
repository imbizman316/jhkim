"use client";

import Link from "next/link";
import React, { useContext } from "react";
import PortraitImage from "./PortraitImage";
import AuthLinks from "./AuthLinks";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { RxHamburgerMenu } from "react-icons/rx";
import { AppContext, AppWrapper, useAppContext } from "./context";
import HamburgerMenus from "./(navigation)/HamburgerMenus";

export const navBarStyle =
  "text-gray-700 hover:font-bold hover:text-black hidden sm:hidden md:block lg:block xl:block";

function Navbar({ session }: { session: any }) {
  // const session = await getServerSession(options);
  const { showHamburger, setShowHamburger } = useAppContext();

  console.log(showHamburger);

  return (
    <div className="w-full flex flex-col items-center justify-evenly py-3">
      <div className="flex flex-row justify-between px-5 items-center w-full z-50">
        <Link className={navBarStyle} href="/">
          Home
        </Link>
        <Link className={navBarStyle} href="/profile">
          Who is?
        </Link>
        <Link className={navBarStyle} href="/blogs">
          Blogs
        </Link>
        {session?.user?.role === "admin" && (
          <Link className={navBarStyle} href="/write/new">
            Write
          </Link>
        )}
        {/* <AuthLinks /> */}
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/" className={navBarStyle}>
            Logout
          </Link>
        ) : (
          <Link href="/api/auth/signin " className={navBarStyle}>
            Login
          </Link>
        )}

        <RxHamburgerMenu
          className="text-3xl block sm:block md:hidden lg:hidden xl:hidden cursor-pointer"
          onClick={() => setShowHamburger(!showHamburger)}
        />
      </div>
      <PortraitImage />
      {showHamburger && <HamburgerMenus session={session} />}
    </div>
  );
}

export default Navbar;
