"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Session } from "next-auth";

const CommentForm = ({ id }: { id: string }) => {
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    session: Session
  ) {
    e.preventDefault();

    const url = `/api/Comments/${id}`;
    const method = "POST";

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify({
          blog_id: id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          comment: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create comment");
      }

      setMessage("");
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const { data: session } = useSession({
    required: false,
  });

  const [message, setMessage] = useState("");

  return (
    <>
      {session ? (
        <div className="w-full flex justify-center items-center">
          <form
            className="w-full flex flex-col justify-center items-center font-bold py-5"
            onSubmit={(e) => handleSubmit(e, session)}
          >
            <div className="flex flex-row justify-start items-center gap-3 w-full mb-5">
              <Image
                width={30}
                height={30}
                src={session.user.image || ""}
                alt={session.user.name || "user name"}
              />
              <h1>{session?.user?.name}</h1>
            </div>
            <input
              type="text"
              name="comment"
              id="comment"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-slate-200 w-full text-center h-[100px]"
              placeholder="코멘트를 적어주세요."
            />
            <button className="mt-5 bg-red-500 text-white w-full py-1 hover:bg-red-700">
              올리기
            </button>
          </form>
        </div>
      ) : (
        <div>로그인 후 글을 올릴 수 있습니다.</div>
      )}
    </>
  );
};

export default CommentForm;
