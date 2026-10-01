"use client";
import Image from "next/image";
import { ReactNode, useState } from "react";


const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Hashidvr",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mohamed-hashed-6b820b2a6",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Hashidvr",
  },
];

const projects = [
  {
    title: "CorpDocs",
    description:
      "A document collaboration platform with document editing, version history, user mentions, access control, REST APIs, and email notifications.",
    image: "/projects/corpdocs.jpg",
    tags: ["Django REST", "React Native", "SQLite", "LLM"],
    github:
      "https://github.com/Hashidvr/CorpDocs-Platform",
  },
  {
    title: "Voice-Assisted Gesture-Based Drawing Tool",
    description:
      "An interactive Python application that combines hand gestures and voice commands to create a hands-free drawing experience.",
    image: "/projects/drawing-tool.jpg",
    tags: ["Python", "OpenCV", "MediaPipe", "Speech Recognition"],
    github:
      "https://github.com/Hashidvr/VOICE-ASSISTED-GESTURE-BASED-DRAWING-TOOL",
  },
  {
    title: "Student Management System",
    description:
      "A Flask and MySQL-based management system with authentication, role-based access control, CRUD operations, and database-driven workflows.",
    image: "/projects/student-management.jpg",
    tags: ["Flask", "MySQL", "SQL", "RBAC"],
    github:
      "https://github.com/Hashidvr/STUDENT-MANAGEMENT-SYSTEM",
  },
];

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [contactError, setContactError] = useState("");
  async function handleContactSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setContactStatus("sending");
    setContactError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to send your message."
        );
      }

      setContactStatus("success");
      form.reset();
    } catch (error) {
      setContactStatus("error");

      setContactError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* =================================================
          BACKGROUND
      ================================================= */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[35%] top-[-20%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[150px]" />

        <div className="absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* =================================================
          NAVBAR
      ================================================= */}
      <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a
          href="#"
          className="text-sm font-semibold tracking-[0.25em]"
        >
          HASHED
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a
            href="#about"
            className="transition-colors hover:text-white"
          >
            About
          </a>

          <a
            href="#experience"
            className="transition-colors hover:text-white"
          >
            Experience
          </a>

          <a
            href="#projects"
            className="transition-colors hover:text-white"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08] sm:block"
        >
          Resume ↗
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/[0.08] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6 6 18"
              />
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  d="M4 7h16"
                />
                <path
                  strokeLinecap="round"
                  d="M4 12h16"
                />
                <path
                  strokeLinecap="round"
                  d="M4 17h16"
                />
              </>
            )}
          </svg>
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="border-t border-white/[0.06] bg-[#07070a]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              About
            </a>

            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              Experience
            </a>

            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              Projects
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setResumeOpen(true);
              }}
              className="mt-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-left text-sm font-medium text-violet-300 transition hover:bg-violet-500/15"
            >
              Resume
            </button>
          </div>
        </div>
      )}
      {/* =================================================
          HERO
      ================================================= */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-12 lg:px-10 lg:pb-32 lg:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">

          {/* =================================================
              LEFT — PROFILE + INTRO
          ================================================= */}
          <div>
            {/* Profile */}
            <div className="mb-10 flex min-w-0 flex-row items-center gap-4 sm:gap-6">

              {/* Profile Image */}
              <div className="relative h-[180px] w-[165px] shrink-0 sm:h-[250px] sm:w-[230px]">

                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-3xl" />

                {/* Outer frame */}
                <div className="relative h-full w-full overflow-hidden rounded-full border border-white/15 bg-[#11131b] p-1.5 shadow-2xl shadow-violet-950/30">

                  {/* Image */}
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/profile.png"
                      alt="Mohamed Hashed"
                      fill
                      priority
                      className="object-cover object-[50%_20%]"
                    />
                  </div>
                </div>

                {/* Online indicator */}
                <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#07070a] bg-emerald-400 sm:bottom-5 sm:right-5 lg:bottom-4 lg:right-7">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-950" />
                </div>
              </div>

              {/* Name / Role */}
              <div className="min-w-0">
                <p className="whitespace-nowrap text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  Mohamed Hashed V R
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Software Engineer
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-violet-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Backend · AI
                </div>
              </div>
            </div>

            {/* Small label */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-violet-400/60" />

              <span className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
                Software Engineer · Backend + AI
              </span>
            </div>

            {/* Main heading */}
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Hi, I’m{" "}
              <span className="text-zinc-500">
                Mohamed Hashed.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              I build backend systems, APIs, and software powered by AI.
              I enjoy turning ideas into reliable systems and learning how
              the technology behind them actually works.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-3">
              {/* View my work */}
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black shadow-lg shadow-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M3 7.5 12 3l9 4.5-9 4.5L3 7.5Z" />
                  <path d="m3 12 9 4.5 9-4.5" />
                  <path d="m3 16.5 9 4.5 9-4.5" />
                </svg>

                View my work
              </a>

              {/* Get in touch */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-400/[0.08] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                Get in touch
              </a>

              {/* Download Resume */}
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-5 py-3 text-sm font-medium text-violet-100 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/[0.14] hover:text-white hover:shadow-lg hover:shadow-violet-500/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>

                Download Resume
              </button>
            </div>

            {/* Socials */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/[0.05] hover:text-white"
                >
                  {social.name === "GitHub" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.15c.85 0 1.7.12 2.5.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
                    </svg>
                  )}

                  {social.name === "LinkedIn" && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h- w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V8.98h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.28ZM5.33 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.55 20.45h3.56V8.98H3.55v11.47Z"
                      />
                    </svg>
                  )}

                  {social.name === "LeetCode" && (
                    <span className="text-sm font-bold leading-none">LC</span>
                  )}

                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT — CODE EDITOR + TECH BADGES
          ================================================= */}
          <div className="relative mx-auto w-full max-w-[680px]">

            <div className="relative mt-8 h-[430px] w-full">

              {/* Main glow */}
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[110px]" />

              {/* =================================================
                  CODE EDITOR
              ================================================= */}
              <div className="code-editor absolute left-1/2 top-1/2 z-10 w-[84%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0d111c]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">

                {/* Editor header */}
                <div className="flex h-12 items-center border-b border-white/[0.06] px-5">

                  {/* Window buttons */}
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  {/* File name */}
                  <div className="ml-5 text-xs text-zinc-600">
                    portfolio.tsx
                  </div>
                </div>

                {/* Code */}
                <div className="px-4 py-6 font-mono text-xs leading-7 sm:px-6 sm:py-7 sm:text-sm sm:leading-8">

                  <CodeLine number="1">
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-blue-300">
                      developer
                    </span>{" "}
                    <span className="text-zinc-500">
                      =
                    </span>{" "}
                    <span className="text-zinc-300">
                      {"{"}
                    </span>
                  </CodeLine>

                  <CodeLine number="2">
                    <span className="text-blue-300">
                      name
                    </span>

                    <span className="text-zinc-500">
                      :
                    </span>{" "}

                    <span className="text-emerald-300">
                      &quot;Mohamed Hashed&quot;
                    </span>

                    <span className="text-zinc-500">
                      ,
                    </span>
                  </CodeLine>

                  <CodeLine number="3">
                    <span className="text-blue-300">
                      role
                    </span>

                    <span className="text-zinc-500">
                      :
                    </span>{" "}

                    <span className="text-emerald-300">
                      &quot;Software Engineer&quot;
                    </span>

                    <span className="text-zinc-500">
                      ,
                    </span>
                  </CodeLine>

                  <CodeLine number="4">
                    <span className="text-blue-300">
                      stack
                    </span>

                    <span className="text-zinc-500">
                      :
                    </span>{" "}

                    <span className="text-zinc-300">
                      [Python, Django]
                    </span>

                    <span className="text-zinc-500">
                      ,
                    </span>
                  </CodeLine>

                  <CodeLine number="5">
                    <span className="text-blue-300">
                      focus
                    </span>

                    <span className="text-zinc-500">
                      :
                    </span>{" "}

                    <span className="text-emerald-300">
                      &quot;Backend + AI&quot;
                    </span>

                    <span className="text-zinc-500">
                      ,
                    </span>
                  </CodeLine>

                  <CodeLine number="6">
                    <span className="text-blue-300">
                      build
                    </span>

                    <span className="text-zinc-500">
                      :
                    </span>{" "}

                    <span className="text-emerald-300">
                      &quot;APIs + Intelligent Systems&quot;
                    </span>

                    <span className="text-zinc-500">
                      ,
                    </span>
                  </CodeLine>

                  <CodeLine number="7">
                    <span className="text-blue-300">
                      status
                    </span>

                    <span className="text-zinc-500">
                      :
                    </span>{" "}

                    <span className="text-emerald-300">
                      &quot;Open for Opportunities&quot;
                    </span>

                    <span className="text-zinc-500">
                      ,
                    </span>
                  </CodeLine>

                  <CodeLine number="8">
                    <span className="text-zinc-300">
                      {"}"}
                    </span>
                  </CodeLine>
                </div>
              </div>

              {/* =================================================
                  FLOATING BADGES
              ================================================= */}

              {/* AI / ML */}
              <div className="tech-badge ai-badge absolute left-[2%] top-[30%] z-20 flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/[0.05] px-4 py-2.5 text-xs font-semibold text-violet-300 backdrop-blur-xl sm:left-0 sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                AI / ML
              </div>

              {/* Python */}
              <div className="tech-badge python-badge absolute right-[2%] top-[18%] z-20 flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.05] px-4 py-2.5 text-xs font-semibold text-yellow-300 backdrop-blur-xl sm:right-0 sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                Python
              </div>

              {/* Django */}
              <div className="tech-badge django-badge absolute bottom-[13%] left-[8%] z-20 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-2.5 text-xs font-semibold text-emerald-300 backdrop-blur-xl sm:left-[10%] sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                Django
              </div>

              {/* REST APIs */}
              <div className="tech-badge rest-badge absolute bottom-[4%] right-[7%] z-20 flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-2.5 text-xs font-semibold text-cyan-300 backdrop-blur-xl sm:right-[10%] sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                REST APIs
              </div>

              {/* SQL */}
              <div className="tech-badge sql-badge absolute right-[18%] top-[5%] z-20 flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-400/[0.05] px-4 py-2.5 text-xs font-semibold text-blue-300 backdrop-blur-xl sm:right-[20%] sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                SQL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          WHAT I BUILD
      ================================================= */}
      <section
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10"
      >
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              What I build
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Backend systems with an AI mindset.
            </h2>
          </div>

          <div className="hidden text-xs uppercase tracking-[0.2em] text-zinc-600 sm:block">
            01 — 03
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">

          {/* =================================================
              BACKEND
          ================================================= */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.04]">

            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.06] text-violet-300">
              <span className="font-mono text-sm">
                {"</>"}
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              01
            </p>

            <h3 className="mt-3 text-xl font-medium text-white">
              Backend Systems
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              APIs, services, databases, and reliable backend systems
              built with Python and Django.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                Python
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                Django
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                REST
              </span>
            </div>
          </div>

          {/* =================================================
              AI
          ================================================= */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]">

            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/[0.06] text-blue-300">
              <span className="font-mono text-sm">
                AI
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              02
            </p>

            <h3 className="mt-3 text-xl font-medium text-white">
              AI-Powered Products
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Connecting AI capabilities with real software to create
              useful, intelligent experiences.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                AI / ML
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                APIs
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                Python
              </span>
            </div>
          </div>

          {/* =================================================
              ALWAYS BUILDING
          ================================================= */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.04]">

            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300">
              <span className="font-mono text-sm">
                ⌁
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              03
            </p>

            <h3 className="mt-3 text-xl font-medium text-white">
              Always Building
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Exploring new ideas, learning how systems work, and turning
              what I learn into things I can build.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                Learn
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                Build
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                Iterate
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* =================================================
          TECH I WORK WITH
      ================================================= */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-8 backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Heading */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
                Tech I work with
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Tools I use to build backend systems and explore AI.
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-yellow-400/15 bg-yellow-400/[0.04] px-4 py-2 text-sm text-yellow-300">
                Python
              </span>

              <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2 text-sm text-emerald-300">
                Django
              </span>

              <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.04] px-4 py-2 text-sm text-cyan-300">
                Django REST
              </span>

              <span className="rounded-full border border-blue-400/15 bg-blue-400/[0.04] px-4 py-2 text-sm text-blue-300">
                SQL
              </span>

              <span className="rounded-full border border-violet-400/15 bg-violet-400/[0.04] px-4 py-2 text-sm text-violet-300">
                AI / ML
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
                REST APIs
              </span>
            </div>
          </div>
        </div>
      </section>




      {/* =================================================
    ABOUT ME
================================================= */}
      <section
        id="about"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-10"
      >
        {/* =================================================
      INTRO
  ================================================= */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-violet-400" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              About me
            </p>
          </div>

          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Building software that
            <br />
            <span className="text-zinc-500">
              solves real problems.
            </span>
          </h2>

          <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-500 sm:text-lg">
            I&apos;m a software engineer with a background in Artificial
            Intelligence and Machine Learning. I enjoy working at the
            intersection of backend engineering and AI — building APIs,
            backend systems, and exploring how intelligent technologies can
            become useful software.
          </p>
        </div>

        {/* =================================================
      WHO I AM + EDUCATION
  ================================================= */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

          {/* =================================================
        WHO I AM
    ================================================= */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-xl sm:p-9">
            <h3 className="text-2xl font-semibold text-white">
              Who I Am
            </h3>

            {/* Background */}
            <div className="mt-8">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" />

                <div>
                  <p className="text-sm font-medium text-violet-300">
                    Background
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    I completed my B.E. in Artificial Intelligence and
                    Machine Learning and gradually found myself drawn
                    towards backend development, APIs, databases, and
                    software systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Passion */}
            <div className="mt-7">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />

                <div>
                  <p className="text-sm font-medium text-blue-300">
                    Passion
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    I enjoy building backend systems and APIs, while also
                    exploring AI-powered products and finding ways to
                    connect AI with real software.
                  </p>
                </div>
              </div>
            </div>

            {/* Approach */}
            <div className="mt-7">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />

                <div>
                  <p className="text-sm font-medium text-emerald-300">
                    Approach
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    I like learning by building. Instead of only learning
                    how to use a technology, I try to understand what is
                    happening underneath and turn that understanding into
                    something practical.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal */}
            <div className="mt-7">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />

                <div>
                  <p className="text-sm font-medium text-yellow-300">
                    Outside the code
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    I&apos;m from Thrissur, Kerala, and currently in
                    Bengaluru. I enjoy exploring new ideas, learning new
                    technologies, and continuously improving through the
                    things I build.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
        RIGHT COLUMN
    ================================================= */}
          <div className="space-y-6">

            {/* Education */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Education
                  </p>

                  <h3 className="mt-4 text-xl font-semibold text-white">
                    B.E. in Artificial Intelligence & Machine Learning
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    South East Asian College of Engineering and Technology
                  </p>

                  <p className="mt-2 text-xs text-zinc-600">
                    Bengaluru, Karnataka · 2021 — 2025
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.06] text-violet-300">
                  <span className="text-lg">✦</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500">
                  AI & ML
                </span>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500">
                  Software Engineering
                </span>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500">
                  Backend Development
                </span>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Quick facts
              </p>

              <div className="mt-6 divide-y divide-white/[0.06]">

                {/* Home */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-zinc-500">
                    Home
                  </span>

                  <span className="text-sm text-zinc-300">
                    Thrissur, Kerala
                  </span>
                </div>

                {/* Current location */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-zinc-500">
                    Currently
                  </span>

                  <span className="text-sm text-zinc-300">
                    Bengaluru, Karnataka
                  </span>
                </div>

                {/* CGPA */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-zinc-500">
                    CGPA
                  </span>

                  <span className="text-sm font-medium text-white">
                    8.19 / 10
                  </span>
                </div>

                {/* Result */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-zinc-500">
                    Result
                  </span>

                  <span className="text-sm text-emerald-300">
                    First Class with Distinction
                  </span>
                </div>

                {/* Focus */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-zinc-500">
                    Focus
                  </span>

                  <span className="text-sm text-zinc-300">
                    Backend + AI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
      THE ROAD SO FAR
  ================================================= */}
        <div className="mt-24">

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-violet-400" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              Learning journey
            </p>
          </div>

          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The road so far
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
            A few milestones that have shaped my journey into software
            engineering.
          </p>

          {/* Timeline */}
          <div className="relative mt-12 ml-3 border-l border-white/[0.08] pl-8">

            {/* 2021 */}
            <div className="relative pb-10">
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#07070a] bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.5)]" />

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1 text-xs font-medium text-violet-300">
                    2021
                  </span>

                  <h4 className="text-base font-semibold text-white">
                    Started My Engineering Journey
                  </h4>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  Started my B.E. in Artificial Intelligence and Machine
                  Learning, building my foundations in programming,
                  problem-solving, and computer science.
                </p>
              </div>
            </div>

            {/* 2024 */}
            <div className="relative pb-10">
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#07070a] bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]" />

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.06] px-3 py-1 text-xs font-medium text-blue-300">
                    2024
                  </span>

                  <h4 className="text-base font-semibold text-white">
                    Best Base Paper Award
                  </h4>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  Received the Best Base Paper Award at the National
                  Conference — Pravarthana.
                </p>
              </div>
            </div>

            {/* 2025 — Internship */}
            <div className="relative pb-10">
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#07070a] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-xs font-medium text-emerald-300">
                    2025
                  </span>

                  <h4 className="text-base font-semibold text-white">
                    Backend Development Experience
                  </h4>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  Worked as a Python Full Stack Intern at JSpiders, gaining
                  hands-on experience with Python, Django, Django REST
                  Framework, REST APIs, SQL, testing, debugging, and Agile
                  development.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    Python
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    Django
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    REST APIs
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    SQL
                  </span>
                </div>
              </div>
            </div>

            {/* 2025 — Graduation */}
            <div className="relative pb-10">
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#07070a] bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.5)]" />

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1 text-xs font-medium text-violet-300">
                    2025
                  </span>

                  <h4 className="text-base font-semibold text-white">
                    Graduated With Distinction
                  </h4>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  Completed my B.E. in Artificial Intelligence and Machine
                  Learning with a CGPA of 8.19/10 and First Class with
                  Distinction.
                </p>
              </div>
            </div>

            {/* Future — AI Leverage */}
            <div className="relative">
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#07070a] bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.7)]" />

              <div className="rounded-2xl border border-violet-400/15 bg-violet-400/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:border-violet-400/25 hover:bg-violet-400/[0.04]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1 text-xs font-medium text-violet-300">
                    Future
                  </span>

                  <h4 className="text-base font-semibold text-white">
                    AI Leverage
                  </h4>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  Learning how to leverage AI effectively with my backend
                  engineering skills, with a focus on building smarter systems,
                  AI-powered products, and software that can solve real-world
                  problems.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    AI
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    Backend
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    AI Systems
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500">
                    Continuous Learning
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Experience */}
      <section
        id="experience"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 lg:px-10"
      >
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-violet-400" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              Experience
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Where I&apos;ve worked and what I&apos;ve learned.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
            Experiences that have shaped the way I approach software,
            backend systems, startups, and creative work.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-5">

          {/* JSpiders */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:border-violet-400/20 hover:bg-white/[0.04] sm:p-8">

            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/[0.04] blur-3xl transition duration-500 group-hover:bg-violet-500/[0.08]" />

            <div className="relative grid gap-8 lg:grid-cols-[180px_1fr]">

              {/* Meta */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                  01
                </p>

                <p className="mt-4 text-sm text-zinc-500">
                  Jan 2025 — May 2025
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-700">
                  Internship
                </p>
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-white sm:text-2xl">
                      Python Full Stack Intern
                    </h3>

                    <p className="mt-2 text-sm text-violet-300">
                      JSpiders
                    </p>
                  </div>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1 text-xs text-emerald-300">
                    Software Engineering
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-500">
                  Gained hands-on experience in backend and full-stack
                  development using Python, Django, Django REST Framework,
                  REST APIs, and SQL. Worked with testing, debugging,
                  Postman, and Agile development practices.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-yellow-400/15 bg-yellow-400/[0.04] px-3 py-1.5 text-xs text-yellow-300">
                    Python
                  </span>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-1.5 text-xs text-emerald-300">
                    Django
                  </span>

                  <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.04] px-3 py-1.5 text-xs text-cyan-300">
                    Django REST
                  </span>

                  <span className="rounded-full border border-blue-400/15 bg-blue-400/[0.04] px-3 py-1.5 text-xs text-blue-300">
                    REST APIs
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    SQL
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Postman
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Testing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VisionAstraa */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl transition duration-300 hover:border-blue-400/20 hover:bg-white/[0.04] sm:p-8">

            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/[0.035] blur-3xl transition duration-500 group-hover:bg-blue-500/[0.07]" />

            <div className="relative grid gap-8 lg:grid-cols-[180px_1fr]">

              {/* Meta */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
                  02
                </p>

                <p className="mt-4 text-sm text-zinc-500">
                  Jun 2024 — Oct 2024
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-700">
                  Startup Experience
                </p>
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-white sm:text-2xl">
                      Digital Marketing Member
                    </h3>

                    <p className="mt-2 text-sm text-blue-300">
                      VisionAstraa Startup Academy
                    </p>
                  </div>

                  <span className="rounded-full border border-blue-400/15 bg-blue-400/[0.05] px-3 py-1 text-xs text-blue-300">
                    Creative &amp; Marketing
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-500">
                  Worked on content creation and visual communication,
                  creating posters, promotional content, and promotional
                  videos. Used Canva and Figma to create visual assets
                  for startup-related initiatives.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Content Creation
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Canva
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Figma
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Poster Design
                  </span>

                  <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                    Promotional Videos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Technical Skills */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                  Technical Skills
                </p>

                <h3 className="mt-3 text-xl font-medium text-white">
                  What I work with
                </h3>
              </div>

              <span className="hidden rounded-full border border-violet-400/15 bg-violet-400/[0.04] px-3 py-1 text-xs text-violet-300 sm:block">
                Backend + AI
              </span>
            </div>

            <div className="mt-8 space-y-6">

              {/* Backend Development */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    Backend Development
                  </span>

                  <span className="text-xs text-zinc-600">
                    Core Focus
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-violet-500 to-blue-400" />
                </div>
              </div>

              {/* API Development */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    API Development
                  </span>

                  <span className="text-xs text-zinc-600">
                    Core Focus
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-violet-500 to-blue-400" />
                </div>
              </div>

              {/* AI / ML */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    AI / Machine Learning
                  </span>

                  <span className="text-xs text-zinc-600">
                    Exploring
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-violet-500 to-blue-400" />
                </div>
              </div>

              {/* Database & SQL */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    Databases &amp; SQL
                  </span>

                  <span className="text-xs text-zinc-600">
                    Working With
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-blue-400" />
                </div>
              </div>

            </div>
          </div>

          {/* Core Technologies */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
              Core Technologies
            </p>

            <h3 className="mt-3 text-xl font-medium text-white">
              Technologies I use
            </h3>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-xl border border-yellow-400/15 bg-yellow-400/[0.04] px-4 py-2.5 text-sm text-yellow-300">
                Python
              </span>

              <span className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2.5 text-sm text-emerald-300">
                Django
              </span>

              <span className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] px-4 py-2.5 text-sm text-cyan-300">
                Django REST
              </span>

              <span className="rounded-xl border border-blue-400/15 bg-blue-400/[0.04] px-4 py-2.5 text-sm text-blue-300">
                REST APIs
              </span>

              <span className="rounded-xl border border-blue-400/15 bg-blue-400/[0.04] px-4 py-2.5 text-sm text-blue-300">
                SQL
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
                MySQL
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
                SQLite
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
                Git
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
                GitHub
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
                Postman
              </span>

              <span className="rounded-xl border border-violet-400/15 bg-violet-400/[0.04] px-4 py-2.5 text-sm text-violet-300">
                AI / ML
              </span>

            </div>
          </div>
        </div>

        {/* Development Practices + AI Assisted Development */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* Development Practices */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8">

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
              Development Practices
            </p>

            <h3 className="mt-3 text-xl font-medium text-white">
              How I build
            </h3>

            <div className="mt-7 flex flex-wrap gap-3">

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                CRUD
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                JWT Authentication
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                API Design
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                SDLC
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                Agile
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                Testing
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                Debugging
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
                Database Design
              </span>

            </div>
          </div>

          {/* AI Assisted Development */}
          <div className="rounded-3xl border border-violet-400/10 bg-violet-400/[0.025] p-6 backdrop-blur-xl sm:p-8">

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
              AI-Assisted Development
            </p>

            <h3 className="mt-3 text-xl font-medium text-white">
              AI as a development partner
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Using AI tools to support development, explore solutions,
              debug problems, and accelerate the building process.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <span className="rounded-xl border border-violet-400/15 bg-violet-400/[0.04] px-4 py-2.5 text-sm text-violet-300">
                ChatGPT
              </span>

              <span className="rounded-xl border border-blue-400/15 bg-blue-400/[0.04] px-4 py-2.5 text-sm text-blue-300">
                Claude
              </span>

              <span className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] px-4 py-2.5 text-sm text-cyan-300">
                DeepSeek
              </span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
                AI-Assisted Coding
              </span>

            </div>
          </div>
        </div>

        {/* Current Learning Focus */}
        <div className="mt-5 rounded-3xl border border-violet-400/10 bg-violet-400/[0.025] p-6 backdrop-blur-xl sm:p-8">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                Current Learning Focus
              </p>

              <h3 className="mt-3 text-xl font-medium text-white">
                Going deeper into AI + backend systems.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                Exploring how AI can be integrated with backend systems
                to build practical, intelligent software.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">

              <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                AI Systems
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                Machine Learning
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                AI APIs
              </span>

              <span className="rounded-full border border-white/[0.07] px-3 py-1.5 text-xs text-zinc-400">
                Backend Architecture
              </span>

            </div>
          </div>
        </div>


        {/* Computer Science Fundamentals */}
        <div className="mt-5 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8">

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-300">
            Computer Science Fundamentals
          </p>

          <h3 className="mt-3 text-xl font-medium text-white">
            Foundations I work with
          </h3>

          <div className="mt-7 flex flex-wrap gap-3">

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
              Data Structures &amp; Algorithms
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
              OOP
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
              Operating Systems
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
              DBMS
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
              Computer Networks
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300">
              Problem Solving
            </span>

          </div>
        </div>

        { }
        <div className="relative mt-8 ml-4 border-l border-dashed border-white/[0.08] pl-8">

          <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-violet-400/40 bg-[#07070a]" />

          <div className="py-2">

            <p className="text-sm font-medium text-zinc-400">
              More chapters ahead
            </p>

            <p className="mt-2 text-xs leading-6 text-zinc-600">
              Continuing to learn, build, and grow through new experiences.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-full border border-white/[0.06] px-3 py-1 text-xs text-zinc-600">
                Learning
              </span>

              <span className="rounded-full border border-white/[0.06] px-3 py-1 text-xs text-zinc-600">
                Building
              </span>

              <span className="rounded-full border border-white/[0.06] px-3 py-1 text-xs text-zinc-600">
                Growing
              </span>

            </div>
          </div>
        </div>
      </section>


      {/* =================================================
    PROJECTS
================================================= */}
      <section
        id="projects"
        className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10"
      >
        {/* Section heading */}
        <div className="mb-14 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-violet-400" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              Selected work
            </p>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Projects I&apos;ve{" "}
            <span className="text-violet-400">built</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-500">
            A collection of projects where I&apos;ve worked with backend
            systems, APIs, databases, computer vision, and AI-powered
            technologies.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.035]"
            >
              {/* Project image */}
              <div className="relative h-64 overflow-hidden bg-zinc-900 sm:h-72">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d111c] via-transparent to-transparent opacity-80" />

                {/* Project number */}
                <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Project content */}
              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-violet-400/15 bg-violet-400/[0.04] px-3 py-1.5 text-xs font-medium text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {/* GitHub */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/github flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                    </svg>

                    <span>GitHub</span>

                    <span className="transition-transform duration-300 group-hover/github:translate-x-0.5">
                      ↗
                    </span>
                  </a>

                  {/* Live Demo - inactive for now */}
                  <button
                    type="button"
                    disabled
                    className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3 text-sm font-medium text-zinc-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3h7v7"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 14 21 3"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
                      />
                    </svg>

                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =================================================
          CONTACT
      ================================================= */}
      <section
        id="contact"
        className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-4 pb-24 sm:px-6 lg:px-10"
      >
        {/* Section heading */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-violet-400" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              Contact
            </p>
          </div>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let&apos;s build something
            <span className="text-zinc-500"> useful.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            Have a project, opportunity, or simply want to connect?
            Feel free to reach out. I&apos;d be happy to hear from you.
          </p>
        </div>


        {/* Contact layout */}
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

          {/* =================================================
              LEFT — CONTACT DETAILS
          ================================================= */}
          <div className="space-y-4">

            {/* =================================================
            EMAIL
            ================================================= */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mohammedhashid10@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.06] text-blue-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path
                    d="M4 6.5h16v11H4v-11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m4.5 7 7.5 6 7.5-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Email
                </p>

                <p className="mt-2 truncate text-sm text-zinc-300 transition-colors group-hover:text-white">
                  mohammedhashid10@gmail.com
                </p>
              </div>

              <span className="text-lg text-zinc-600 transition-colors group-hover:text-blue-300">
                ↗
              </span>
            </a>


            {/* =================================================
            PHONE
            ================================================= */}
            <a
              href="tel:+918714020878"
              className="group flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] text-violet-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path
                    d="M6.7 3.5h2.1c.45 0 .84.3.96.73l.76 2.7c.1.35 0 .73-.26.99L8.9 9.28a13.3 13.3 0 0 0 5.82 5.82l1.36-1.36c.26-.26.64-.36.99-.26l2.7.76c.43.12.73.51.73.96v2.1c0 .55-.45 1-1 1C11.48 18.3 5.7 12.52 5.7 5.5c0-.55.45-1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Phone
                </p>

                <p className="mt-2 text-sm text-zinc-300 transition-colors group-hover:text-white">
                  +91 8714020878
                </p>
              </div>

              <span className="text-lg text-zinc-600 transition-colors group-hover:text-violet-300">
                ↗
              </span>
            </a>


            {/* =================================================
            LINKEDIN
            ================================================= */}
            <a
              href="https://linkedin.com/in/mohamed-hashed-6b820b2a6"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.06] text-blue-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path d="M5.2 8.2H2.8V21h2.4V8.2ZM4 3C3.17 3 2.5 3.67 2.5 4.5S3.17 6 4 6s1.5-.67 1.5-1.5S4.83 3 4 3ZM8.1 8.2H10.4v1.75h.03c.32-.61 1.1-1.98 3.5-1.98 3.75 0 4.44 2.47 4.44 5.68V21h-2.4v-6.51c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V21H8.1V8.2Z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  LinkedIn
                </p>

                <p className="mt-2 truncate text-sm text-zinc-300 transition-colors group-hover:text-white">
                  linkedin.com/in/mohamed-hashed-6b820b2a6
                </p>
              </div>

              <span className="text-lg text-zinc-600 transition-colors group-hover:text-blue-300">
                ↗
              </span>
            </a>


            {/* =================================================
            GITHUB
              ================================================= */}
            <a
              href="https://github.com/Hashidvr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-zinc-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-zinc-400/20 bg-zinc-400/[0.06] text-zinc-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.15c.85 0 1.7.12 2.5.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  GitHub
                </p>

                <p className="mt-2 text-sm text-zinc-300 transition-colors group-hover:text-white">
                  github.com/Hashidvr
                </p>
              </div>

              <span className="text-lg text-zinc-600 transition-colors group-hover:text-zinc-300">
                ↗
              </span>
            </a>


            {/* =================================================
            WHATSAPP
            ================================================= */}
            <a
              href="https://wa.me/918714020878"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path
                    d="M20.1 11.5a8.1 8.1 0 0 1-12.05 7.06L4 20l1.42-3.91A8.1 8.1 0 1 1 20.1 11.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M8.4 8.35c.16-.35.34-.36.62-.36h.39c.13 0 .27.04.36.27l.55 1.34c.07.16.05.3-.04.42l-.39.5c-.09.11-.18.18-.07.38.11.2.49.83 1.05 1.34.73.66 1.35.87 1.55.96.2.09.32.07.44-.06l.53-.62c.13-.15.25-.12.42-.06l1.3.61c.18.09.31.13.36.2.05.08.05.45-.11.87-.15.42-.84.8-1.16.85-.3.05-.66.06-1.07-.06-.25-.08-.57-.18-.98-.37-.41-.18-2.33-1.08-3.36-3.34-.18-.39-.31-.7-.4-.95-.09-.25-.09-.46-.06-.64.03-.18.11-.37.2-.58Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  WhatsApp
                </p>

                <p className="mt-2 text-sm text-zinc-300 transition-colors group-hover:text-white">
                  +91 8714020878
                </p>
              </div>

              <span className="text-lg text-zinc-600 transition-colors group-hover:text-emerald-300">
                ↗
              </span>
            </a>


            {/* =================================================
            AVAILABILITY
            ================================================= */}
            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.08] to-violet-500/[0.06] p-6">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                <p className="text-sm font-medium text-cyan-300">
                  Open to opportunities
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-500">
                Currently open to software engineering roles, internships,
                and opportunities to work on backend systems and AI-powered
                software.
              </p>
            </div>

          </div>


          {/* =================================================
              RIGHT — MESSAGE FORM
          ================================================= */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

            {/* Subtle background glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/[0.05] blur-3xl" />

            <div className="relative z-10">

              {/* Header */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-violet-400" />

                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
                    Get in touch
                  </p>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Send a message
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-500">
                  Have an opportunity, project, or just want to say hello?
                  Drop me a message and I’ll get back to you.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5">

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div className="group">
                    <label
                      htmlFor="name"
                      className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-zinc-500"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-700 hover:border-white/[0.12] focus:border-violet-400/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-400/[0.05]"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email"
                      className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-zinc-500"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-700 hover:border-white/[0.12] focus:border-violet-400/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-400/[0.05]"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-zinc-500"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-700 hover:border-white/[0.12] focus:border-violet-400/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-400/[0.05]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-xs font-medium uppercase tracking-[0.12em] text-zinc-500"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me a little about your message..."
                    className="w-full resize-none rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5 text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-zinc-700 hover:border-white/[0.12] focus:border-violet-400/40 focus:bg-white/[0.035] focus:ring-4 focus:ring-violet-400/[0.05]"
                  />
                </div>

                {/* Status */}
                {contactStatus === "success" && (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3.5 text-sm text-emerald-300">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10 text-xs">
                      ✓
                    </span>

                    <span>
                      Message sent successfully. I’ll get back to you soon.
                    </span>
                  </div>
                )}

                {contactStatus === "error" && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3.5 text-sm text-red-300">
                    {contactError}
                  </div>
                )}

                {/* Send button */}
                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/90 to-indigo-500/90 px-5 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/30 hover:shadow-xl hover:shadow-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >

                  {/* Hover shine */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    {contactStatus === "sending"
                      ? "Sending..."
                      : "Send Message"}
                  </span>

                  {contactStatus !== "sending" && (
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M22 2 11 13"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m22 2-7 20-4-9-9-4 20-7Z"
                        />
                      </svg>
                    </span>
                  )}

                </button>

                <p className="pt-1 text-center text-xs text-zinc-600">
                  Your message will be sent directly to my inbox.
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

            {/* Footer identity */}
            <div>
              <p className="text-sm font-semibold tracking-[0.25em]">
                HASHED
              </p>

              <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
                Software Engineer focused on backend systems, APIs, and
                AI-powered software.
              </p>

              <p className="mt-6 text-xs text-zinc-700">
                © {new Date().getFullYear()} Mohamed Hashed V R
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-5 md:items-end">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                Find me online
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-10 flex items-center justify-between border-t border-white/[0.05] pt-5">
            <span className="text-xs text-zinc-700">
              Backend · AI · Building
            </span>

            <a
              href="#"
              className="text-xs text-zinc-600 transition-colors hover:text-white"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>


      {resumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Mohamed Hashed V R
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Resume
                </p>
              </div>

              <button
                type="button"
                onClick={() => setResumeOpen(false)}
                aria-label="Close resume preview"
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* PDF Preview */}
            <div className="min-h-0 flex-1 bg-zinc-900">
              <iframe
                src="/Mohamed-Hashed-Resume.pdf"
                title="Mohamed Hashed Resume"
                className="h-full w-full"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-zinc-950 px-5 py-4">
              <p className="hidden text-xs text-zinc-500 sm:block">
                Previewing my resume
              </p>

              <div className="ml-auto flex gap-3">
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
                >
                  Close
                </button>

                <a
                  href="/Mohamed-Hashed-Resume.pdf"
                  download="Mohamed-Hashed-Resume.pdf"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                >
                  Download ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =================================================
    CODE LINE COMPONENT
================================================= */

function CodeLine({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="flex">
      <span className="mr-6 w-5 select-none text-right text-xs text-zinc-700">
        {number}
      </span>

      <div>{children}</div>
    </div>
  );
}