import { getAllVisitors, addVisitor } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const visitors = await getAllVisitors();
  return NextResponse.json(visitors);
}

export async function POST(request) {
  const { visit_date, name, email, phone, whom_to_meet, department_id, has_appointment } = await request.json();
  await addVisitor([visit_date, name, email, phone, whom_to_meet, department_id, has_appointment]);
  return NextResponse.json({ success: true, message: "Visitor added successfully" }, { status: 201 });
}