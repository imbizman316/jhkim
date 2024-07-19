import { ProfileData } from "@/app/(models)/Blogs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request | NextRequest) {
  console.log("Trying to change the profile content, please wait");

  try {
    const body = await req.json();
    const profileData = body.formData;
    await ProfileData.create(profileData);

    return NextResponse.json(
      {
        message: "Profile Created",
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
    const profileData = await ProfileData.find();
    return NextResponse.json(
      { profileData },
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
    const profileData = body.formData;

    const updatedProfileData = await ProfileData.findOneAndUpdate(profileData);

    return NextResponse.json(
      {
        message: "Profile Updated",
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
