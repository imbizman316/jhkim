import WriteForm from "../../(components)/WriteForm";

const getBlogById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get Blog ID");
  }

  return res.json();
};

async function WritePage({ params }) {
  const EDITMODE = params.id === "new" ? false : true;
  let updateBlogData = {};

  if (EDITMODE) {
    updateBlogData = await getBlogById(params.id);
    updateBlogData = updateBlogData.foundBlog;
  } else {
    updateBlogData = {
      _id: "new",
    };
  }

  return (
    <div>
      <WriteForm blog={updateBlogData} />
    </div>
  );
}

export default WritePage;

// "use client";

// import React, { useState } from "react";
// import { CiCirclePlus, CiImageOn, CiVideoOn } from "react-icons/ci";
// import dynamic from "next/dynamic";
// // import ReactQuill from "react-quill";
// import "react-quill/dist/quill.bubble.css";
// import { GoLinkExternal } from "react-icons/go";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// function WritePage() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("");

//   function handleValueChange(value: string): void {
//     setValue(value);
//   }

//   return (
//     <div className="min-h-screen bg-gray-300 pt-10 px-5 flex flex-col items-center">
//       <input
//         className="px-5 py-3 border-2 border-gray-600 w-[300px]"
//         type="text"
//         placeholder="Title"
//       />
//       <select name="write" id="write" className="my-5 w-[300px]">
//         <option value="diary">Diary</option>
//         <option value="novel">Novel</option>
//         <option value="news">News</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Enter image url"
//         className="px-5 py-2 w-[300px]"
//       />
//       <div>
//         <CiCirclePlus
//           className="text-3xl cursor-pointer my-3"
//           onClick={() => setOpen(!open)}
//         />
//       </div>
//       {open && (
//         <div className="flex flex-row gap-3 bg-white p-3 rounded-lg">
//           <CiImageOn className="text-4xl" />
//           <GoLinkExternal className="text-4xl" />
//           <CiVideoOn className="text-4xl" />
//         </div>
//       )}
//       <ReactQuill
//         theme="bubble"
//         value={value}
//         onChange={handleValueChange}
//         placeholder="Tell your story..."
//         className="bg-white min-h-[700px] text-2xl min-w-[700px] border-2 border-gray-400 shadow-lg"
//       />
//       <button className="bg-gray-700 text-white px-10 py-1 my-5 hover:bg-black duration-300">
//         PUBLISH
//       </button>
//     </div>
//   );
// }

// export default WritePage;
