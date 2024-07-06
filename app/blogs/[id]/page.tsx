import React from "react";

const getBlogById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Error to get blog for ${id}`);
  }

  return res.json();
};

type Params = {
  params: {
    id: string;
  };
};

async function BlogDetailPage({ params }: Params) {
  let BlogData = await getBlogById(params.id);
  BlogData = BlogData.foundBlog;

  return (
    <div className="min-h-screen min-w-full flex flex-col items-center py-7 px-10">
      <h1 className="text-sm">{BlogData.category}</h1>
      <h1 className="text-3xl font-bold">{BlogData.title}</h1>
      <p className="py-10 max-w-[500px]">{BlogData.content}</p>
    </div>
  );
}

export default BlogDetailPage;
