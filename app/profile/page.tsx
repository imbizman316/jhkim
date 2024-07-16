"use client";

import Image from "next/image";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useAppContext } from "../(components)/context";
import { LiaWindowCloseSolid } from "react-icons/lia";

const text = "- 대표작 <매드월드> 스토리, 세계관 리드 라이터";

function Profile() {
  const { openProfileEdit, setOpenProfileEdit } = useAppContext();

  const [title, setTitle] = useState("시나리오 라이터 J.H. Kim");
  const [description, setDescription] =
    useState("잡지사 객원기자 시공사, 제우미디");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Get title, and description and post them to mongoDB
  };

  return (
    <div className="min-h-[50rem] bg-black flex flex-col justify-center items-center w-full">
      <div className="flex flex-col gap-7">
        <Image
          className="rounded-lg"
          src="/images/photo_2024-06-29_22-15-54.jpg"
          alt="jh_working"
          width={300}
          height={300}
        />
        <div className="text-white max-w-[320px] text-sm">
          <h1 className="font-bold text-xl text-center">{title}</h1>
          <hr className="py-3 mt-3" />
          <h1>{description}</h1>

          {/* <h1 className="">- (전) 잡지사 객원기자 (시공사, 제우미디어)</h1>
          <h1 className="">
            - (전) 예술 커뮤니티 사이트 총괄 운영 및 전속 작가
          </h1>
          <h1 className="">- (전) 출판사 황매 전속 작가</h1>
          <h1 className="">- 다수 문예대회 및 공모전 수상 이력</h1>
          <h1 className="">- (현) 6년차 시나리오 라이터</h1>
          <h1 className="">{text}</h1> */}
        </div>
      </div>
      {/* <div className="relative">------</div> */}
      {openProfileEdit && (
        <Draggable>
          <form
            className="absolute top-[400px] flex flex-col gap-3 bg-gray-300 border-2 border-black p-5 w-[50%]"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center">
              <label htmlFor="text">타이틀</label>
              <LiaWindowCloseSolid
                className="text-4xl text-gray-400 hover:text-gray-800"
                onClick={() => setOpenProfileEdit(false)}
              />
            </div>
            <input
              name="text"
              id="text"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">내용</label>
            <textarea
              name="second"
              id="description"
              value={description}
              className="h-[200px]"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="bg-white">문구확정</button>
          </form>
        </Draggable>
      )}
      <h1
        className="text-black font-bold text-center mt-20 w-[30%] bg-white hover:bg-yellow-200"
        onClick={() => setOpenProfileEdit(true)}
      >
        편집
      </h1>
    </div>
  );
}

export default Profile;
