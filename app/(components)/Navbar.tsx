import Link from "next/link";
import React from "react";
import PortraitImage from "./PortraitImage";

function Navbar() {
  return (
    <div className="w-full flex flex-col items-center justify-evenly py-5">
      <div className="flex flex-row justify-evenly items-center w-full">
        <Link className="text-black" href="/">
          Home
        </Link>
        <Link className="text-black" href="/profile">
          Who is?
        </Link>
      </div>
      <PortraitImage />
    </div>
  );
}

export default Navbar;
