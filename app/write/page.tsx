"use client";

import React, { useState } from "react";
import { CiCirclePlus, CiImageOn } from "react-icons/ci";

function WritePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-300 pt-10 px-5">
      <input type="text" placeholder="Title" />
      <div>
        <CiCirclePlus className="text-5xl" />
      </div>
    </div>
  );
}

export default WritePage;
