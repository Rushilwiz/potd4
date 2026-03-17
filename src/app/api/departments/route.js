import { getDepartments } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
    const departments = await getDepartments();
    return NextResponse.json(departments);
}