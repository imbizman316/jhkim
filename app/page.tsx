"use client";

import { TypeAnimation } from "react-type-animation";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { useState } from "react";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [second, setSecond] = useState(1000);
  const [confirmedSentence, setConfirmedSentence] = useState([
    "안녕",
    3000,
    "HOW ARE YOU?",
    1000,
  ]);

  const handleAdd = () => {
    // setConfirmedSentence((prev) => [...prev, sentence, second]);

    // const temp = confirmedSentence;
    // temp.push(sentence);
    // temp.push(second);
    // setConfirmedSentence(temp);
    // console.log(confirmedSentence);

    setConfirmedSentence((prev) => [...prev, sentence, second]);
    setSentence(""); // Clear the input field if needed
    setSecond(1000); // Reset the time input if needed
  };

  return (
    // bg-gradient-to-b from-black to-gray-900
    <div className="min-h-[50rem] p-10 w-full text-center flex flex-col items-center justify-start">
      <TypeAnimation
        className="text-black"
        sequence={confirmedSentence}
        wrapper="span"
        speed={40}
        style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
      {/* <form className="absolute top-[600px] flex flex-col gap-3 bg-gray-300 border-2 border-black p-5 w-[50%]">
        <label htmlFor="text">문구</label>
        <input
          name="text"
          id="text"
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />
        <label htmlFor="second">(초)</label>
        <input
          name="second"
          id="second"
          min={1000}
          type="number"
          value={second}
          onChange={(e) => setSecond(parseInt(e.target.value))}
        />
        <div className="bg-white cursor-pointer" onClick={handleAdd}>
          문구 추가
        </div>
        <button className="bg-white">문구확정</button>
        {confirmedSentence.map((item, index) => (
          <h1 className="text-black" key={index}>
            {item}
          </h1>
        ))}
      </form> */}
    </div>
  );
}
