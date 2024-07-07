import Blog from "@/app/(models)/Blogs";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request | NextRequest, { params }: Params) {
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

export async function DELETE(req: Request | NextRequest, { params }: Params) {
  try {
    const { id } = params;
    await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Blog Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request | NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await req.json();
    const blogData = body.formData;

    const updatedBlogData = await Blog.findByIdAndUpdate(id, {
      ...blogData,
    });

    return NextResponse.json(
      {
        message: "Ticket Updated",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      }
    );
  }
}
