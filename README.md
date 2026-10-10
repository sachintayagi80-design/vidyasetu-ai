# VidyaSetu AI

Turn any learning material into a personalized learning journey. VidyaSetu AI is an intelligent, personalized learning companion designed to help students who struggle with fragmented study resources, lack of personalized guidance, and uncertainty about what to learn next.

## Features

1. **Personalized Learning Path**: Generates a roadmap based on uploaded documents, time constraints, and exam dates.
2. **Document-to-Course RAG**: Upload your PDFs and PPTs, and VidyaSetu processes them into chunks, generating topics, flashcards, and quizzes directly from your material.
3. **AI Tutor with Source Grounding**: An interactive tutor ("Vidya") that answers questions based *only* on the provided sources. Distinguishes between grounded answers and general knowledge.
4. **Adaptive Assessment & Misconception Detection**: Don't just get a right/wrong result. VidyaSetu analyzes *why* you got it wrong and explains the misconception.
5. **Knowledge Map**: Visualize your strong areas and weak spots.

## Architecture

- **Frontend**: Next.js 14, React, Tailwind CSS, custom UI components.
- **Backend**: Next.js API Routes.
- **AI**: Gemini API for generative responses, explanation generation, and extraction.
- **Database & Auth**: Supabase (PostgreSQL). (Setup required)

## Setup Instructions

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file at the root of the project with your API keys:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run `npm run dev` to start the development server.
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Social Impact

VidyaSetu is designed to democratize access to personalized education, bringing high-quality adaptive tutoring to students from resource-constrained backgrounds who cannot afford private tutors. 

## Demo Experience

The application comes pre-loaded with a mock "DBMS Course" experience to showcase the adaptive learning roadmap and the tutor interaction for evaluation purposes.
