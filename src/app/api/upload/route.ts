import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_CHARS = 15000;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const name = file.name.toLowerCase();
    let text = "";

    if (name.endsWith(".txt") || name.endsWith(".md")) {
      text = await file.text();
    } else if (name.endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default as any;
      const buffer = Buffer.from(await file.arrayBuffer());
      const parsed = await pdfParse(buffer);
      text = parsed.text;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF, TXT, or MD file." },
        { status: 415 }
      );
    }

    text = text.replace(/\s+/g, " ").trim();
    if (!text) {
      return NextResponse.json(
        { error: "Could not extract any text. If this is a scanned PDF, try a text-based file." },
        { status: 422 }
      );
    }

    const truncated = text.slice(0, MAX_CHARS);

    // Demo mode: no API key — return extracted preview only
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        fileName: file.name,
        chars: text.length,
        preview: truncated.slice(0, 500),
        summary: "[Demo mode] Text extracted successfully. Add GEMINI_API_KEY to .env.local to auto-generate flashcards and quizzes.",
        flashcards: [],
        quiz: [],
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a study-content generator for a learning app. From the material below, produce study content.

Return ONLY valid JSON (no markdown fences, no commentary) with this exact shape:
{
  "summary": "2-3 sentence summary of the material",
  "topics": ["topic1", "topic2"],
  "flashcards": [{"front": "question", "back": "answer"}],
  "quiz": [{"question": "...", "options": ["A","B","C","D"], "answer": 0, "explanation": "why", "misconception": "what students usually get wrong"}]
}
Generate 6 flashcards and 4 quiz questions. "answer" is the 0-based index of the correct option.

MATERIAL:
${truncated}`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().replace(/```json|```/g, "").trim();

    let generated;
    try {
      generated = JSON.parse(raw);
    } catch {
      return NextResponse.json({
        fileName: file.name,
        chars: text.length,
        preview: truncated.slice(0, 500),
        summary: "Text extracted, but AI content generation failed to parse. Try again.",
        flashcards: [],
        quiz: [],
      });
    }

    return NextResponse.json({
      fileName: file.name,
      chars: text.length,
      preview: truncated.slice(0, 500),
      ...generated,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Failed to process upload. Check the server logs." },
      { status: 500 }
    );
  }
}
