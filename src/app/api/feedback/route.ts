import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();
    if (!email || !message) {
      return NextResponse.json(
        { errorMessage: "email and message is required" },
        { status: 422 }
      );
    }
    await prisma.$connect();
    await prisma.feedback.create({
      data: {
        email,
        message,
      },
    });
    return NextResponse.json(
      { successMessage: "The feedback was sent successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    throw new Error("Could not retrieve data");
  } finally {
    await prisma.$disconnect();
  }
}
