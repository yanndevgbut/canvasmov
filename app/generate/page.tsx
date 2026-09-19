"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

type Ratio = "1:1" | "16:9" | "9:16";
type State = "idle" | "loading" | "success" | "error";

const ratios: { value: Ratio; label: string; desc: string }[] = [
  { value: "1:1", label: "1:1", desc: "Square" },
  { value: "16:9", label: "16:9", desc: "Landscape" },
  { value: "9:16", label: "9:16", desc: "Portrait" },
];

const MAX_CHARS = 500;

function GenerateContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") ?? "";

  const [prompt, setPrompt] = useState(initialPrompt);
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const [state, setState] = useState<State>("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollMsg, setPollMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 240)}px`;
  }, [prompt]);

  // Clean up interval timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const pollMessages = [
    "Sending your prompt…",
    "AI is thinking…",
    "Painting pixels…",
    "Adding details…",
    "Almost there…",
    "Finalizing the image…",
  ];

  async function handleGenerate() {
    if (!prompt.trim() || state === "loading") return;
    setState("loading");
    setImageUrl(null);
    setError(null);
    setPollMsg(pollMessages[0]);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Cycle through poll messages every 4s
    let msgIdx = 0;
    timerRef.current = setInterval(() => {
      msgIdx = Math.min(msgIdx + 1, pollMessages.length - 1);
      setPollMsg(pollMessages[msgIdx]);
    }, 4000);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), ratio }),
      });

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Unable to parse server response");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Generation failed");
      }

      const url = data.urls?.[0];
      if (!url) throw new Error("No image URL returned");

      setImageUrl(url);
      setState("success");

      // Scroll to result on mobile
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setState("error");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  }

  async function handleDownload() {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error("Failed to fetch image blob");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `moventra-canvas-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch {
      window.open(imageUrl, "_blank");
    }
  }

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main
        style={{
          flex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "32px 24px 64px",
        }}
      >
        {/* Page title */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            Generate Image
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
            Describe what you want to see. Press{" "}
            <kbd
              style={{
                padding: "1px 6px",
                borderRadius: 5,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                fontSize: 12,
                fontFamily: "monospace",
              }}
            >
              ⌘ Enter
            </kbd>{" "}
            or click the button to generate.
          </p>
        </div>

        {/* Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 360px) 1fr",
            gap: 20,
            alignItems: "start",
          }}
          className="generate-layout"
        >
          {/* ── SIDEBAR ── */}
          <aside
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              background: "var(--surface)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 20px 0" }}>
              <label
                htmlFor="prompt-input"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: 8,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                Prompt
              </label>
              <div className="prompt-box">
                <textarea
                  id="prompt-input"
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={handleKeyDown}
                  placeholder="A majestic eagle soaring above snow-capped mountains at dawn, golden hour lighting, photorealistic…"
                  rows={5}
                  aria-describedby="char-count"
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "transparent",
                    color: "var(--text)",
                    border: "none",
                    resize: "none",
                    fontSize: 14,
                    lineHeight: 1.6,
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    display: "block",
                    minHeight: 120,
                  }}
                />
                <div
                  id="char-count"
                  style={{
                    padding: "6px 14px 10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: prompt.length > MAX_CHARS * 0.85 ? "var(--cta)" : "var(--text-muted)",
                    }}
                  >
                    {prompt.length}/{MAX_CHARS}
                  </span>
                </div>
              </div>
            </div>

            {/* Ratio selector */}
            <div style={{ padding: "20px" }}>
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: 10,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  Aspect Ratio
                </legend>
                <div style={{ display: "flex", gap: 8 }}>
                  {ratios.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRatio(r.value)}
                      aria-pressed={ratio === r.value}
                      style={{
                        flex: 1,
                        padding: "10px 8px",
                        borderRadius: 8,
                        border: ratio === r.value
                          ? "1.5px solid var(--primary)"
                          : "1.5px solid var(--border)",
                        background: ratio === r.value ? "var(--primary-dim)" : "var(--bg)",
                        color: ratio === r.value ? "var(--primary)" : "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        transition: "all 0.15s",
                      }}
                    >
                      <RatioIcon value={r.value} active={ratio === r.value} />
                      <span>{r.label}</span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 400,
                          color: ratio === r.value ? "rgba(168,85,247,0.7)" : "var(--text-muted)",
                        }}
                      >
                        {r.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Generate button */}
            <div style={{ padding: "0 20px 20px" }}>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || state === "loading"}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: 10,
                  border: "none",
                  background: !prompt.trim() || state === "loading"
                    ? "var(--surface-2)"
                    : "var(--primary)",
                  color: !prompt.trim() || state === "loading"
                    ? "var(--text-muted)"
                    : "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: !prompt.trim() || state === "loading" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "background 0.15s",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                aria-busy={state === "loading"}
              >
                {state === "loading" ? (
                  <>
                    <svg
                      className="spinner"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707M18.364 5.636l-.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Generate
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* ── CANVAS ── */}
          <div ref={resultRef}>
            {/* Idle state */}
            {state === "idle" && (
              <div
                style={{
                  border: "2px dashed var(--border)",
                  borderRadius: 14,
                  minHeight: 480,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  padding: 32,
                  textAlign: "center",
                }}
                aria-label="Image canvas — empty"
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      margin: "0 0 4px",
                    }}
                  >
                    Your canvas is ready
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                    Enter a prompt and hit Generate
                  </p>
                </div>
              </div>
            )}

            {/* Loading state */}
            {state === "loading" && (
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  background: "var(--surface)",
                  minHeight: 480,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  padding: 32,
                }}
                role="status"
                aria-label="Generating image, please wait"
                aria-live="polite"
              >
                {/* Skeleton */}
                <div
                  className="skeleton"
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    height: 320,
                    borderRadius: 10,
                  }}
                  aria-hidden="true"
                />
                {/* Dots + message */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 6 }}
                    aria-hidden="true"
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`pulse-${i + 1}`}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "var(--primary)",
                          display: "block",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    {pollMsg}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    This usually takes 15–40 seconds
                  </p>
                </div>
              </div>
            )}

            {/* Error state */}
            {state === "error" && (
              <div
                style={{
                  border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: 14,
                  background: "rgba(220,38,38,0.06)",
                  minHeight: 480,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: 32,
                  textAlign: "center",
                }}
                role="alert"
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#dc2626",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#dc2626", margin: "0 0 6px" }}>
                    Generation failed
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 20px", maxWidth: 340 }}>
                    {error}
                  </p>
                  <button
                    onClick={handleGenerate}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--text)",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                    }}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Success state */}
            {state === "success" && imageUrl && (
              <div
                className="fade-up"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  background: "var(--surface)",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={`Generated image for prompt: ${prompt}`}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: "0",
                      maxHeight: 600,
                      objectFit: "contain",
                      background: "#000",
                    }}
                  />
                </div>

                {/* Actions */}
                <div
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      margin: 0,
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={prompt}
                  >
                    &ldquo;{prompt}&rdquo;
                  </p>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setPrompt("");
                        setImageUrl(null);
                        setState("idle");
                        textareaRef.current?.focus();
                      }}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "transparent",
                        color: "var(--text-secondary)",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "border-color 0.15s, color 0.15s",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      New
                    </button>
                    <button
                      onClick={handleDownload}
                      className="btn-primary"
                      style={{
                        padding: "8px 14px",
                        fontSize: 13,
                        borderRadius: 8,
                        boxShadow: "none",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 3v13M7 11l5 5 5-5M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .generate-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function RatioIcon({ value, active }: { value: Ratio; active: boolean }) {
  const color = active ? "var(--primary)" : "var(--text-muted)";
  if (value === "1:1") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  if (value === "16:9") {
    return (
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="20" height="12" rx="2" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="20" rx="2" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100dvh", background: "var(--bg)" }} />}>
      <GenerateContent />
    </Suspense>
  );
}
