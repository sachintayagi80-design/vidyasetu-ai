import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Vidya, a friendly, encouraging AI tutor inside VidyaSetu AI — a personalized learning platform for students.

Rules:
- Answer in a warm, concise, teacher-like tone. Use short paragraphs and examples.
- Prefer explanations grounded in the student's course material (e.g., their DBMS course). When you answer from general knowledge rather than their uploaded sources, briefly say so.
- If the student seems to have a misconception, gently name it and correct it with a concrete example.
- Keep answers under ~180 words unless asked for depth.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fallback if no API key is provided during demo
    if (!process.env.GEMINI_API_KEY) {
      const last = messages?.[messages.length - 1]?.content?.toLowerCase() ?? "";
      let content =
        "[Demo mode — add a GEMINI_API_KEY to .env.local for live AI answers] You're getting close, but there's a misconception here. A primary key MUST be unique — you might be confusing it with a foreign key, which can repeat. Want an example?";
      if (last.includes("join")) {
        content =
          "[Demo mode] An INNER JOIN keeps only rows that match in both tables. A LEFT JOIN keeps all rows from the left table, filling unmatched right-side columns with NULL. Example: students ⋈ enrollments — a student with no enrollment still appears with a LEFT JOIN, but disappears with an INNER JOIN.";
      } else if (last.includes("example")) {
        content =
          "[Demo mode] Sure! Example: in a Students table, roll_no is a primary key — it's unique for every student. The dept_id column in Students is a foreign key pointing to Departments — many students can share the same dept_id, which is why foreign keys can repeat while primary keys cannot.";
      }
      return NextResponse.json({ role: "ai", content });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Format history for Gemini
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));
    const currentMsg = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(currentMsg);
    const response = await result.response;

    return NextResponse.json({
      role: "ai",
      content: response.text(),
    });
  }   catch (error: any) {
    console.error("Chat API error:", error?.message ?? error);
    const keyIssue =
      error?.message?.includes("API key") ||
      error?.message?.includes("API_KEY") ||
      error?.status === 400 || error?.status === 403;
    return NextResponse.json({
      role: "ai",
      content: keyIssue
        ? "I couldn't reach the AI service — your GEMINI_API_KEY looks invalid or missing permissions. Get a fresh key from aistudio.google.com/app/apikey and put it in .env.local, then restart the dev server."
        : "I'm having trouble reaching the AI service right now. Please try again in a moment.",
    });
  }
}
