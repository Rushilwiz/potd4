import { updateVisitor, deleteVisitor } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { visit_date, name, email, phone, whom_to_meet, department_id, has_appointment } = await request.json();
  await updateVisitor(id, [visit_date, name, email, phone, whom_to_meet, department_id, has_appointment]);
  return NextResponse.json({ success: true, message: "Visitor updated successfully" });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await deleteVisitor(id);
  return NextResponse.json({ success: true, message: "Visitor deleted successfully" });
}