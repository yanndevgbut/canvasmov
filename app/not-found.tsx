import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
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
              border: "1px solid var(--border)",
              background: "var(--surface)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--primary)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              404 Error
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: 16,
              color: "var(--text)",
            }}
          >
            Page not found
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 36,
            }}
          >
            The page you are looking for might have been moved, renamed, or
            does not exist. Let&apos;s get you back on track.
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
            <Link
              href="/"
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "var(--primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.15s",
              }}
            >
              Back to Home
            </Link>
            <Link
              href="/generate"
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
              Start Generating
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
