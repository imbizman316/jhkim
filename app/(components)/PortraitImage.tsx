import React from "react";
import Image from "next/image";

function PortraitImage() {
  return (
    <div className="bg-white w-full flex flex-col justify-center items-center py-5 font-mono">
      <h1 className="font-semibold text-3xl mb-10 text-center">J.H. KIM</h1>
      <Image
        className="rounded-full shadow-2xl shadow-black hover:size-[30%] duration-300"
        src="/images/photo_2024-06-29_20-17-55.jpg"
        alt="junghyunkim"
        width={200}
        height={200}
      />
    </div>
  );
}

export default PortraitImage;
