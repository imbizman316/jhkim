import Link from "next/link";
import React from "react";
import PortraitImage from "./PortraitImage";
import AuthLinks from "./AuthLinks";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export const navBarStyle = "text-gray-700 hover:font-bold hover:text-black";

async function Navbar() {
  const session = await getServerSession(options);

  return (
    <div className="w-full flex flex-col items-center justify-evenly py-3">
      <div className="flex flex-row justify-between px-5 items-center w-full">
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
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </div>
      <PortraitImage />
    </div>
  );
}

export default Navbar;
