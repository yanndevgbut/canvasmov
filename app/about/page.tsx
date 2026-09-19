import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Moventra Canvas — our mission, how it works, and the technology behind the magic.",
};

const techStack = [
  {
    name: "Next.js 15",
    role: "Framework",
    desc: "App Router, server components, and API routes power the full stack.",
  },
  {
    name: "NanoBanana AI",
    role: "Generation Engine",
    desc: "High-quality image synthesis with support for multiple aspect ratios.",
  },
  {
    name: "TypeScript",
    role: "Language",
    desc: "End-to-end type safety from API to UI.",
  },
  {
    name: "Tailwind CSS",
    role: "Styling",
    desc: "Utility-first CSS with a custom dark design system.",
  },
];

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Speed first",
    desc: "We optimize every millisecond of your creative workflow. No wait, no queue.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "No gates",
    desc: "No accounts, no paywalls, no limits by default. Creativity should be accessible.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Private",
    desc: "Your prompts stay on your device. We don't log, store, or sell your data.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main style={{ flex: 1 }}>
        {/* ── HERO ── */}
        <section
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "80px 24px 72px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              About
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: 20,
              textWrap: "balance",
            }}
          >
            We believe creativity
            <br />
            shouldn&apos;t require expertise.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 580,
              textWrap: "pretty",
            }}
          >
            Moventra Canvas was built on a simple premise: every person has
            something they want to visualize, but not everyone has the skills
            or tools to make it real. AI changes that.
          </p>
        </section>

        {/* ── STORY ── */}
        <section
          aria-labelledby="story-heading"
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "64px 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "start",
            }}
            className="about-grid"
          >
            <div>
              <h2
                id="story-heading"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: 16,
                }}
              >
                The story
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                Moventra Canvas started as a personal experiment to make
                image generation as frictionless as possible. No lengthy
                setups. No complicated parameters. Just a prompt and a result.
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                Today it serves thousands of creatives, developers, and
                curious minds who want to see their ideas brought to life —
                instantly.
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: 16,
                }}
              >
                The mission
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                To give every person on the internet the ability to generate
                beautiful, high-quality images — without barriers of cost,
                complexity, or technical knowledge.
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                We&apos;re committed to keeping the core experience free,
                fast, and private.
              </p>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section
          aria-labelledby="values-heading"
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "64px 24px",
            }}
          >
            <h2
              id="values-heading"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: 36,
              }}
            >
              What we stand for
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 20,
                    padding: "24px 0",
                    borderBottom: i < values.length - 1 ? "1px solid var(--border)" : "none",
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
                      marginTop: 2,
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 16,
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "var(--text)",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section
          aria-labelledby="tech-heading"
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "64px 24px",
            }}
          >
            <h2
              id="tech-heading"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: 8,
              }}
            >
              Built with care
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                marginBottom: 36,
              }}
            >
              A transparent look at our technology choices.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {techStack.map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 20px 22px",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--primary)",
                      background: "var(--primary-dim)",
                      padding: "2px 8px",
                      borderRadius: 999,
                      marginBottom: 10,
                    }}
                  >
                    {t.role}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "var(--text)",
                    }}
                  >
                    {t.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "64px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                Try it yourself
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
                No account needed. Free forever.
              </p>
            </div>
            <a
              href="/generate"
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                background: "var(--primary)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)";
              }}
            >
              Open Generator
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
