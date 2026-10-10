"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tutor", label: "AI Tutor" },
  { href: "/quiz", label: "Quiz" },
  { href: "/flashcards", label: "Flashcards" },
];

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
        <GraduationCap className="h-5 w-5" />
      </span>
      <span className="font-bold text-xl tracking-tight">
        VidyaSetu<span className="text-gradient"> AI</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <Logo />
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/onboarding" className="ml-2">
            <Button size="sm" className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
              Get Started
            </Button>
          </Link>
        </nav>
        <button
          className="ml-auto rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-white px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                pathname === link.href ? "bg-indigo-50 text-indigo-700" : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/onboarding" onClick={() => setOpen(false)}>
            <Button size="sm" className="mt-2 w-full">Get Started</Button>
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row">
        <Logo />
        <p className="text-xs text-gray-500 sm:ml-4">© 2026 VidyaSetu AI. Education for everyone.</p>
        <nav className="flex gap-4 sm:ml-auto">
          <Link className="text-xs text-gray-500 hover:text-gray-900 hover:underline" href="/features">Features</Link>
          <Link className="text-xs text-gray-500 hover:text-gray-900 hover:underline" href="/ai-transparency">AI Transparency</Link>
          <Link className="text-xs text-gray-500 hover:text-gray-900 hover:underline" href="/privacy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
