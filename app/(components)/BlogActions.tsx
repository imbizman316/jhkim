"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function BlogActions({ id }: { id: string }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSetMenu = () => {
    setShowMenu(!showMenu);
  };

  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("정말 삭제할까요?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/Blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.push("/blogs");
        router.refresh();
      } else {
        console.error("Failed to delete");
      }
    }
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
        <div className="cursor-pointer" onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
}

export default BlogActions;
