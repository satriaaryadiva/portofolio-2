'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TECH_STACK = [
  {
    name: 'Next.js',
    color: '#ffffff',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" /></svg>,
  },
  {
    name: 'React',
    color: '#61dafb',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" /></svg>,
  },
  {
    name: 'TypeScript',
    color: '#3178c6',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /></svg>,
  },
  {
    name: 'Tailwind',
    color: '#38bdf8',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" /></svg>,
  },
  {
    name: 'GSAP',
    color: '#88ce02',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9.83,7.59C10.647,7.595 11.267,7.828 11.672,8.282C12.055,8.713 12.239,9.336 12.219,10.132L12.205,10.193C12.197,10.211 12.185,10.229 12.17,10.243C12.14,10.272 12.099,10.288 12.057,10.288L10.398,10.288C10.29,10.288 10.199,10.2 10.199,10.093C10.199,9.669 10.071,9.435 9.809,9.383L9.689,9.372C9.347,9.372 9.125,9.583 9.119,9.951C9.112,10.361 9.344,10.734 10.004,11.374C10.872,12.19 11.221,12.913 11.204,13.867C11.177,15.411 10.127,16.41 8.531,16.41C7.716,16.41 7.093,16.191 6.678,15.761C6.258,15.324 6.066,14.683 6.106,13.855C6.108,13.813 6.125,13.772 6.155,13.743C6.185,13.714 6.226,13.698 6.267,13.698L7.983,13.698C8.007,13.699 8.03,13.705 8.052,13.715C8.073,13.726 8.092,13.741 8.107,13.76C8.12,13.775 8.129,13.793 8.135,13.813C8.14,13.832 8.141,13.853 8.137,13.873C8.118,14.171 8.171,14.394 8.288,14.518C8.363,14.598 8.469,14.639 8.599,14.639C8.916,14.639 9.102,14.414 9.109,14.024C9.115,13.687 9.007,13.39 8.427,12.792C7.676,12.058 7.003,11.3 7.024,10.108C7.037,9.416 7.311,8.784 7.798,8.327C8.312,7.845 9.014,7.59 9.83,7.59Z"/></svg>,
  },
  {
    name: 'Git',
    color: '#f05032',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" /></svg>,
  },
  {
    name: 'Framer',
    color: '#a259ff',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" /></svg>,
  },
  {
    name: 'Firebase',
    color: '#ffca28',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg>,
  },
  {
    name: 'Supabase',
    color: '#3ecf8e',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z"/></svg>,
  },
];

// Each orbit: radius scales down on mobile via multiplier
const ORBIT_CONFIG = [
  { radiusFactor: 0.10, speed: 0.020, phase: 0 },
  { radiusFactor: 0.15, speed: 0.015, phase: Math.PI / 3 },
  { radiusFactor: 0.20, speed: 0.011, phase: Math.PI / 1.5 },
  { radiusFactor: 0.25, speed: 0.0085, phase: Math.PI },
  { radiusFactor: 0.30, speed: 0.0068, phase: Math.PI / 2 },
  { radiusFactor: 0.35, speed: 0.0055, phase: Math.PI * 1.3 },
  { radiusFactor: 0.40, speed: 0.0044, phase: Math.PI * 0.7 },
  { radiusFactor: 0.45, speed: 0.0036, phase: Math.PI * 0.4 },
  { radiusFactor: 0.50, speed: 0.003, phase: Math.PI * 1.7 },
];

type Wave = { x: number; y: number; r: number; alpha: number };

export default function Playground() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const nodeRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef       = useRef<number>(0);
  const frameRef     = useRef(0);
  const hoveredRef   = useRef<number | null>(null);
  const wavesRef     = useRef<Wave[]>([]);
  const cxRef        = useRef(0);
  const cyRef        = useRef(0);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const r = section.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
      cxRef.current = r.width  / 2;
      cyRef.current = r.height / 2;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const loop = () => {
      frameRef.current += 1;
      const frame = frameRef.current;
      const cx = cxRef.current;
      const cy = cyRef.current;
      // Responsive radius cap
      const maxR = Math.min(cx, cy) * 0.9;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Orbit rings ────────────────────────────────────────────────
      ORBIT_CONFIG.forEach((o) => {
        const r = o.radiusFactor * maxR / 0.42; // normalise so largest = maxR
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ── Glowing sun (pulsing) ──────────────────────────────────────
      const pulse = 1 + Math.sin(frame * 0.04) * 0.1;
      const sunR  = 22 * pulse;
      const sunG  = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 2.5);
      sunG.addColorStop(0,   'rgba(255,210,80,1)');
      sunG.addColorStop(0.3, 'rgba(255,130,0,0.7)');
      sunG.addColorStop(1,   'rgba(255,80,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, sunR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = sunG;
      ctx.fill();

      // ── Planets ────────────────────────────────────────────────────
      const positions: {x:number;y:number}[] = [];

      ORBIT_CONFIG.forEach((o, i) => {
        const r     = o.radiusFactor * maxR / 0.42;
        const angle = o.phase + frame * o.speed;
        const x     = cx + Math.cos(angle) * r;
        const y     = cy + Math.sin(angle) * r;
        positions.push({ x, y });

        // Faint line from sun
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255,200,80,0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glow halo
        const isHov  = hoveredRef.current === i;
        const glowR  = isHov ? 30 : 20;
        const col    = TECH_STACK[i].color;
        const halo   = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        halo.addColorStop(0, col + 'aa');
        halo.addColorStop(1, col + '00');
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Move DOM pill to correct canvas position
        const el = nodeRefs.current[i];
        if (el) {
          // Canvas is absolute over the section, so (x,y) == section-relative px
          // The pill container is also absolute inset-0, so left/top works directly
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
      });

      // ── Hover connection lines ─────────────────────────────────────
      const hi = hoveredRef.current;
      if (hi !== null) {
        const { x: hx, y: hy } = positions[hi];
        positions.forEach(({ x, y }, i) => {
          if (i === hi) return;
          const col = TECH_STACK[i].color;
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(x, y);
          ctx.strokeStyle = col + '33';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // ── Shockwaves ─────────────────────────────────────────────────
      wavesRef.current = wavesRef.current.filter(w => w.alpha > 0);
      wavesRef.current.forEach(w => {
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${w.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        w.r     += 6;
        w.alpha -= 0.018;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    wavesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      r: 6,
      alpha: 0.7,
    });
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleClick}
      className="relative w-full h-[80vh] md:h-screen bg-background text-foreground overflow-hidden border-y border-border cursor-crosshair"
    >
      {/* Header – pinned top-center */}
      <div className="absolute top-8 inset-x-0 z-30 flex flex-col items-center pointer-events-none select-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 px-4 py-2 border border-foreground/10 rounded-full inline-block mb-3">
          ( PLAYGROUND )
        </p>
        <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tighter opacity-70 text-foreground">
          The Tech Solar System
        </h3>
        <p className="font-mono text-[9px] md:text-[10px] tracking-widest opacity-25 mt-1 text-foreground">
          Hover a planet · Click anywhere for a shockwave
        </p>
      </div>

      {/* Canvas – fills section absolutely */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Planet pills – positioned via inline transform in loop */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {TECH_STACK.map((tech, i) => (
          <div
            key={tech.name}
            ref={(el) => { nodeRefs.current[i] = el; }}
            onMouseEnter={() => { hoveredRef.current = i; }}
            onMouseLeave={() => { hoveredRef.current = null; }}
            className="absolute top-0 left-0 pointer-events-auto cursor-pointer group"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest border border-foreground/15 bg-background/80 text-foreground backdrop-blur-md transition-all duration-200 group-hover:scale-125 group-hover:border-foreground/50 select-none whitespace-nowrap shadow-lg"
              style={{ color: tech.color }}
            >
              {tech.icon}
              <span className="hidden md:inline text-white/60 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
