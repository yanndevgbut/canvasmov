"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        background: "rgba(9,9,11,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
          aria-label="Moventra Canvas — Home"
        >
          <LogoMark />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: "var(--text)",
              letterSpacing: "-0.03em",
            }}
          >
            Moventra Canvas
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 6 }}
          className="desktop-nav"
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            href="/generate"
            style={{
              marginLeft: 8,
              padding: "7px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "var(--primary)",
              textDecoration: "none",
              transition: "background 0.15s, transform 0.1s",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            className="nav-generate-btn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707M18.364 5.636l-.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Generate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{
            display: "none",
            padding: 8,
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "12px 24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          className="mobile-menu"
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  color: active ? "var(--text)" : "var(--text-secondary)",
                  background: active ? "var(--surface)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/generate"
            onClick={() => setOpen(false)}
            style={{
              marginTop: 8,
              padding: "11px 14px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: "var(--primary)",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Generate Image
          </Link>
        </div>
      )}

      <style>{`
        .nav-generate-btn:hover {
          background: var(--primary-hover) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
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
  );
}
