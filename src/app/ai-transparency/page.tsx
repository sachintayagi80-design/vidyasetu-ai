import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ShieldCheck, Search, BookOpen, AlertTriangle } from "lucide-react";

const principles = [
  {
    icon: BookOpen,
    title: "Source grounding",
    description: "When you upload material, Vidya the tutor answers preferentially from your documents. Answers that come directly from your sources are marked 'Grounded in your material'.",
  },
  {
    icon: Search,
    title: "Honest labeling",
    description: "When Vidya answers from general knowledge — for example, a background explanation not covered in your notes — it explicitly labels it so you always know the origin of what you're reading.",
  },
  {
    icon: ShieldCheck,
    title: "No fabricated sources",
    description: "VidyaSetu never invents page numbers, quotes, or citations. If the material doesn't contain an answer, Vidya says so instead of guessing.",
  },
  {
    icon: AlertTriangle,
    title: "Known limitations",
    description: "AI can still make mistakes: extraction of topics from complex documents may be imperfect, and adaptive difficulty is heuristic-based. Always cross-check critical facts with your official course material.",
  },
];

export default function AiTransparencyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">AI Transparency</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          VidyaSetu AI uses the Google Gemini API to power its tutor, quiz feedback, and content extraction. We believe students deserve to know exactly how AI participates in their learning.
        </p>
        <div className="mt-8 space-y-6">
          {principles.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-2xl border bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold">{p.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-sm text-indigo-900">
          <strong>Our commitment:</strong> AI is a tutor&apos;s assistant, not an authority. Final mastery is measured by your own practice performance, and every AI suggestion is designed to be verifiable against your source material.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
