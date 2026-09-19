import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="var(--primary)" />
              <path
                d="M8 20L12 10L16 16L18 13L20 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="9.5" r="1.5" fill="white" opacity="0.7" />
            </svg>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              Moventra Canvas
            </span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            Turn words into art. Instantly.
          </p>
        </div>

        {/* Links */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}
          aria-label="Footer navigation"
        >
          {[
            { href: "/", label: "Home" },
            { href: "/generate", label: "Generate" },
            { href: "/about", label: "About" },
            { href: "/faq", label: "FAQ" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "4px 10px",
                fontSize: 13,
                color: "var(--text-muted)",
                textDecoration: "none",
                borderRadius: 6,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
          © {year} Moventra Canvas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
