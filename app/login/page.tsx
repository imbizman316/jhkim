import React from "react";

function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-start items-center pt-10">
      <form className="flex flex-col gap-3 w-[400px]">
        <input
          className="px-3"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <input className="px-3" type="text" placeholder="암호를 입력해주세요" />
        <button className="bg-slate-50">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
