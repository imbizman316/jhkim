"use client";

import { TypeAnimation } from "react-type-animation";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

async function fetchHomeText() {
  try {
    console.log("Getting home text");
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/HomeText`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log("Data returned", data);
    return data;
  } catch (error) {
    console.log("Failed to get home text data");
  }
}

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [second, setSecond] = useState(1000);
  const [confirmedSentence, setConfirmedSentence] = useState<
    (string | number)[]
  >([]);
  const [editWindow, showEditWindow] = useState(false);

  const handleAdd = () => {
    setConfirmedSentence((prev) => [...prev, sentence, second]);

    setSentence(""); // Clear the input field if needed
    setSecond(1000); // Reset the time input if needed
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const url = "/api/HomeText";
    const method = "POST";

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify({
          formData: {
            content: confirmedSentence,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update home text");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    async function loadHomeText() {
      const data = await fetchHomeText();
      console.log(data);
      if (data && data.homeText && data.homeText.length > 0) {
        setConfirmedSentence(data.homeText[data.homeText.length - 1].content);
      } else {
        console.log("No home text data found");
      }
    }

    loadHomeText();
  }, []);

  const { data: session } = useSession({
    required: false,
  });

  return (
    // bg-gradient-to-b from-black to-gray-900
    <div className="min-h-[50rem] p-10 w-full text-center flex flex-col items-center justify-start">
      {confirmedSentence && confirmedSentence.length > 0 && (
        <TypeAnimation
          className="text-black"
          sequence={confirmedSentence}
          wrapper="span"
          speed={40}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      )}
      {editWindow && session?.user?.role === "admin" && (
        <form
          className="absolute top-[600px] flex flex-col gap-3 bg-gray-300 border-2 border-black p-5 w-[90%] sm:w-[90%] md:w-[70%] lg:w-[50%]"
          onSubmit={handleSubmit}
        >
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
          <div
            className="bg-white cursor-pointer"
            onClick={() => setConfirmedSentence([])}
          >
            전체 삭제
          </div>
          <button className="bg-red-500 text-white h-10">문구확정</button>
          {confirmedSentence.map((item, index) => (
            <h1 className="text-black" key={index}>
              {item}
            </h1>
          ))}
        </form>
      )}
      {session?.user?.role === "admin" && (
        <button
          className="text-5xl cursor-pointer hover:text-6xl duration-200 hover:text-red-700"
          onClick={() => showEditWindow(!editWindow)}
        >
          ...
        </button>
      )}
    </div>
  );
}
