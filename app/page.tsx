"use client";

import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-[50rem] p-10 w-full text-center flex flex-col items-center justify-start">
      <TypeAnimation
        className="text-gray-400"
        sequence={[
          "안녕하세요",
          1000,
          "김정현의 웹사이트에 오신 것을",
          1000,
          "환영합니다...",
          2000,
          ".. . ... .. .. . .. ....",
          10000,
        ]}
        wrapper="span"
        speed={40}
        style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
    </div>
  );
}
