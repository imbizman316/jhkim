import { HomeText } from "@/app/(models)/Blogs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request | NextRequest) {
  console.log("Trying to change the home text");

  try {
    const body = await req.json();
    const homeText = body.formData;
    await HomeText.create(homeText);

    return NextResponse.json(
      {
        message: "Home Text Created",
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

export async function GET() {
  try {
    const homeText = await HomeText.find();
    return NextResponse.json(
      { homeText },
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

export async function PUT(req: Request | NextRequest) {
  try {
    const body = await req.json();
    const homeText = body.formData;

    const updatedHomeText = await HomeText.findOneAndUpdate(homeText);

    return NextResponse.json(
      {
        message: "Text Updated",
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
