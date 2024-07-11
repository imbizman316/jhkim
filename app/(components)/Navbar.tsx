import Link from "next/link";
import React from "react";
import PortraitImage from "./PortraitImage";
import AuthLinks from "./AuthLinks";

export const navBarStyle = "text-gray-700 hover:font-bold hover:text-black";

function Navbar() {
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
        <AuthLinks />
      </div>
      <PortraitImage />
    </div>
  );
}

export default Navbar;
