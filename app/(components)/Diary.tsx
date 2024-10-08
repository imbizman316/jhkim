"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, createContext, useRef } from "react";
import { AppContext, useAppContext } from "./context";
import dompurify from "isomorphic-dompurify";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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

  const newsRef = useRef<HTMLDivElement>(null);
  const diaryRef = useRef<HTMLDivElement>(null);
  const novelRef = useRef<HTMLDivElement>(null);

  console.log(year, month, day);

  const sanitizer = dompurify.sanitize;

  const { blogs } = await getBlogs();

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refMap: { [key: string]: React.RefObject<HTMLDivElement> } = {
    News: newsRef,
    Diary: diaryRef,
    Novel: novelRef,
  };

  // const uniqueCategories = [
  //   ...new Set(blogs?.map(({ category }: { category: string }) => category)),
  // ];

  const uniqueCategories = [
    ...new Set(blogs?.map((blog: Blog) => blog.category)),
  ];

  console.log(uniqueCategories);

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <div className="flex gap-10">
        <button onClick={() => scrollToRef(diaryRef)}>diary</button>
        <button onClick={() => scrollToRef(newsRef)}>news</button>
        <button onClick={() => scrollToRef(novelRef)}>novel</button>
      </div>
      {blogs &&
        uniqueCategories?.map((category, index) => (
          <div key={index} className="w-full">
            <hr className="" />
            <h1 className="text-3xl text-center font-bold bg-gray-200 py-2 mb-3">
              {category}
            </h1>
            <hr className="" />
            <div
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-10"
              ref={refMap[category] || null}
            >
              {blogs
                ?.filter((blog: Blog) => blog.category === category)
                .reverse()
                .map((blog: Blog, index: number) => (
                  // <motion.div
                  //   key={index}
                  //   variants={fadeInAnimationVariants}
                  //   initial="initial"
                  //   whileInView="animate"
                  //   viewport={{
                  //     once: true,
                  //   }}
                  // >
                  <BlogCard blog={blog} key={index} />
                  // </motion.div>
                ))}
            </div>
          </div>
        ))}
      <button onClick={() => scrollToTop()}>Back to Top</button>
    </div>
  );
}

export default Diary;
