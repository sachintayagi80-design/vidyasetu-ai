import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-header";
import {
  GraduationCap,
  Upload,
  BrainCircuit,
  MessageSquareText,
  LineChart,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  BookOpenCheck,
  Layers,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Document-to-Course",
    description: "Upload PDFs, PPTs, or notes — VidyaSetu turns them into a structured course with topics, flashcards, and quizzes.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: BrainCircuit,
    title: "Adaptive Learning Path",
    description: "A daily roadmap built around your exam date, available study time, and what you already know.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: MessageSquareText,
    title: "Grounded AI Tutor",
    description: "Vidya answers from your own materials — not guesses. Every answer shows whether it's source-backed or general knowledge.",
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    icon: Target,
    title: "Misconception Detection",
    description: "Wrong answers trigger a diagnosis: Vidya finds the exact misunderstanding and re-teaches it with examples.",
    color: "from-rose-500 to-orange-500",
  },
  {
    icon: LineChart,
    title: "Knowledge Map",
    description: "See strong areas, developing topics, and weak spots at a glance — and watch them change week over week.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: BookOpenCheck,
    title: "Smart Flashcards",
    description: "Spaced-repetition flashcards generated from your material so revision time actually sticks.",
    color: "from-amber-500 to-yellow-500",
  },
];

const steps = [
  {
    n: "1",
    icon: Upload,
    title: "Upload Materials",
    description: "Add your PDFs, PPTs, or class notes. VidyaSetu processes them into a personal knowledge base.",
  },
  {
    n: "2",
    icon: Layers,
    title: "Get Your Path",
    description: "Tell us your exam date and study time. We generate a day-by-day personalized learning path.",
  },
  {
    n: "3",
    icon: BrainCircuit,
    title: "Learn & Practice",
    description: "Study with Vidya, take adaptive quizzes, and revise with smart flashcards from your own material.",
  },
  {
    n: "4",
    icon: Sparkles,
    title: "Adapt & Improve",
    description: "Every answer updates your knowledge map. Weak spots get re-prioritized until you reach mastery.",
  },
];

const stats = [
  { value: "3x", label: "Faster revision with adaptive paths" },
  { value: "100%", label: "Answers grounded in your material" },
  { value: "24/7", label: "Personal tutor in your pocket" },
  { value: "₹0", label: "Built for students who can't afford coaching" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-bold text-xl tracking-tight">
              VidyaSetu<span className="text-gradient"> AI</span>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-6 sm:flex">
            <Link className="text-sm font-medium text-gray-600 hover:text-gray-900" href="/features">Features</Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-gray-900" href="/dashboard">Dashboard</Link>
          </nav>
          <Link href="/onboarding" className="ml-auto sm:ml-4">
            <Button size="sm" className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-50">
          <div className="bg-hero-grid absolute inset-0" />
          <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />
          <div className="animate-blob absolute top-10 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/30 blur-3xl" style={{ animationDelay: "3s" }} />
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-32">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Your material becomes your course
              </div>
              <h1 className="animate-fade-up max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl" style={{ animationDelay: "0.1s" }}>
                Your learning material. Your goals.{" "}
                <span className="text-gradient">Your personalized AI tutor.</span>
              </h1>
              <p className="animate-fade-up max-w-2xl text-lg text-gray-500 md:text-xl" style={{ animationDelay: "0.2s" }}>
                Turn notes, textbooks, and study goals into an adaptive learning journey that understands what you know, identifies what you struggle with, and helps you improve.
              </p>
              <div className="animate-fade-up flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.3s" }}>
                <Link href="/onboarding">
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 shadow-lg shadow-indigo-500/30 hover:from-indigo-700 hover:to-violet-700">
                    Start Learning Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="rounded-full bg-white/70 px-8">See How It Works</Button>
                </Link>
              </div>

              {/* Hero mock card */}
              <div className="animate-float-delayed mt-10 w-full max-w-3xl rounded-2xl border bg-white/80 p-4 shadow-2xl shadow-indigo-500/10 backdrop-blur" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-2 border-b pb-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-medium text-gray-400">VidyaSetu Dashboard — DBMS</span>
                </div>
                <div className="grid gap-4 p-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 p-4 text-left">
                    <p className="text-xs font-medium text-indigo-600">Course Mastery</p>
                    <p className="text-2xl font-bold">45%</p>
                    <p className="text-xs text-emerald-600">▲ +12% this week</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 p-4 text-left">
                    <p className="text-xs font-medium text-rose-600">Weak Spot</p>
                    <p className="text-2xl font-bold">Normalization</p>
                    <p className="text-xs text-gray-500">25 min lesson queued</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 text-left">
                    <p className="text-xs font-medium text-emerald-600">Vidya Tutor</p>
                    <p className="text-2xl font-bold">Online</p>
                    <p className="text-xs text-gray-500">Grounded in your PDFs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-gradient">{s.value}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a private tutor would do — <span className="text-gradient">for free</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              VidyaSetu combines document intelligence, adaptive practice, and a grounded AI tutor into one learning companion.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mt-3 text-gray-500">Upload → Understand → Learn → Practice → Adapt → Improve</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="relative rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold shadow-md shadow-indigo-500/30">
                      {s.n}
                    </span>
                    <s.icon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <h3 className="mt-4 font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social impact + CTA */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-center text-white shadow-2xl shadow-indigo-500/30 md:px-16">
            <ShieldCheck className="mx-auto h-10 w-10 opacity-90" />
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Education, democratized.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-indigo-100">
              VidyaSetu is built to bring high-quality adaptive tutoring to students from resource-constrained backgrounds — the ones who can&apos;t afford private tutors. Equal access to mastery.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/onboarding">
                <Button size="lg" className="rounded-full bg-white px-8 text-indigo-700 hover:bg-indigo-50">
                  <Zap className="mr-2 h-4 w-4" /> Start Learning Free
                </Button>
              </Link>
              <Link href="/tutor">
                <Button size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white">
                  Try the AI Tutor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
