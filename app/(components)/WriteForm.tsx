"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { CiCirclePlus, CiImageOn, CiVideoOn } from "react-icons/ci";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { GoLinkExternal } from "react-icons/go";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";

const storage = getStorage(app);

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
  const [file, setFile] = useState<File | Blob | null>(null);
  const [media, setMedia] = useState("");

  useEffect(() => {
    const upload = () => {
      if (!file) {
        console.error("No file selected");
        return;
      }

      let name = "";

      if (file instanceof File) {
        name = new Date().getTime().toString() + file.name;
      } else {
        console.error("Expected file to be of type File");
        return;
      }

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file as Blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("Failed to upload image");
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            console.log("File available at", downloadURL);
            setFormData((pre) => ({
              ...pre,
              image: downloadURL,
            }));
          });
        }
      );
    };

    file && upload();
  }, [file]);

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
      <p className="text-sm">
        표시할 이미지: {file instanceof File && file.name}
      </p>
      {/* <p>{media ? media : "no file"}</p> */}
      <div>
        <CiCirclePlus
          className="text-3xl cursor-pointer my-3"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <div className="flex flex-row gap-3 bg-white p-3 rounded-lg">
          <input
            type="file"
            id="image"
            onChange={(e) =>
              e.target.files &&
              e.target.files.length > 0 &&
              setFile(e.target.files[0])
            }
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <CiImageOn className="text-4xl" />
          </label>
          {/* <GoLinkExternal className="text-4xl" />
          <CiVideoOn className="text-4xl" /> */}
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
