import React from "react";
import CommentForm from "./CommentForm";

const comments = [
  { name: "mikey", content: "음...그런거였군요..." },
  { name: "junghyun", content: "아니 뭐 그런거 가지고 그렇게까지 말하나요..." },
  { name: "준호헐", content: "음...귀엽네요..." },
];

const Comments = ({ id }: { id: string }) => {
  return (
    <div className="min-w-[450px] sm:w-[450px] md:w-[700px] lg:w-[800px]">
      <h1 className="mt-20 text-center font-bold text-2xl w-full mb-5">
        {comments.length} {comments.length > 1 ? "comments" : "comment"}
      </h1>
      <div className="flex flex-col gap-10 border-2 px-10 py-5">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex flex-row gap-10 w-[100%] border-b-2 pb-2 justify-between items-center"
          >
            <h1 className="flex-1 font-bold">{comment.name}</h1>
            <p className="flex-3">{comment.content}</p>
          </div>
        ))}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;
