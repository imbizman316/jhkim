"use client";

import React, { useState } from "react";
import Link from "next/link";

function BlogActions({ id }: { id: string }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSetMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative w-[500px] flex flex-col justify-center items-center">
      <h1 className="text-3xl cursor-pointer" onClick={handleSetMenu}>
        ...
      </h1>
      <div
        className={`${
          showMenu
            ? "flex flex-row items-center justify-evenly gap-5"
            : "hidden"
        }`}
      >
        <Link href={`/write/${id}`}>Edit</Link>
        <div className="cursor-pointer">Delete</div>
      </div>
    </div>
  );
}

export default BlogActions;
