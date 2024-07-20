import { Suspense } from "react";
import BlogActions from "@/app/(components)/BlogActions";
import Link from "next/link";
import React from "react";
import Loading from "@/app/(components)/Loading";
import Image from "next/image";
// import DOMPurify from "dompurify";
import dompurify from "isomorphic-dompurify";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Comments from "@/app/(components)/Comments";

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
  const session = await getServerSession(options);

  const sanitizer = dompurify.sanitize;

  let BlogData = await getBlogById(params.id);
  BlogData = BlogData.foundBlog;

  const slicedDate = BlogData.createdAt?.slice(0, 10);

  const DisplayBlog = () => {
    return (
      <>
        <h1 className="text-sm">{BlogData.category}</h1>
        <h1>{slicedDate}</h1>
        <h1 className="text-3xl font-bold py-10 ">{BlogData.title}</h1>
        <div
          style={{ whiteSpace: "normal" }}
          className="w-[350px] sm:w-[350px] md:w-[500px] lg:w-[600px] mb-10"
          dangerouslySetInnerHTML={{
            __html: sanitizer(BlogData?.content),
          }}
        />
        <Image
          src={BlogData.image}
          alt={BlogData.title}
          width={600}
          height={600}
          className="w-[400px] sm:w-[400px] md:w-[400px] lg:w-[700px]"
          style={{
            objectFit: "contain",
            width: "600px",
            // height: "500px",
          }}
          // sizes="(max-height: 500px)"
        />

        {/* <p style={{ whiteSpace: "normal" }} className="max-w-[500px]">
          {BlogData.content}
          </p> */}
        {session && session?.user?.role === "admin" && (
          <BlogActions id={BlogData._id} />
        )}
        <Comments id={BlogData._id} />
      </>
    );
  };

  return (
    <div className="min-h-screen w-[350px] flex flex-col items-center justify-center py-7 px-10">
      <Suspense fallback={<Loading />}>
        <DisplayBlog />
      </Suspense>
    </div>
  );
}

export default BlogDetailPage;
