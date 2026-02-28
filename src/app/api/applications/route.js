import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// POST /api/applications - Submit a job application
export async function POST(req) {
  try {
    const body = await req.json();
    const { job_id, name, email, resume_link, cover_note } = body;

    // 1. Basic Validation: Required Fields
    if (!job_id || !name || !email || !resume_link || !cover_note) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // 3. URL Validation for Resume Link
    try {
      new URL(resume_link);
    } catch (e) {
      return NextResponse.json(
        { error: "Resume link must be a valid URL" },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // 4. Verify Job Existence
    try {
      const job = await db.collection("jobs").findOne({ _id: new ObjectId(job_id) });
      if (!job) {
        return NextResponse.json(
          { error: "The job you are applying for does not exist" },
          { status: 404 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid Job ID" },
        { status: 400 }
      );
    }

    // 5. Save Application
    const result = await db.collection("applications").insertOne({
      job_id: new ObjectId(job_id),
      name,
      email,
      resume_link,
      cover_note,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Application submitted successfully", applicationId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
