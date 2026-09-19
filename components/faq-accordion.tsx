"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqGroup {
  category: string;
  items: FaqItem[];
}

const faqData: FaqGroup[] = [
  {
    category: "General",
    items: [
      {
        q: "What is Moventra Canvas?",
        a: "Moventra Canvas is a free AI image generation tool. You type a text description — called a prompt — and the AI generates a high-quality image matching your description. No account required.",
      },
      {
        q: "Is it really free?",
        a: "Yes. The core generation feature is completely free. You don't need to create an account, enter a credit card, or agree to any subscription. Just open the page and start generating.",
      },
      {
        q: "Do I need to sign up?",
        a: "No. Moventra Canvas works without any registration. Open the site, write your prompt, and click Generate. That's it.",
      },
      {
        q: "Who is Moventra Canvas for?",
        a: "Anyone with an idea they want to visualize. Designers using it for quick mood boards. Writers visualizing scenes. Developers building prototypes. Or simply curious people who want to see what AI can do with their words.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "How long does generation take?",
        a: "Typically 15 to 40 seconds from clicking Generate to seeing your image. Complex prompts or high server load can occasionally push this toward 60 seconds.",
      },
      {
        q: "What aspect ratios are supported?",
        a: "Three ratios are available: 1:1 (square), 16:9 (landscape/widescreen), and 9:16 (portrait/vertical). Select your preferred ratio before generating.",
      },
      {
        q: "What happens if generation times out?",
        a: "If the process takes longer than 60 seconds, you'll see an error message. This is a server-side timeout. Simply try again — the second attempt usually succeeds.",
      },
      {
        q: "Why did my generation fail?",
        a: "Failures can happen due to temporary server load, network issues, or your prompt triggering safety filters. Try rephrasing your prompt and generating again. If failures persist, the AI service may be temporarily unavailable.",
      },
      {
        q: "What format is the output image?",
        a: "Generated images are delivered as JPEG files. You can download them directly from the result page by clicking the Download button.",
      },
    ],
  },
  {
    category: "Prompts & Usage",
    items: [
      {
        q: "How do I write a good prompt?",
        a: "Be specific. Instead of 'a cat', try 'a black cat sitting on a rain-soaked cobblestone street at night, bokeh background, cinematic lighting'. Include subject, setting, lighting, mood, and style for best results.",
      },
      {
        q: "Is there a prompt length limit?",
        a: "Prompts are limited to 500 characters. This is enough for a detailed description including subject, environment, lighting, and style references.",
      },
      {
        q: "Can I use the images commercially?",
        a: "Images are generated for personal use. For commercial applications, please review the terms of the underlying AI service. We recommend checking the generation origin before publishing commercially.",
      },
      {
        q: "Can I generate logos or text-based images?",
        a: "The AI handles photorealistic scenes, illustrations, and abstract art well. Precise typography and logos are generally not reliable — AI image models are not designed for exact text rendering.",
      },
      {
        q: "My image doesn't match what I described. What should I do?",
        a: "Rephrase and try again. AI image generation is non-deterministic — the same prompt can produce different results each time. Use more specific language, mention the style explicitly (e.g., 'oil painting', 'photorealistic', 'anime'), and describe the composition directly.",
      },
    ],
  },
];

export default function FaqAccordion() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {faqData.map((group) => (
        <section key={group.category} aria-labelledby={`faq-cat-${group.category}`}>
          <h2
            id={`faq-cat-${group.category}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: 12,
            }}
          >
            {group.category}
          </h2>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {group.items.map((item, i) => (
              <AccordionItem
                key={i}
                q={item.q}
                a={item.a}
                isLast={i === group.items.length - 1}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function AccordionItem({
  q,
  a,
  isLast,
}: {
  q: string;
  a: string;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const id = `faq-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
    >
      <button
        id={`${id}-btn`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        style={{
          width: "100%",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: open ? "var(--surface-2)" : "var(--surface)",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-2)";
        }}
        onMouseLeave={(e) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text)",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "var(--primary)" : "var(--text-muted)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease, color 0.15s",
          }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        hidden={!open}
        style={{
          padding: open ? "0 20px 20px" : "0 20px",
          background: "var(--surface-2)",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            margin: 0,
            paddingTop: 4,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}
