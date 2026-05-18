'use client';

import React, { useEffect, useRef } from 'react';

const TECH_STACK = [
  { name: 'Next.js',    color: '#ffffff', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/></svg> },
  { name: 'React',      color: '#61dafb', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38A1.93 1.93 0 0 0 16.878 1.314z"/></svg> },
  { name: 'TypeScript', color: '#3178c6', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.1 5.1 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.6 5.6 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name: 'Tailwind',   color: '#38bdf8', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
  { name: 'GSAP',       color: '#88ce02', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9.83,7.59C10.647,7.595 11.267,7.828 11.672,8.282C12.055,8.713 12.239,9.336 12.219,10.132L12.205,10.193C12.14,10.272 12.099,10.288 12.057,10.288L10.398,10.288C10.29,10.288 10.199,10.2 10.199,10.093C10.199,9.669 10.071,9.435 9.809,9.383L9.689,9.372C9.347,9.372 9.125,9.583 9.119,9.951C9.112,10.361 9.344,10.734 10.004,11.374C10.872,12.19 11.221,12.913 11.204,13.867C11.177,15.411 10.127,16.41 8.531,16.41C7.716,16.41 7.093,16.191 6.678,15.761C6.258,15.324 6.066,14.683 6.106,13.855C6.108,13.813 6.125,13.772 6.155,13.743C6.185,13.714 6.226,13.698 6.267,13.698L7.983,13.698C8.141,13.853 8.137,13.873C8.118,14.171 8.171,14.394 8.288,14.518C8.363,14.598 8.469,14.639 8.599,14.639C8.916,14.639 9.102,14.414 9.109,14.024C9.115,13.687 9.007,13.39 8.427,12.792C7.676,12.058 7.003,11.3 7.024,10.108C7.037,9.416 7.311,8.784 7.798,8.327C8.312,7.845 9.014,7.59 9.83,7.59Z"/></svg> },
  { name: 'Git',        color: '#f05032', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835a2.01 2.01 0 0 1-.6-.401c-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg> },
  { name: 'Framer',     color: '#a259ff', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg> },
  { name: 'Firebase',   color: '#ffca28', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg> },
  { name: 'Supabase',   color: '#3ecf8e', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z"/></svg> },
];

const ORBIT_CONFIG = [
  { radiusFactor: 0.10, speed: 0.020, phase: 0 },
  { radiusFactor: 0.16, speed: 0.015, phase: Math.PI / 3 },
  { radiusFactor: 0.22, speed: 0.011, phase: Math.PI / 1.5 },
  { radiusFactor: 0.28, speed: 0.0085, phase: Math.PI },
  { radiusFactor: 0.34, speed: 0.0068, phase: Math.PI / 2 },
  { radiusFactor: 0.38, speed: 0.0055, phase: Math.PI * 1.3 },
  { radiusFactor: 0.42, speed: 0.0044, phase: Math.PI * 0.7 },
  { radiusFactor: 0.46, speed: 0.0036, phase: Math.PI * 0.4 },
  { radiusFactor: 0.50, speed: 0.003,  phase: Math.PI * 1.7 },
];

type Star         = { x: number; y: number; r: number; alpha: number; twinkleSpeed: number };
type Trail        = { x: number; y: number; alpha: number };
type ShootingStar = { x: number; y: number; vx: number; vy: number; len: number; alpha: number };
type Particle     = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string; life: number };
type GravityPull  = { x: number; y: number; strength: number; age: number };

export default function Playground() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const nodeRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef      = useRef<number>(0);
  const frameRef    = useRef(0);
  const hoveredRef  = useRef<number | null>(null);
  const wavesRef    = useRef<Particle[]>([]);
  const gravityRef  = useRef<GravityPull | null>(null);
  const starsRef    = useRef<Star[]>([]);
  const trailsRef          = useRef<Trail[][]>(ORBIT_CONFIG.map(() => []));
  const cxRef              = useRef(0);
  const cyRef              = useRef(0);
  const shootingStarsRef   = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const r = section.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
      cxRef.current = r.width  / 2;
      cyRef.current = r.height / 2;
      // Regenerate stars on resize
      starsRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));
      // Shooting stars pool
      shootingStarsRef.current = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const loop = () => {
      frameRef.current += 1;
      const f  = frameRef.current;
      const cx = cxRef.current;
      const cy = cyRef.current;
      const maxR = Math.min(cx, cy) * 0.92;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Nebula aurora clouds ──────────────────────────────────────────
      const nebulaColors = ['#1a0533','#000d33','#001a0d','#1a1400'];
      nebulaColors.forEach((col, ni) => {
        const nx = cx + Math.sin(f * 0.0008 + ni * 1.5) * cx * 0.5;
        const ny = cy + Math.cos(f * 0.0006 + ni * 1.1) * cy * 0.4;
        const nr = (Math.min(cx,cy)) * (0.6 + ni * 0.15);
        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
        ng.addColorStop(0, col + 'cc');
        ng.addColorStop(1, col + '00');
        ctx.beginPath();
        ctx.arc(nx, ny, nr, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();
      });

      // ── Stars ────────────────────────────────────────────────────────
      starsRef.current.forEach(s => {
        s.alpha = 0.15 + 0.55 * (0.5 + 0.5 * Math.sin(f * s.twinkleSpeed + s.x));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      // ── Shooting stars ────────────────────────────────────────────────
      if (Math.random() < 0.008) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          vx: 6 + Math.random() * 8,
          vy: 2 + Math.random() * 4,
          len: 60 + Math.random() * 80,
          alpha: 1,
        });
      }
      shootingStarsRef.current = shootingStarsRef.current.filter(ss => ss.alpha > 0);
      shootingStarsRef.current.forEach(ss => {
        const g = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y - ss.len * 0.4);
        g.addColorStop(0, `rgba(255,255,255,${ss.alpha})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.4);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ss.x += ss.vx; ss.y += ss.vy; ss.alpha -= 0.02;
      });

      // ── Orbit dashes ─────────────────────────────────────────────────
      ORBIT_CONFIG.forEach((o, i) => {
        const r = o.radiusFactor * maxR / 0.50;
        const isHovOrbit = hoveredRef.current === i;
        ctx.save();
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = isHovOrbit
          ? TECH_STACK[i].color + '55'
          : 'rgba(255,255,255,0.07)';
        ctx.lineWidth = isHovOrbit ? 1.5 : 1;
        ctx.stroke();
        ctx.restore();
      });

      // ── Sun ──────────────────────────────────────────────────────────
      const pulse = 1 + Math.sin(f * 0.04) * 0.12;
      const sunR  = 20 * pulse;
      // Outer corona
      const corona = ctx.createRadialGradient(cx, cy, sunR * 0.5, cx, cy, sunR * 5);
      corona.addColorStop(0,   'rgba(255,220,80,0.3)');
      corona.addColorStop(0.4, 'rgba(255,140,0,0.1)');
      corona.addColorStop(1,   'rgba(255,80,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, sunR * 5, 0, Math.PI * 2);
      ctx.fillStyle = corona; ctx.fill();
      // Accretion disk rings
      [1.8, 2.4, 3.1].forEach((rf, ri) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(f * 0.003 * (ri % 2 === 0 ? 1 : -1));
        ctx.scale(1, 0.28);
        ctx.beginPath();
        ctx.arc(0, 0, sunR * rf, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,${180 - ri*30},${40 - ri*10},${0.35 - ri*0.08})`;
        ctx.lineWidth = 3 - ri * 0.7;
        ctx.stroke();
        ctx.restore();
      });
      // Core
      const sunCore = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR);
      sunCore.addColorStop(0,   'rgba(255,250,200,1)');
      sunCore.addColorStop(0.4, 'rgba(255,200,60,0.95)');
      sunCore.addColorStop(1,   'rgba(255,100,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.fillStyle = sunCore; ctx.fill();

      // ── Planets + trails ─────────────────────────────────────────────
      const positions: {x:number;y:number}[] = [];
      ORBIT_CONFIG.forEach((o, i) => {
        const r     = o.radiusFactor * maxR / 0.50;
        const angle = o.phase + f * o.speed;
        const x     = cx + Math.cos(angle) * r;
        const y     = cy + Math.sin(angle) * r;
        positions.push({ x, y });

        // Trail (longer & brighter)
        const trails = trailsRef.current[i];
        trails.push({ x, y, alpha: 0.7 });
        if (trails.length > 28) trails.shift();
        trails.forEach((t, ti) => {
          t.alpha *= 0.91;
          const tr = 6 * (ti / trails.length);
          ctx.beginPath();
          ctx.arc(t.x, t.y, tr, 0, Math.PI * 2);
          ctx.fillStyle = TECH_STACK[i].color + Math.round(t.alpha * 120).toString(16).padStart(2,'0');
          ctx.fill();
        });

        // Atmosphere ring
        const isHov = hoveredRef.current === i;
        ctx.beginPath();
        ctx.arc(x, y, isHov ? 22 : 16, 0, Math.PI * 2);
        ctx.strokeStyle = TECH_STACK[i].color + (isHov ? '55' : '25');
        ctx.lineWidth = isHov ? 2 : 1;
        ctx.stroke();

        // Glow halo
        const glowR = isHov ? 44 : 26;
        const halo  = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        halo.addColorStop(0,   TECH_STACK[i].color + 'ee');
        halo.addColorStop(0.3, TECH_STACK[i].color + '77');
        halo.addColorStop(1,   TECH_STACK[i].color + '00');
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Position DOM node
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      });


      // ── Constellation on hover ────────────────────────────────────────
      const hi = hoveredRef.current;
      if (hi !== null) {
        const { x: hx, y: hy } = positions[hi];
        positions.forEach(({ x, y }, i) => {
          if (i === hi) return;
          const dist = Math.hypot(x - hx, y - hy);
          const alpha = Math.max(0, 1 - dist / (maxR * 0.9));
          const g = ctx.createLinearGradient(hx, hy, x, y);
          g.addColorStop(0, TECH_STACK[hi].color + Math.round(alpha * 120).toString(16).padStart(2,'0'));
          g.addColorStop(1, TECH_STACK[i].color  + Math.round(alpha * 60).toString(16).padStart(2,'0'));
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(x, y);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        // Radial burst from hovered planet
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
          const bLen = 28 + Math.sin(f * 0.07 + a) * 8;
          ctx.beginPath();
          ctx.moveTo(hx + Math.cos(a) * 18, hy + Math.sin(a) * 18);
          ctx.lineTo(hx + Math.cos(a) * bLen, hy + Math.sin(a) * bLen);
          ctx.strokeStyle = TECH_STACK[hi].color + '44';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // ── Gravity distortion ───────────────────────────────────────────
      // (applied as orbit offset in planet section above)

      // ── Supernova particles ───────────────────────────────────────────
      const gp = gravityRef.current;
      if (gp) {
        gp.age++;
        // Flash ring at click origin
        const flashR = gp.age * 3;
        const flashA = Math.max(0, 0.6 - gp.age * 0.04);
        if (flashA > 0) {
          const fg = ctx.createRadialGradient(gp.x, gp.y, 0, gp.x, gp.y, flashR);
          fg.addColorStop(0, `rgba(255,255,220,${flashA})`);
          fg.addColorStop(1, 'rgba(255,200,80,0)');
          ctx.beginPath(); ctx.arc(gp.x, gp.y, flashR, 0, Math.PI * 2);
          ctx.fillStyle = fg; ctx.fill();
        }
        if (gp.age > 60) gravityRef.current = null;
      }

      wavesRef.current = wavesRef.current.filter(p => p.life > 0);
      wavesRef.current.forEach(p => {
        // Gravity pull toward click
        if (gp && gp.age < 30) {
          const dx = gp.x - p.x, dy = gp.y - p.y;
          const d  = Math.max(1, Math.hypot(dx, dy));
          p.vx += (dx / d) * gp.strength * 0.02;
          p.vy += (dy / d) * gp.strength * 0.02;
        }
        p.vx *= 0.97; p.vy *= 0.97; // friction
        p.vy += 0.04;                // slight gravity
        p.x += p.vx; p.y += p.vy;
        p.alpha = p.life / 80;
        p.life--;
        // Glow particle
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        pg.addColorStop(0, p.color + Math.round(p.alpha * 255).toString(16).padStart(2,'0'));
        pg.addColorStop(1, p.color + '00');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = pg; ctx.fill();
        // Solid core
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 220).toString(16).padStart(2,'0');
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;
    // Set gravity pull
    gravityRef.current = { x: ox, y: oy, strength: 3.5, age: 0 };
    // Spawn supernova particles
    const count = 55;
    for (let i = 0; i < count; i++) {
      const angle  = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed  = 2.5 + Math.random() * 5;
      const color  = TECH_STACK[Math.floor(Math.random() * TECH_STACK.length)].color;
      wavesRef.current.push({
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.5 + Math.random() * 2.5,
        alpha: 1,
        color,
        life: 55 + Math.floor(Math.random() * 25),
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleClick}
      className="relative w-full h-[80vh] md:h-screen bg-background text-foreground overflow-hidden border-y border-border cursor-crosshair"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a14 0%, #000000 100%)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <div className="absolute top-6 md:top-8 inset-x-0 z-30 flex flex-col items-center pointer-events-none select-none">
        <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] opacity-30 px-4 py-1.5 border border-foreground/10 rounded-full inline-block mb-2">
          ◎ PLAYGROUND
        </p>
        <h3 className="font-display text-xl md:text-3xl font-black uppercase tracking-tighter   text-foreground">
          My Tech Solar System
        </h3>
        <p className="font-mono text-[8px] md:text-[9px] tracking-widest opacity-70 mt-1 text-foreground">
          Hover to connect · Click to send a shockwave
        </p>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Planet pills */}
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-mono text-[9px] tracking-widest border bg-black/60 backdrop-blur-md transition-all duration-200 group-hover:scale-125 select-none whitespace-nowrap shadow-lg"
              style={{
                color: tech.color,
                borderColor: tech.color + '40',
                boxShadow: `0 0 12px ${tech.color}20`,
              }}
            >
              {tech.icon}
              <span
                className="hidden md:inline transition-colors text-white/50 group-hover:text-white/90"
              >
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-right label */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 z-30 pointer-events-none">
        <span className="font-mono text-[8px] uppercase tracking-widest opacity-20 text-foreground">
          {TECH_STACK.length} technologies orbiting
        </span>
      </div>
    </section>
  );
}
