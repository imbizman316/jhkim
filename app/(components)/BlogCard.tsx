import React from "react";
import Image from "next/image";
import Link from "next/link";
import dompurify from "isomorphic-dompurify";

type Blog = {
  _id: string;
  category: string;
  createdAt: string;
  title: string;
  image: string;
  content: string;
};

type BlogCardProps = {
  blog: Blog;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  const sanitizer = dompurify.sanitize;

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row flex-col gap-7 hover:outline-black hover:outline-offset-4 hover:outline-dotted duration-200">
      <div className="flex justify-center items-center">
        <Image
          src={blog.image}
          alt={blog.title}
          width={300}
          height={300}
          style={{
            objectFit: "cover",
            width: "280px",
            height: "280px",
          }}
          sizes="(max-height: 100px)"
        />
      </div>
      <div className="flex flex-col justify-between items-start h-auto">
        <div>
          <div className="flex flex-row text-sm justify-between mb-3 w-auto">
            <h1>{blog.createdAt?.slice(0, 10)}</h1>
            <h1>{blog.category}</h1>
          </div>
          <h1 className="text-2xl font-bold max-h-[30px] overflow-hidden mb-3">
            {blog.title}
          </h1>

          <div
            className="w-auto overflow-hidden max-h-[100px]"
            dangerouslySetInnerHTML={{
              __html: sanitizer(blog.content),
            }}
          ></div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <Link
            className="text-gray-400 hover:text-gray-700 duration-300 hover:font-semibold"
            href={`/blogs/${blog._id}`}
          >
            Read more
          </Link>
          {/* <Link
        className="text-gray-400 hover:text-gray-700 duration-300 hover:font-semibold"
        href={`/write/${blog._id}`}
      >
        Edit
      </Link> */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
