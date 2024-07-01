import Image from "next/image";
import React from "react";

const text = "- 대표작 <매드월드> 스토리, 세계관 리드 라이터";

function Profile() {
  return (
    <div className="min-h-[50rem] bg-black flex flex-col justify-center items-center">
      <div className="flex flex-col gap-7">
        <Image
          className="rounded-lg"
          src="/images/photo_2024-06-29_22-15-54.jpg"
          alt="jh_working"
          width={300}
          height={300}
        />
        <div className="text-white max-w-[320px] text-sm">
          <h1 className="font-bold text-xl text-center">
            시나리오 라이터 J.H. Kim
          </h1>
          <hr className="py-3 mt-3" />
          <h1 className="">- (전) 잡지사 객원기자 (시공사, 제우미디어)</h1>
          <h1 className="">
            - (전) 예술 커뮤니티 사이트 총괄 운영 및 전속 작가
          </h1>
          <h1 className="">- (전) 출판사 황매 전속 작가</h1>
          <h1 className="">- 다수 문예대회 및 공모전 수상 이력</h1>
          <h1 className="">- (현) 6년차 시나리오 라이터</h1>
          <h1 className="">{text}</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
