import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import {
  Upload, BrainCircuit, MessageSquareText, Target, LineChart, BookOpenCheck,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Document-to-Course RAG",
    description: "Upload PDFs, PPTs, or handwritten notes. VidyaSetu chunks your material, extracts topics, and generates flashcards and quizzes directly from what you'll actually be tested on.",
    bullets: ["Supports PDF, PPT, DOCX and plain text", "Auto topic extraction and chunking", "Every lesson links back to your source pages"],
  },
  {
    icon: BrainCircuit,
    title: "Personalized Learning Path",
    description: "Tell VidyaSetu your exam date and how much time you can study each day. It builds a day-by-day roadmap that adapts every time you practice.",
    bullets: ["Daily plans sized to your available time", "Re-prioritizes weak topics automatically", "Countdown-aware: speeds up as exams approach"],
  },
  {
    icon: MessageSquareText,
    title: "Grounded AI Tutor (Vidya)",
    description: "Vidya answers using your own materials. When it steps outside your sources into general knowledge, it tells you — no silent hallucinations.",
    bullets: ["Source-grounded answers with citations", "Grounded vs general-knowledge labeling", "Explain Simply / Give an Example follow-ups"],
  },
  {
    icon: Target,
    title: "Misconception Detection",
    description: "Wrong answers aren't just marked red. VidyaSetu diagnoses why you got it wrong, names the misconception, and re-teaches the concept.",
    bullets: ["Per-question misconception diagnosis", "Targeted re-teaching with examples", "Tracks recurring misconceptions over time"],
  },
  {
    icon: LineChart,
    title: "Knowledge Map",
    description: "A living map of every topic: strong, developing, or needs attention. Watch it change as you learn and practice.",
    bullets: ["Topic-level mastery tracking", "Weekly progress trends and charts", "Weak-spot feed with suggested actions"],
  },
  {
    icon: BookOpenCheck,
    title: "Adaptive Quizzes & Flashcards",
    description: "Quizzes adapt difficulty based on your answers, and spaced-repetition flashcards keep revision efficient.",
    bullets: ["Difficulty adapts to your accuracy", "Instant misconception feedback", "Spaced repetition scheduling"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-slate-50 py-16 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Features that <span className="text-gradient">teach, not just tell</span>
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Everything VidyaSetu does is designed around one goal: real mastery of your material, not passive reading.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
                  <f.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-xl font-bold">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/onboarding">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8">
                Try it now — it&apos;s free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
