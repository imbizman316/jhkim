import Image from "next/image";
import React from "react";

function Profile() {
  return (
    <div className="min-h-[50rem] bg-black flex flex-col justify-center items-center">
      <div className="flex flex-row gap-7">
        <Image
          className="rounded-lg"
          src="/images/photo_2024-06-29_22-15-54.jpg"
          alt="jh_working"
          width={300}
          height={300}
        />
        <div className="text-white">
          <h1>이름: 김정현</h1>
          <hr className="py-3" />
          <h1 className="max-w-[300px]">
            안동출신, 2남 중에서 막내로 태어남. 매드월드의 기획자로서 활동함.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
