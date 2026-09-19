import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const showcasePrompts = [
  "A vast alien ocean at dusk, bioluminescent waves, twin moons on horizon, cinematic",
  "Portrait of an old lighthouse keeper, oil painting style, warm evening light",
  "Futuristic city street at rain, neon reflections on wet asphalt, photorealistic",
  "Abstract geometric flowers, paper cut art, pastel tones, minimal shadows",
  "Dense tropical jungle with shafts of golden light, ultra detailed",
  "Retro-futuristic space station interior, 1970s NASA aesthetic",
];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Instant Generation",
    desc: "From prompt to image in under a minute. No queue, no waiting room.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Multiple Ratios",
    desc: "Square, landscape, or portrait. Pick the ratio that fits your canvas.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "No Sign-up Required",
    desc: "Open, type, generate. No accounts, no credit cards, no friction.",
  },
];

const examplePrompts = [
  "A lone samurai on a misty mountain",
  "Abstract oil painting of city lights",
  "Cat astronaut floating in deep space",
  "Vintage botanical illustration of ferns",
  "Cyberpunk alley at midnight, rain",
  "Minimalist Japanese zen garden",
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Nav />

      <main style={{ flex: 1 }}>
        {/* ── HERO ── */}
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "96px 24px 80px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              border: "1px solid rgba(168,85,247,0.35)",
              background: "rgba(168,85,247,0.08)",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--primary)",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--primary)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              AI Image Generator
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              margin: "0 0 20px",
              textWrap: "balance",
            }}
          >
            Turn words into art.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--cta) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Instantly.
            </span>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 19px)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: 520,
              margin: "0 auto 44px",
              textWrap: "pretty",
            }}
          >
            Describe anything. Moventra Canvas transforms your words into
            high-quality images using advanced AI — no sign-up needed.
          </p>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/generate"
              style={{
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                color: "#fff",
                background: "var(--primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.15s, transform 0.1s",
                boxShadow: "0 0 24px rgba(168,85,247,0.25)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--primary-hover)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--primary)";
                el.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707M18.364 5.636l-.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Start Creating
            </Link>
            <Link
              href="/about"
              style={{
                padding: "14px 24px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                background: "transparent",
                textDecoration: "none",
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
              Learn more
            </Link>
          </div>

          {/* Prompt examples */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span style={{ fontSize: 12, color: "var(--text-muted)", width: "100%", marginBottom: 4 }}>
              Try these prompts:
            </span>
            {examplePrompts.map((p) => (
              <Link
                key={p}
                href={`/generate?prompt=${encodeURIComponent(p)}`}
                style={{
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(168,85,247,0.5)";
                  el.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-secondary)";
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        </section>

        {/* ── SHOWCASE ── */}
        <section
          aria-label="Example generated images"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px 96px",
          }}
        >
          <div
            style={{
              columns: "3 200px",
              gap: 12,
            }}
          >
            {showcasePrompts.map((prompt, i) => (
              <ShowcaseCard key={i} prompt={prompt} index={i} />
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          aria-labelledby="features-heading"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "80px 24px",
            }}
          >
            <h2
              id="features-heading"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              Simple by design.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                textAlign: "center",
                marginBottom: 56,
                textWrap: "pretty",
              }}
            >
              Everything you need. Nothing you don&apos;t.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: "28px 28px 32px",
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "var(--primary-dim)",
                      border: "1px solid rgba(168,85,247,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      marginBottom: 20,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 17,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      marginBottom: 8,
                      color: "var(--text)",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section
          aria-labelledby="cta-heading"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "96px 24px",
            textAlign: "center",
          }}
        >
          <h2
            id="cta-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              textWrap: "balance",
            }}
          >
            Ready to create something beautiful?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              maxWidth: 440,
              margin: "0 auto 40px",
            }}
          >
            Join thousands generating stunning images every day. It&apos;s free.
          </p>
          <Link
            href="/generate"
            style={{
              padding: "15px 32px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: "var(--cta)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.15s, transform 0.1s",
              boxShadow: "0 0 28px rgba(236,72,153,0.25)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--cta-hover)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--cta)";
              el.style.transform = "translateY(0)";
            }}
          >
            Start Generating
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Showcase card with placeholder gradient + prompt label
const gradients = [
  "linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0d0520 100%)",
  "linear-gradient(145deg, #0a1628 0%, #162845 50%, #051020 100%)",
  "linear-gradient(125deg, #1a0a05 0%, #3d1a08 50%, #0d0803 100%)",
  "linear-gradient(155deg, #041a10 0%, #0a3020 50%, #020d07 100%)",
  "linear-gradient(135deg, #1a1505 0%, #3a2c08 50%, #100d02 100%)",
  "linear-gradient(140deg, #0f0518 0%, #23104a 50%, #070310 100%)",
];

function ShowcaseCard({ prompt, index }: { prompt: string; index: number }) {
  const heights = [220, 280, 240, 300, 200, 260];
  const height = heights[index % heights.length];

  return (
    <div
      style={{
        breakInside: "avoid",
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border)",
        position: "relative",
        height,
        background: gradients[index % gradients.length],
        cursor: "pointer",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.15,
        }}
        aria-hidden="true"
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Overlay label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "32px 14px 14px",
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
            lineHeight: 1.4,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          &ldquo;{prompt}&rdquo;
        </p>
      </div>
    </div>
  );
}
