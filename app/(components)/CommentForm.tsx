import React from "react";

const CommentForm = ({ id }: { id: string }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <form className="w-full flex flex-col justify-center items-center font-bold py-5">
        <h1>ID: Mikey</h1>
        <label htmlFor="comment" className="text-center py-5">
          내용
        </label>
        <input
          type="text"
          name="comment"
          id="comment"
          className="bg-slate-200 w-full text-center h-[100px]"
          placeholder="코멘트를 적어주세요."
        />
      </form>
    </div>
  );
};

export default CommentForm;
