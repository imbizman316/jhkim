// "use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AppContext, useAppContext } from "./context";
import dompurify from "isomorphic-dompurify";
import BlogCard from "./BlogCard";

type Blog = {
  _id: string;
  category: string;
  createdAt: string;
  title: string;
  image: string;
  content: string;
};

const getBlogs = async (): Promise<{ blogs: Blog[] }> => {
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
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  console.log(year, month, day);

  const sanitizer = dompurify.sanitize;

  const { blogs } = await getBlogs();

  // const uniqueCategories = [
  //   ...new Set(blogs?.map(({ category }: { category: string }) => category)),
  // ];

  const uniqueCategories = [
    ...new Set(blogs?.map((blog: Blog) => blog.category)),
  ];

  console.log(uniqueCategories);

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      {blogs &&
        uniqueCategories?.map((category, index) => (
          <div key={index} className="w-full">
            <hr className="" />
            <h1 className="text-3xl text-center font-bold bg-gray-200 py-2 mb-3">
              {category}
            </h1>
            <hr className="" />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-10">
              {blogs
                ?.filter((blog: Blog) => blog.category === category)
                .reverse()
                .map((blog: Blog, index: number) => (
                  <BlogCard blog={blog} key={index} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Diary;
