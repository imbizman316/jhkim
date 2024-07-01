import Link from "next/link";
import React from "react";
import PortraitImage from "./PortraitImage";
import AuthLinks from "./AuthLinks";

function Navbar() {
  return (
    <div className="w-full flex flex-col items-center justify-evenly py-3">
      <div className="flex flex-row justify-between px-5 items-center w-full">
        <Link className="text-black" href="/">
          Home
        </Link>
        <Link className="text-black" href="/profile">
          Who is?
        </Link>
        <Link className="text-black" href="/blogs">
          blogs
        </Link>
        <AuthLinks />
      </div>
      <PortraitImage />
    </div>
  );
}

export default Navbar;
