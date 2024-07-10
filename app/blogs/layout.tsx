"use client";

import React, { useState } from "react";

function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentOption, setCurrentOption] = useState("All");

  return (
    <div className="w-full flex flex-col items-center">
      {/* <h1>{currentOption}</h1>
      <div className="flex flex-row gap-5">
        <div value="All" onClick={(e) => setCurrentOption("All")}>
          All
        </div>
        <div value="Diary" onClick={(e) => setCurrentOption(e.target.value)}>
          Diary
        </div>
        <div value="Novel" onClick={(e) => setCurrentOption(e.target.value)}>
          Novel
        </div>
        <div value="News" onClick={(e) => setCurrentOption(e.target.value)}>
          News
        </div>
      </div> */}
      <div>{children}</div>
    </div>
  );
}

export default BlogsLayout;
