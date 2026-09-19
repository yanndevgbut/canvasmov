import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FaqAccordion from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Moventra Canvas — how it works, what to expect, and how to get the best results.",
};

export default function FaqPage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "72px 24px 96px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                FAQ
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                marginBottom: 14,
                textWrap: "balance",
              }}
            >
              Questions, answered.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: 500,
              }}
            >
              Everything you need to know about generating images with
              Moventra Canvas.
            </p>
          </div>

          {/* Accordion */}
          <FaqAccordion />

          {/* Still have questions */}
          <div
            style={{
              marginTop: 56,
              padding: "28px 28px 30px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--primary-dim)",
                border: "1px solid rgba(168,85,247,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: "var(--text)",
                }}
              >
                Still have questions?
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                }}
              >
                Can&apos;t find what you&apos;re looking for? Check out the
                About page for more context on how Moventra Canvas works, or
                just try the generator — it answers most questions on its own.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link
                  href="/about"
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--text-muted)";
                    el.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--text-secondary)";
                  }}
                >
                  Read About page
                </Link>
                <Link
                  href="/generate"
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: "var(--primary)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)";
                  }}
                >
                  Try the generator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
