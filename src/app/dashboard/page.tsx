"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, Radar,
} from "recharts";
import { Flame, CalendarClock, Trophy, ArrowRight, BookOpen, MessageSquareText, ListChecks, Layers } from "lucide-react";

const masteryTrend = [
  { week: "W1", mastery: 18 },
  { week: "W2", mastery: 24 },
  { week: "W3", mastery: 29 },
  { week: "W4", mastery: 33 },
  { week: "W5", mastery: 41 },
  { week: "W6", mastery: 45 },
];

const knowledgeMap = [
  { subject: "SQL", strong: 85, weak: 15 },
  { subject: "ER Model", strong: 78, weak: 22 },
  { subject: "Joins", strong: 70, weak: 30 },
  { subject: "Transactions", strong: 55, weak: 45 },
  { subject: "Normalization", strong: 30, weak: 70 },
];

const radarData = knowledgeMap.map((k) => ({ subject: k.subject, mastery: k.strong }));

const learningPath = [
  { title: "Normalization Concepts", status: "Needs Attention", statusColor: "text-red-500", minutes: 25, href: "/tutor" },
  { title: "Transactions & ACID", status: "Developing", statusColor: "text-amber-500", minutes: 20, href: "/tutor" },
  { title: "Adaptive Quiz", status: "Mixed Topics", statusColor: "text-gray-500", minutes: 15, href: "/quiz" },
  { title: "Flashcard Review", status: "Spaced Repetition", statusColor: "text-gray-500", minutes: 10, href: "/flashcards" },
];

const weakSpots = [
  { topic: "Third Normal Form (3NF)", reason: "Confused with BCNF in last 2 quizzes", action: "Re-learn" },
  { topic: "Isolation Levels", reason: "Missed questions on serializable schedules", action: "Practice" },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];
const streakData = [1, 1, 0, 1, 1, 1, 0];

export default function DashboardPage() {
  const [name, setName] = useState("Aarav");
  const [course, setCourse] = useState("Database Management Systems");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem("vidyasetu-profile") || "{}");
      if (profile.name) setName(profile.name.split(" ")[0]);
      if (profile.course) setCourse(profile.course);
    } catch { /* demo fallback */ }
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 md:p-6">
        <div className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {mounted ? name : "…"}!
            </h1>
            <p className="text-muted-foreground">Here is your learning progress for {mounted ? course : "your course"}.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/tutor"><Button className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">Upload New Material</Button></Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-none shadow-md shadow-indigo-500/5">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Course Mastery</CardTitle>
              <Trophy className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45%</div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              </div>
              <p className="mt-2 text-xs text-emerald-600">▲ +12% from last week</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md shadow-indigo-500/5">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5 Days</div>
              <div className="mt-3 flex gap-1.5">
                {days.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className={`h-6 w-6 rounded-md ${streakData[i] ? "bg-gradient-to-br from-orange-400 to-rose-500" : "bg-gray-100"}`} />
                    <span className="text-[10px] text-gray-400">{d}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md shadow-indigo-500/5">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Exam Readiness</CardTitle>
              <CalendarClock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">Moderate</div>
              <p className="mt-1 text-xs text-muted-foreground">Exam in 30 days — on track, keep pace.</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-md shadow-indigo-500/5">
            <CardHeader>
              <CardTitle className="text-base">Mastery Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={masteryTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="masteryFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(v) => [`${v}%`, "Mastery"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                  <Area type="monotone" dataKey="mastery" stroke="#6366f1" strokeWidth={3} fill="url(#masteryFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md shadow-indigo-500/5">
            <CardHeader>
              <CardTitle className="text-base">Topic Mastery Radar</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Radar dataKey="mastery" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />
                  <Tooltip formatter={(v) => [`${v}%`, "Mastery"]} contentStyle={{ borderRadius: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Learning path + knowledge map */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-md shadow-indigo-500/5">
            <CardHeader>
              <CardTitle className="text-base">Today&apos;s Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningPath.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border bg-slate-50/60 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className={`text-xs ${item.statusColor}`}>{item.status} · {item.minutes} min</p>
                    </div>
                  </div>
                  <Link href={item.href}>
                    <Button variant="outline" size="sm" className="rounded-full">
                      Start <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-md shadow-indigo-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Layers className="h-4 w-4 text-indigo-500" /> Knowledge Map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {knowledgeMap.map((k) => (
                  <div key={k.subject}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium">{k.subject}</span>
                      <span className={k.strong >= 70 ? "text-emerald-600" : k.strong >= 50 ? "text-amber-600" : "text-red-500"}>
                        {k.strong >= 70 ? "Strong" : k.strong >= 50 ? "Developing" : "Needs Attention"} · {k.strong}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          k.strong >= 70 ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                            : k.strong >= 50 ? "bg-gradient-to-r from-amber-400 to-orange-500"
                            : "bg-gradient-to-r from-rose-400 to-red-500"
                        }`}
                        style={{ width: `${k.strong}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-br from-rose-50 to-orange-50 shadow-md shadow-rose-500/5">
              <CardHeader>
                <CardTitle className="text-base">Weak Spots Detected</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weakSpots.map((w) => (
                  <div key={w.topic} className="flex items-center justify-between rounded-xl border border-rose-100 bg-white p-3">
                    <div>
                      <h4 className="text-sm font-semibold">{w.topic}</h4>
                      <p className="text-xs text-gray-500">{w.reason}</p>
                    </div>
                    <Link href="/quiz">
                      <Button size="sm" className="rounded-full bg-gradient-to-r from-rose-500 to-orange-500">{w.action}</Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { href: "/tutor", icon: MessageSquareText, title: "Ask Vidya", desc: "Grounded AI tutor" },
            { href: "/quiz", icon: ListChecks, title: "Take a Quiz", desc: "Adaptive practice" },
            { href: "/flashcards", icon: BookOpen, title: "Review Cards", desc: "Spaced repetition" },
          ].map((a) => (
            <Link key={a.href} href={a.href}>
              <div className="group flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
                  <a.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
