import { SiteFooter, SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">
          <section>
            <h2 className="text-lg font-bold text-gray-900">1. What we collect</h2>
            <p className="mt-2">
              VidyaSetu AI collects the information you provide during onboarding (name, education level, course, exam date, study time), the documents you upload, and your learning activity (quiz answers, tutor conversations, flashcard progress).
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">2. How we use it</h2>
            <p className="mt-2">
              Your data is used solely to personalize your learning: generating your learning path, producing flashcards and quizzes from your material, grounding tutor answers in your documents, and tracking your mastery over time.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">3. AI processing</h2>
            <p className="mt-2">
              Portions of your documents and conversations are sent to the Google Gemini API for processing. We do not use your content to train our own models. See our <a className="text-indigo-600 underline" href="/ai-transparency">AI Transparency</a> page for how AI outputs are generated and constrained.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">4. Storage & security</h2>
            <p className="mt-2">
              Data is stored securely (Supabase PostgreSQL with row-level security where applicable). We never sell your personal data or share it with third parties for advertising.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">5. Your control</h2>
            <p className="mt-2">
              You can request deletion of your account and all associated learning data at any time. Documents you upload belong to you.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">6. Children&apos;s privacy</h2>
            <p className="mt-2">
              VidyaSetu is intended for students; we do not knowingly collect data from children under 13 without guardian consent.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">7. Demo mode</h2>
            <p className="mt-2">
              In demo mode (this deployment without database configuration), onboarding details stay in your browser&apos;s local storage and are never sent to any server beyond the AI API for chat responses.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
