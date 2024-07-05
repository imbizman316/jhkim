import { NextApiRequest } from "next";
import Blog from "@/app/(models)/Blogs";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  console.log("TRYING TO POST, BUT NOT YET POSTED");

  try {
    const body = await req.json();
    const blogData = body.formData;
    await Blog.create(blogData);
    return NextResponse.json(
      {
        message: "Blog Created",
      },
      {
        status: 201,
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

export async function GET() {
  try {
    const blogs = await Blog.find();
    return NextResponse.json(
      { blogs },
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
      {
        status: 500,
      }
    );
  }
}
