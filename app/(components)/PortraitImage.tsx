"use client";

import React, { useState } from "react";
import Image from "next/image";

function PortraitImage() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="bg-white w-full flex flex-col justify-center items-center py-5 font-mono relative">
      <h1 className="font-semibold text-3xl mb-10 text-center">J.H. KIM</h1>
      <Image
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="rounded-full shadow-2xl shadow-black hover:size-[20%] duration-300"
        src="/images/photo_2024-06-29_20-17-55.jpg"
        alt="junghyunkim"
        width={200}
        height={200}
      />
      {isHover && (
        <div
          className={`absolute bg-white p-2 duration-300 top-2 translate-y-10`}
        >
          Hello.. . .....
        </div>
      )}
    </div>
  );
}

export default PortraitImage;
