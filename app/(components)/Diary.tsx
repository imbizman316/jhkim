// "use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AppContext, useAppContext } from "./context";

type blogType = {
  _id: number;
  category: string;
  createdAt: string;
  title: string;
  image: string;
  content: string;
}[];

const blogData: blogType = [
  {
    _id: 0,
    category: "diary",
    createdAt: "2024-06-28T17:04:12.133+00:00",
    title: "나는 김정현이다..",
    image: "/images/photo_2024-06-29_22-15-54.jpg",
    content: "나는 나고, 너는 너다.  내 인생 내가 산다... . ....",
  },
  {
    _id: 1,
    category: "diary",
    createdAt: "2024-06-28T17:04:12.133+00:00",
    title: "Life is hard",
    image: "/images/abstract-drawing-woman-head-cubist-art.avif",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, enim expedita unde cupiditate, excepturi similique adipisci tempora ad numquam minima earum tempore voluptate molestiae magni fuga quas esse voluptatum provident.",
  },
  {
    _id: 2,
    category: "diary",
    createdAt: "2024-06-28T17:04:12.133+00:00",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit adipisci sed sint maxime. Quas eaque veniam voluptas voluptatibus atque esse, dolorum alias, sed blanditiis dolores placeat debitis laudantium reprehenderit recusandae!",
    image: "/images/abstract-drawing-woman-head-cubist-art.avif",
    content:
      "나는 나고, 너는 너다.  내 인생 내가 산다... . ....ㅎㅎㅎㅎㅎ ㅋㅋㅋㅋㅋㅋ 하하하하하핳ㅎㅎㅎㅎㅎ나는 나고, 너는 너다.  내 인생 내가 산다... . ....ㅎㅎㅎㅎㅎ ㅋㅋㅋㅋㅋㅋ 하하하하하핳ㅎㅎㅎㅎㅎ",
  },
];

const getBlogs = async () => {
  console.log(process.env.NEXT_PUBLIC_URL);
  console.log("YELLOW");

  try {
    console.log("Getting blogs on blog page");
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Failed to get blogs", error);
    return { blogs: [] };
  }
};

async function Diary() {
  const { blogs } = await getBlogs();

  return (
    <div className="flex flex-col items-center p-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
        {blogs.map(
          (
            blog: {
              _id: string;
              image: string;
              title: string;
              createdAt: string;
              category: string;
              content: string;
            },
            index: number
          ) => (
            <div
              key={index}
              className="flex flex-row gap-7 hover:outline-black hover:outline-offset-4 hover:outline-dotted duration-200"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={300}
                height={300}
                style={{
                  objectFit: "contain",
                  width: "200px",
                  height: "200px",
                }}
                sizes="(max-height: 100px)"
              />
              <div className="flex flex-col justify-between items-start h-auto">
                <div>
                  <div className="flex flex-row text-sm justify-between mb-3 w-[100%]">
                    <h1>{blog.createdAt}</h1>
                    <h1>{blog.category}</h1>
                  </div>
                  <h1 className="text-2xl font-bold max-h-[30px] overflow-hidden mb-3">
                    {blog.title}
                  </h1>

                  <p className="w-auto overflow-hidden max-h-[100px]">
                    {blog.content}
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Link
                    className="text-gray-400 hover:text-gray-700 duration-300 hover:font-semibold"
                    href={`/blog/${blog._id}`}
                  >
                    Read more
                  </Link>
                  <Link
                    className="text-gray-400 hover:text-gray-700 duration-300 hover:font-semibold"
                    href={`/write/${blog._id}`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Diary;
