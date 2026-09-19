import { NextRequest, NextResponse } from "next/server";
import { generateImage, Ratio } from "@/lib/nano-api";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let body: { prompt?: string; ratio?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const prompt: string = (body?.prompt ?? "").trim();
    const ratio: Ratio = (["1:1", "16:9", "9:16"].includes(body?.ratio ?? "") ? body.ratio : "1:1") as Ratio;

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt cannot be empty" }, { status: 400 });
    }

    if (prompt.length > 500) {
      return NextResponse.json({ success: false, error: "Prompt too long (max 500 chars)" }, { status: 400 });
    }

    const result = await generateImage(prompt, ratio);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/generate] Error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
