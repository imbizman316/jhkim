import Blog, { Comments } from "@/app/(models)/Blogs";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(req: Request | NextRequest) {
  console.log("Trying to post a comment..wait...");

  try {
    const body = await req.json();
    const commentData = body;
    await Comments.create(commentData);
    return NextResponse.json(
      {
        message: "Comment Created",
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
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: Request | NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const foundComments = await Comments.find({
      blog_id: id,
    });

    return NextResponse.json({ foundComments }, { status: 200 });
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
        message: "Comment Deleted",
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
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request | NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await req.json();
    const commentData = body.formData;

    const updatedCommentData = await Comments.findByIdAndUpdate(id, {
      ...commentData,
    });

    return NextResponse.json(
      {
        message: "Comment Updated",
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
