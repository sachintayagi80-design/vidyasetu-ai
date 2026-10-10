"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { Send, Sparkles, Loader2, GraduationCap, BookMarked, Lightbulb, MessageCircleQuestion } from "lucide-react";

type Message = {
  role: "user" | "ai";
  content: string;
  grounded?: boolean;
};

const quickActions = [
  "Explain First Normal Form simply",
  "What is the difference between DELETE and TRUNCATE?",
  "Give me an example of a surrogate key",
  "Quiz me on Joins",
];

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi! I'm Vidya, your AI tutor. I answer grounded in your course material — right now that's the demo DBMS course. What would you like to understand today?",
      grounded: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Aarav");

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem("vidyasetu-profile") || "{}");
      if (profile.name) setName(profile.name.split(" ")[0]);
    } catch { /* demo fallback */ }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.content || "Sorry, I couldn't process that. Please try again." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "I'm having connection trouble right now. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-4 pb-4">
        {/* Tutor banner */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white shadow-lg shadow-indigo-500/20">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="font-semibold">Vidya — your AI tutor</p>
            <p className="text-xs text-indigo-100">Source-grounded · {name}&apos;s DBMS course</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Online
          </span>
        </div>

        {/* Messages */}
        <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border bg-white p-4 shadow-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-600 text-white"
                    : "rounded-bl-md border bg-slate-50 text-gray-900"
                }`}
              >
                {msg.role === "ai" && (
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    <Sparkles className="h-3 w-3" /> Vidya
                  </span>
                )}
                {msg.content}
                {msg.role === "ai" && idx === messages.length - 1 && !loading && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-7 rounded-full text-xs" onClick={() => send(`Explain that more simply: ${msg.content.slice(0, 60)}`)}>
                      <Lightbulb className="mr-1 h-3 w-3" /> Explain Simply
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 rounded-full text-xs" onClick={() => send("Give me a concrete example of that")}>
                      <BookMarked className="mr-1 h-3 w-3" /> Give an Example
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 rounded-full text-xs" onClick={() => send("Show me the source context for that answer")}>
                      <MessageCircleQuestion className="mr-1 h-3 w-3" /> Show Source
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border bg-slate-50 px-4 py-3 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" /> Vidya is thinking…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {quickActions.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={loading}
              className="rounded-full border bg-white px-3 py-1.5 text-xs text-gray-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Ask Vidya anything about your material…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={loading}
            className="flex-1 rounded-full border-gray-200 px-5"
          />
          <Button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </main>
    </div>
  );
}
