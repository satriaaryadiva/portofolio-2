'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Copywriting ────────────────────────────────────────────────
const ROW_1 = [
  { text: 'Help your brand grow',   style: 'solid' },
  { text: '✦',                 style: 'star'  },
  { text: 'Help your brand grow',       style: 'solid' },
  { text: '✦',                 style: 'star'  },
  { text: 'TypeScript',        style: 'solid' },
  { text: '✦',                 style: 'star'  },
  { text: 'UI Engineering',    style: 'solid' },
  { text: '✦',                 style: 'star'  },
  { text: 'Supabase & Firebase', style: 'solid' },
  { text: '✦',                 style: 'star'  },
];

const ROW_2 = [
  { text: 'Available for Work', style: 'outline' },
  { text: '◈',                  style: 'star'    },
  { text: 'Open to Collaborate', style: 'outline' },
  { text: '◈',                  style: 'star'    },
  { text: 'Freelance Projects',  style: 'outline' },
  { text: '◈',                  style: 'star'    },
  { text: 'Based in Medan, ID',  style: 'outline' },
  { text: '◈',                  style: 'star'    },
];

const ROW_3 = [
  { text: 'Build. Ship. Scale.', style: 'solid'  },
  { text: '—',                   style: 'dash'   },
  { text: 'Code is Craft',       style: 'solid'  },
  { text: '—',                   style: 'dash'   },
  { text: 'Details Matter',      style: 'solid'  },
  { text: '—',                   style: 'dash'   },
  { text: 'Fast by Default',     style: 'solid'  },
  { text: '—',                   style: 'dash'   },
  { text: 'Pixel Perfect',       style: 'solid'  },
  { text: '—',                   style: 'dash'   },
];

type RowItem = { text: string; style: string };

function MarqueeRow({ items, outlined }: { items: RowItem[]; outlined?: boolean }) {
  const renderItem = (item: RowItem, i: number) => {
    if (item.style === 'star' || item.style === 'dash') {
      return (
        <span
          key={i}
          className="mx-6 shrink-0 font-mono opacity-30 text-[1.2em] leading-none"
          style={outlined ? { WebkitTextStroke: '0px', color: 'var(--color-background)' } : {}}
        >
          {item.text}
        </span>
      );
    }
    return (
      <span key={i} className={`shrink-0 ${item.style === 'outline' ? 'italic' : ''}`}>
        {item.text}
      </span>
    );
  };

  return <>{items.map((item, i) => renderItem(item, i))}</>;
}

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref    = useRef<HTMLDivElement>(null);
  const row2Ref    = useRef<HTMLDivElement>(null);
  const row3Ref    = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let raf: number;
    let x1 = 0, x2 = -50, x3 = 0;
    const speed = { val: 0.025 };

    const ctx = gsap.context(() => {

      // ── Entrance: section slides up ──────────────────────────────────
      gsap.from(sectionRef.current, {
        yPercent: 8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
        },
      });

      // ── Divider line grows on entry ───────────────────────────────────
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // ── Scroll-linked velocity + skew ────────────────────────────────
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const dir      = self.direction;
          const boost    = gsap.utils.clamp(0, 0.35, Math.abs(velocity) / 1200);

          gsap.to(speed, {
            val: (0.025 + boost) * dir,
            duration: 0.15,
            overwrite: true,
            onComplete: () =>
              gsap.to(speed, { val: 0.025, duration: 1.8, ease: 'power2.out' }),
          });

          // Elegant skew on rows
          const skew = gsap.utils.clamp(-5, 5, velocity / 500);
          gsap.to([row1Ref.current, row2Ref.current, row3Ref.current], {
            skewX: skew,
            duration: 0.25,
            overwrite: true,
            onComplete: () =>
              gsap.to([row1Ref.current, row2Ref.current, row3Ref.current], {
                skewX: 0,
                duration: 1,
                ease: 'elastic.out(1,0.4)',
              }),
          });
        },
      });

      // ── RAF loop ─────────────────────────────────────────────────────
      const tick = () => {
        if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;

        // Seamless loop: wrap at ±50%
        x1 -= speed.val;           if (x1 <= -50) x1 += 50; else if (x1 > 0) x1 -= 50;
        x2 += Math.abs(speed.val); if (x2 >= 0)   x2 -= 50; else if (x2 < -50) x2 += 50;
        x3 -= speed.val * 0.7;     if (x3 <= -50) x3 += 50; else if (x3 > 0) x3 -= 50;

        gsap.set(row1Ref.current, { xPercent: x1 });
        gsap.set(row2Ref.current, { xPercent: x2 });
        gsap.set(row3Ref.current, { xPercent: x3 });

        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  const rowClass = 'flex whitespace-nowrap will-change-transform';
  const solidText = 'font-display font-black uppercase leading-none tracking-tight text-[8vw] md:text-[5.5vw]';
  const outlineText = 'font-display font-black uppercase leading-none tracking-tight text-[8vw] md:text-[5.5vw] text-transparent';
  const innerClass = 'flex items-center gap-8 pr-8';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-foreground text-background py-8 md:py-12"
    >
      {/* ── Top divider ── */}
      <div
        ref={dividerRef}
        className="mb-6 mx-8 md:mx-16 h-px bg-background/15 origin-left"
      />

      {/* ── Row 1 — Solid, moves LEFT ── */}
      <div ref={row1Ref} className={`${rowClass} mb-3`}>
        {[0,1].map(k => (
          <div key={k} className={`${innerClass} ${solidText} text-background`}>
            <MarqueeRow items={ROW_1} />
          </div>
        ))}
      </div>

      {/* ── Row 2 — Outline, moves RIGHT ── */}
      <div ref={row2Ref} className={`${rowClass} mb-3`}>
        {[0,1].map(k => (
          <div
            key={k}
            className={`${innerClass} ${outlineText}`}
            style={{ WebkitTextStroke: '1px var(--color-background)' }}
          >
            <MarqueeRow items={ROW_2} outlined />
          </div>
        ))}
      </div>

      {/* ── Row 3 — Solid smaller, moves LEFT slower ── */}
      <div ref={row3Ref} className={rowClass}>
        {[0,1].map(k => (
          <div
            key={k}
            className={`${innerClass} font-display font-black uppercase leading-none text-[5.5vw] md:text-[3.5vw] text-background/50`}
          >
            <MarqueeRow items={ROW_3} />
          </div>
        ))}
      </div>

      {/* ── Bottom divider ── */}
      <div className="mt-6 mx-8 md:mx-16 h-px bg-background/15" />

      {/* ── Ambient noise overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
    </section>
  );
}
