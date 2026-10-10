"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Target } from "lucide-react";

type Question = {
  level: 1 | 2 | 3;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  misconception: string;
};

const questionBank: Question[] = [
  {
    level: 1,
    topic: "Keys",
    question: "Which property MUST a primary key have?",
    options: ["It can contain duplicate values", "It must uniquely identify each row", "It must be a number", "It must be auto-incremented"],
    answer: 1,
    explanation: "A primary key uniquely identifies every row in a table. It cannot contain NULL or duplicate values.",
    misconception: "You may be confusing the primary key with a foreign key — a foreign key CAN repeat because it references another table.",
  },
  {
    level: 1,
    topic: "SQL Basics",
    question: "Which SQL clause filters rows BEFORE grouping?",
    options: ["HAVING", "WHERE", "ORDER BY", "GROUP BY"],
    answer: 1,
    explanation: "WHERE filters individual rows before grouping; HAVING filters groups after aggregation.",
    misconception: "You likely mixed up WHERE and HAVING — remember: WHERE is pre-aggregation, HAVING is post-aggregation.",
  },
  {
    level: 1,
    topic: "ER Model",
    question: "In an ER diagram, what does a diamond represent?",
    options: ["An entity", "A relationship", "An attribute", "A key"],
    answer: 1,
    explanation: "Diamonds represent relationships between entities; rectangles are entities and ovals are attributes.",
    misconception: "Shapes matter in ER diagrams — you may be mixing rectangles (entities) with diamonds (relationships).",
  },
  {
    level: 2,
    topic: "Normalization",
    question: "A table is in 2NF. What does it eliminate?",
    options: ["Transitive dependencies", "Partial dependencies on a composite key", "Multivalued dependencies", "All functional dependencies"],
    answer: 1,
    explanation: "2NF removes partial dependencies — where a non-key attribute depends on only part of a composite primary key.",
    misconception: "Transitive dependencies are removed by 3NF, not 2NF. Partial dependencies are the 2NF concern.",
  },
  {
    level: 2,
    topic: "Transactions",
    question: "Which ACID property guarantees that a transaction's changes survive a crash after COMMIT?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: 3,
    explanation: "Durability means once a transaction commits, its effects persist even after a system failure.",
    misconception: "Atomicity is about all-or-nothing execution; durability is specifically about surviving crashes after commit.",
  },
  {
    level: 2,
    topic: "Joins",
    question: "An INNER JOIN between A and B returns…",
    options: ["All rows of A, matched or not", "All rows of B, matched or not", "Only rows with matches in both tables", "Every combination of rows"],
    answer: 2,
    explanation: "INNER JOIN keeps only rows where the join condition matches in both tables. LEFT/RIGHT JOINs preserve unmatched rows.",
    misconception: "You may be thinking of an OUTER JOIN — those preserve unmatched rows from one or both sides.",
  },
  {
    level: 3,
    topic: "Normalization",
    question: "Which normal form eliminates transitive dependencies of non-key attributes on the primary key?",
    options: ["1NF", "2NF", "3NF", "4NF"],
    answer: 2,
    explanation: "3NF removes transitive dependencies, e.g., where A → B → C and C is non-key.",
    misconception: "This is the classic 2NF/3NF confusion: 2NF targets partial dependencies, 3NF targets transitive ones.",
  },
  {
    level: 3,
    topic: "Transactions",
    question: "Two transactions read the same row, update it based on what they read, and one overwrite is lost. This is…",
    options: ["Dirty read", "Lost update", "Phantom read", "Non-repeatable read"],
    answer: 1,
    explanation: "A lost update occurs when two transactions overwrite each other's changes because both read the original value.",
    misconception: "Dirty reads involve reading uncommitted data; a lost update specifically involves overwriting a committed change.",
  },
];

const initial = questionBank.filter((q) => q.level === 1);

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>(initial);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);

  const q = questions[idx];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.answer;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    setSelected(null);
    if (idx + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
  };

  // Adaptive: after finishing, offer harder set if strong
  const retryHarder = () => {
    const harder = questionBank.filter((x) => x.level === (score >= questions.length * 0.7 ? 3 : 2));
    setQuestions(harder.length ? harder : questionBank);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStreak(0);
  };

  const restart = () => {
    setQuestions(initial);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStreak(0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        {!done ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Adaptive Quiz</h1>
                <p className="text-sm text-gray-500">Topic: {q.topic} · Difficulty: {"★".repeat(q.level)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-indigo-600">Q{idx + 1}/{questions.length}</p>
                <p className="text-xs text-gray-400">Score: {score} · Streak: {streak}</p>
              </div>
            </div>
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
            </div>

            <Card className="border-none shadow-lg shadow-indigo-500/5">
              <CardContent className="p-6">
                <p className="text-lg font-semibold">{q.question}</p>
                <div className="mt-5 space-y-3">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.answer;
                    const isChosen = i === selected;
                    let cls = "border bg-white hover:border-indigo-400 hover:bg-indigo-50/50";
                    if (selected !== null) {
                      if (isCorrect) cls = "border-emerald-400 bg-emerald-50";
                      else if (isChosen) cls = "border-red-400 bg-red-50";
                      else cls = "border bg-white opacity-60";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => choose(i)}
                        disabled={selected !== null}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${cls}`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {selected !== null && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        {selected !== null && isChosen && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <div className={`animate-fade-up mt-5 rounded-xl border p-4 text-sm ${selected === q.answer ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
                    {selected === q.answer ? (
                      <p><strong className="text-emerald-700">Correct!</strong> {q.explanation}</p>
                    ) : (
                      <>
                        <p><strong className="text-red-600">Not quite.</strong> {q.explanation}</p>
                        <p className="mt-2 flex items-start gap-2 text-gray-700">
                          <Target className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <span><strong>Misconception detected:</strong> {q.misconception}</span>
                        </p>
                      </>
                    )}
                    <div className="mt-4 flex justify-end gap-2">
                      {idx + 1 >= questions.length ? (
                        <Button onClick={() => setDone(true)} className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">See Results <ArrowRight className="ml-1 h-4 w-4" /></Button>
                      ) : (
                        <Button onClick={next} className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">Next Question <ArrowRight className="ml-1 h-4 w-4" /></Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="animate-fade-up border-none text-center shadow-lg shadow-indigo-500/5">
            <CardContent className="p-10">
              <p className="text-5xl font-extrabold text-gradient">{score}/{questions.length}</p>
              <p className="mt-2 text-lg font-semibold">
                {score >= questions.length * 0.7 ? "Excellent work!" : score >= questions.length * 0.5 ? "Good progress — keep going!" : "Weak spots detected — Vidya will re-prioritize these topics."}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {score >= questions.length * 0.7
                  ? "Your next quiz will be harder. Difficulty adapted up."
                  : "We'll reschedule these topics in tomorrow's learning path."}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button onClick={retryHarder} className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">
                  <RotateCcw className="mr-2 h-4 w-4" /> Next Round (Adaptive)
                </Button>
                <Button variant="outline" className="rounded-full" onClick={restart}>Reset</Button>
              </div>
              <Link href="/dashboard" className="mt-4 block text-sm text-indigo-600 hover:underline">Back to dashboard</Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
