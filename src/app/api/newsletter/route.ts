import { NextResponse } from "next/server";
import { validateEmail } from "@/lib/order-schema";
import { addNewsletterEmail } from "@/lib/order-store";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    body && typeof body === "object" && "email" in body
      ? String((body as { email: unknown }).email ?? "")
      : "";

  if (!validateEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  addNewsletterEmail(email);
  return NextResponse.json({ ok: true });
}
