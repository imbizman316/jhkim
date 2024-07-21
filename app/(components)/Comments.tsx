import React from "react";
import CommentForm from "./CommentForm";
import Image from "next/image";

const getComments = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Comments/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error getting comments");
  }

  return res.json();
};

// const comments = [
//   { name: "mikey", content: "음...그런거였군요..." },
//   { name: "junghyun", content: "아니 뭐 그런거 가지고 그렇게까지 말하나요..." },
//   { name: "준호헐", content: "음...귀엽네요..." },
// ];

const Comments = async ({ id }: { id: string }) => {
  let comments = await getComments(id);
  comments = comments.foundComments;

  console.log("There are comments", comments);

  return (
    <div className="min-w-[450px] sm:w-[450px] md:w-[700px] lg:w-[800px]">
      <h1 className="mt-20 text-center font-bold text-2xl w-full mb-5">
        {comments?.length} {comments?.length > 1 ? "comments" : "comment"}
      </h1>
      <div className="flex flex-col gap-10 border-2 px-10 py-5">
        {comments &&
          comments.length &&
          comments.map(
            (
              comment: { image: string; name: string; comment: string },
              index: number
            ) => (
              <div
                key={index}
                className="flex flex-row gap-10 w-[100%] border-b-2 pb-2 justify-between items-center"
              >
                <Image
                  width={30}
                  height={30}
                  src={comment.image || ""}
                  alt={comment.name || "user name"}
                />
                <h1 className="flex-1 font-bold">{comment.name}</h1>
                <p className="flex-3">{comment.comment}</p>
              </div>
            )
          )}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;
