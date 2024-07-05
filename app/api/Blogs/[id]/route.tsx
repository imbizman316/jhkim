import Blog from "@/app/(models)/Blogs";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Response | NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const foundBlog = await Blog.findOne({
      _id: id,
    });

    return NextResponse.json({ foundBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
