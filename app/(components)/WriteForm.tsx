"use client";

import React, { ChangeEvent, useState } from "react";
import { CiCirclePlus, CiImageOn, CiVideoOn } from "react-icons/ci";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { GoLinkExternal } from "react-icons/go";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Blog = {
  blog: {
    _id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

function WriteForm({ blog }: Blog) {
  const EDITMODE = blog._id === "new" ? false : true;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleValueChange(value: string): void {
    setValue(value);
  }

  const startingBlogData = {
    category: "Diary",
    content: "",
    image: "",
    title: "",
  };

  if (EDITMODE) {
    startingBlogData["category"] = blog.category;
    startingBlogData["content"] = blog.content;
    startingBlogData["image"] = blog.image;
    startingBlogData["title"] = blog.title;
  }

  const [formData, setFormData] = useState(startingBlogData);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleReactQuillChange = (value: string) => {
    setFormData((pre) => ({
      ...pre,
      content: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = EDITMODE ? `/api/Blogs/${blog._id}` : "/api/Blogs";
    const method = EDITMODE ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json", // Correctly specified header
        },
      });

      if (!res.ok) {
        throw new Error(
          EDITMODE ? "Failed to update Blog" : "Failed to create Blog"
        );
      }

      router.push("/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  return (
    <form
      className="min-h-screen bg-gray-300 pt-10 px-5 flex flex-col items-center"
      method="post"
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        className="px-5 py-3 border-2 border-gray-600 w-[500px]"
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <select
        name="category"
        id="write"
        className="my-5 w-[500px]"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="Diary">Diary</option>
        <option value="Novel">Novel</option>
        <option value="News">News</option>
      </select>
      {/* <input
        name="image"
        type="text"
        placeholder="Enter image url"
        className="px-5 py-2 w-[500px]"
        value={formData.image}
        onChange={handleChange}
      /> */}
      <div>
        <CiCirclePlus
          className="text-3xl cursor-pointer my-3"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div className="flex flex-row gap-3 bg-white p-3 rounded-lg">
          <CiImageOn className="text-4xl" />
          <GoLinkExternal className="text-4xl" />
          <CiVideoOn className="text-4xl" />
        </div>
      )}
      <ReactQuill
        theme="bubble"
        value={formData.content}
        onChange={handleReactQuillChange}
        placeholder="Tell your story..."
        className="bg-white min-h-[700px] text-2xl min-w-[500px] border-2 border-gray-400 shadow-lg"
      />
      <input
        type="submit"
        className="bg-gray-700 text-white px-10 py-1 my-5 hover:bg-black duration-300 w-[500px]"
        value={EDITMODE ? "Update" : "Create"}
      />
    </form>
  );
}

export default WriteForm;
