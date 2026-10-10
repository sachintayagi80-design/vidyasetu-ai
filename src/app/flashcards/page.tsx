"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { ArrowLeft, ArrowRight, RotateCcw, Layers } from "lucide-react";

type Card = { topic: string; front: string; back: string };

const cards: Card[] = [
  { topic: "Keys", front: "What is a superkey?", back: "Any set of attributes that uniquely identifies a row. A candidate key is a minimal superkey." },
  { topic: "Keys", front: "Primary key vs foreign key?", back: "A primary key uniquely identifies rows within its own table and can't be NULL or duplicate. A foreign key references a primary key in another table and CAN repeat." },
  { topic: "Normalization", front: "What does 1NF require?", back: "Atomic values: each cell holds a single value, and each row is unique. No repeating groups or arrays inside a column." },
  { topic: "Normalization", front: "What does 2NF eliminate?", back: "Partial dependencies — non-key attributes that depend on only part of a composite primary key." },
  { topic: "Normalization", front: "What does 3NF eliminate?", back: "Transitive dependencies — where a non-key attribute depends on another non-key attribute instead of directly on the key." },
  { topic: "Transactions", front: "What are the ACID properties?", back: "Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (committed changes survive crashes)." },
  { topic: "Joins", front: "LEFT JOIN vs INNER JOIN?", back: "INNER JOIN keeps only matching rows from both tables. LEFT JOIN keeps all rows from the left table, with NULLs where the right side has no match." },
  { topic: "SQL", front: "DELETE vs TRUNCATE?", back: "DELETE is DML, row-by-row, can have a WHERE clause, and can be rolled back. TRUNCATE is DDL, removes all rows instantly, resets identity, and is typically faster." },
];

export default function FlashcardsPage() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number>(0);

  const card = cards[idx];

  const go = (dir: 1 | -1) => {
    setFlipped(false);
    setIdx((i) => (i + dir + cards.length) % cards.length);
  };

  const markKnown = () => {
    if (!flipped) setFlipped(true);
    else {
      setKnown((k) => k + 1);
      go(1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <div className="mb-6 text-center">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Layers className="h-6 w-6 text-indigo-500" /> Smart Flashcards
          </h1>
          <p className="mt-1 text-sm text-gray-500">Spaced-repetition review generated from your material · Cards known: {known}</p>
        </div>

        {/* Progress dots */}
        <div className="mb-6 flex justify-center gap-1.5">
          {cards.map((_, i) => (
            <span key={i} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-indigo-500" : "w-2 bg-gray-300"}`} />
          ))}
        </div>

        {/* Card */}
        <div
          className="relative mx-auto h-72 w-full cursor-pointer select-none"
          onClick={() => setFlipped(!flipped)}
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-500"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-none bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-center text-white shadow-2xl shadow-indigo-500/25" style={{ backfaceVisibility: "hidden" }}>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">{card.topic}</span>
              <p className="mt-5 text-xl font-semibold leading-relaxed">{card.front}</p>
              <p className="mt-6 text-xs text-indigo-200">Click to reveal answer</p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border bg-white p-8 text-center shadow-2xl shadow-indigo-500/10" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">{card.topic} · Answer</span>
              <p className="mt-5 text-base leading-relaxed text-gray-700">{card.back}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="outline" className="rounded-full" onClick={() => go(-1)}>
            <ArrowLeft className="h-4 w-4" /> Prev
          </Button>
          <Button onClick={markKnown} className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600">
            {flipped ? "I knew it" : "Reveal"}
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => go(1)}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }}>
            <RotateCcw className="mr-1 h-3 w-3" /> Restart deck
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Want more? <Link href="/tutor" className="text-indigo-600 hover:underline">Ask Vidya</Link> to explain any of these concepts.
        </p>
      </main>
    </div>
  );
}
