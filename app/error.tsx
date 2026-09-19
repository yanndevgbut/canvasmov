"use client";

import { useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              border: "1px solid rgba(220,38,38,0.3)",
              background: "rgba(220,38,38,0.1)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#dc2626",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Something went wrong
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: 16,
              color: "var(--text)",
            }}
          >
            An unexpected error occurred
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 36,
            }}
          >
            {error.message || "We encountered a temporary issue while processing your request."}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "var(--primary)",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.15s",
              }}
            >
              Try Again
            </button>
            <Link
              href="/"
              style={{
                padding: "12px 22px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                background: "transparent",
                textDecoration: "none",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
