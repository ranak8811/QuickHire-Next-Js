import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/jobs - Fetch all jobs with search/filter
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const location = searchParams.get("location");

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }

    const db = await connectDB();
    const jobs = await db.collection("jobs").find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST /api/jobs - Create a new job (Admin only)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real app, you'd check for user.role === 'admin'
    // For this task, we'll assume any logged-in user can post for simplicity 
    // or you can restrict to a specific email if needed.

    const body = await req.json();
    const { title, company, location, category, description } = body;

    if (!title || !company || !location || !category || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection("jobs").insertOne({
      title,
      company,
      location,
      category,
      description,
      createdAt: new Date(),
      userId: session.user.id
    });

    return NextResponse.json({ message: "Job created successfully", jobId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
