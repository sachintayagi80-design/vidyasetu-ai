"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Sparkles, GraduationCap } from "lucide-react";

const totalSteps = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    educationLevel: "",
    course: "",
    examDate: "",
    availableTime: "2",
  });

  const update = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const validate = (current: number) => {
    const e: Record<string, string> = {};
    if (current === 1) {
      if (!formData.name.trim()) e.name = "Please tell us your name";
      if (!formData.educationLevel.trim()) e.educationLevel = "Please enter your education level";
    }
    if (current === 2) {
      if (!formData.course.trim()) e.course = "Please enter what you're studying";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate(step)) return;
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!validate(3)) return;
    try {
      localStorage.setItem("vidyasetu-profile", JSON.stringify(formData));
    } catch { /* non-critical */ }
    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-4">
      <div className="bg-hero-grid absolute inset-0" />
      <div className="animate-blob absolute -top-20 -left-20 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl" />
      <div className="animate-blob absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl" style={{ animationDelay: "3s" }} />

      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-bold text-xl">VidyaSetu<span className="text-gradient"> AI</span></span>
        </div>

        <Card className="border-none shadow-2xl shadow-indigo-500/10">
          <CardHeader>
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                <Sparkles className="h-3 w-3" /> Step {step} of {totalSteps}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <span key={i} className={`h-2 rounded-full transition-all ${i < step ? "w-6 bg-gradient-to-r from-indigo-500 to-violet-500" : "w-2 bg-gray-200"}`} />
                ))}
              </div>
            </div>
            <CardTitle>
              {step === 1 && "Welcome! Let's meet."}
              {step === 2 && "What are you learning?"}
              {step === 3 && "How much time do you have?"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {step === 1 && "We'll personalize Vidya, your AI tutor, around you."}
              {step === 2 && "This becomes the seed of your knowledge base and learning path."}
              {step === 3 && "We'll size your daily lessons to fit your schedule."}
            </p>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">What is your name?</Label>
                  <Input
                    id="name"
                    placeholder="E.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={errors.name ? "border-red-400" : ""}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Education Level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["B.Tech 1st Year", "B.Tech 2nd Year", "B.Tech 3rd Year", "Other"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => update("educationLevel", level)}
                        className={`rounded-xl border px-3 py-2 text-sm transition ${
                          formData.educationLevel === level
                            ? "border-indigo-500 bg-indigo-50 font-medium text-indigo-700"
                            : "bg-white hover:border-indigo-300"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  {errors.educationLevel && <p className="text-xs text-red-500">{errors.educationLevel}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course">What are you studying right now?</Label>
                  <Input
                    id="course"
                    placeholder="E.g. Database Management Systems"
                    value={formData.course}
                    onChange={(e) => update("course", e.target.value)}
                    className={errors.course ? "border-red-400" : ""}
                  />
                  {errors.course && <p className="text-xs text-red-500">{errors.course}</p>}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["DBMS", "Operating Systems", "Data Structures", "Computer Networks"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update("course", s)}
                        className="rounded-full border bg-slate-50 px-3 py-1 text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-700"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam">When is your exam? (optional)</Label>
                  <Input
                    id="exam"
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => update("examDate", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Study time available per day</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update("availableTime", t)}
                        className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                          formData.availableTime === t
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "bg-white hover:border-indigo-300"
                        }`}
                      >
                        {t} {t === "4+" ? "hrs" : t === "1" ? "hr" : "hrs"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                  <p className="text-sm font-medium text-indigo-900">You&apos;re all set!</p>
                  <p className="mt-1 text-xs text-indigo-700">
                    We&apos;ll build a personalized path for <strong>{formData.course || "your course"}</strong> at{" "}
                    <strong>{formData.availableTime} hr/day</strong>
                    {formData.examDate ? `, targeting your exam on ${formData.examDate}` : ""}.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            ) : (
              <span />
            )}
            {step < totalSteps ? (
              <Button onClick={handleNext} className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600">
                <Check className="mr-1 h-4 w-4" /> Complete Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
