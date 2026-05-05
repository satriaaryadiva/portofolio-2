'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-3.5 md:h-3.5">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-3.5 md:h-3.5">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  // Icon Refs for scaling
  const lightIconRef = useRef<HTMLDivElement>(null);
  const darkIconRef = useRef<HTMLDivElement>(null);
  const activeLightIconRef = useRef<HTMLDivElement>(null);
  const activeDarkIconRef = useRef<HTMLDivElement>(null);
  
  const isFirstRender = useRef(true);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

  // 1. Core Toggle & Icon Animations
  useLayoutEffect(() => {
    if (!mounted || !maskRef.current) return;
    
    const duration = isFirstRender.current ? 0 : 0.7;
    const ease = "elastic.out(1, 0.75)"; 
    
    // Animate the mask slider
    gsap.to(maskRef.current, {
      clipPath: isDark ? 'inset(0% 0% 0% 50% round 99px)' : 'inset(0% 50% 0% 0% round 99px)',
      duration: isFirstRender.current ? 0 : 0.6,
      ease: 'power3.inOut'
    });

    // Icon scale popping
    if (isDark) {
      gsap.to([darkIconRef.current, activeDarkIconRef.current], { scale: 1.15, opacity: 1, duration, ease });
      gsap.to([lightIconRef.current, activeLightIconRef.current], { scale: 0.85, opacity: 0.3, duration, ease });
    } else {
      gsap.to([lightIconRef.current, activeLightIconRef.current], { scale: 1.15, opacity: 1, duration, ease });
      gsap.to([darkIconRef.current, activeDarkIconRef.current], { scale: 0.85, opacity: 0.3, duration, ease });
    }

    isFirstRender.current = false;
  }, [isDark, mounted]);

  // 2. Magnetic Hover Interaction
  useLayoutEffect(() => {
    if (!mounted || !containerRef.current) return;
    
    const btn = containerRef.current;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      // Pull 25% of the distance towards the mouse
      xTo(relX * 0.25);
      yTo(relY * 0.25);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(btn, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    const handleMouseEnter = () => {
      gsap.to(btn, { scale: 1.05, duration: 0.4, ease: "power2.out" });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    btn.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      btn.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <button 
      ref={containerRef}
      className='relative flex items-center w-14 h-7 md:w-[72px] md:h-9 rounded-full bg-foreground/5 border border-foreground/10 cursor-pointer text-foreground'
      onClick={() => {
        // Click squish effect
        gsap.fromTo(containerRef.current, 
          { scale: 0.9 },
          { scale: 1.05, duration: 0.5, ease: "elastic.out(1, 0.4)" }
        );
        setTheme(isDark ? 'light' : 'dark');
      }}
      aria-label="Toggle theme"
    >
      {/* Base Layer (Faded Icons) */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div ref={lightIconRef} className="w-1/2 flex justify-center origin-center"><SunIcon /></div>
        <div ref={darkIconRef} className="w-1/2 flex justify-center origin-center"><MoonIcon /></div>
      </div>

      {/* Masked Layer (The moving pill with highlighted Icons) */}
      <div 
        ref={maskRef}
        className="absolute inset-[3px] bg-foreground text-background pointer-events-none shadow-xl rounded-full"
        style={{ clipPath: isDark ? 'inset(0% 0% 0% 50% round 99px)' : 'inset(0% 50% 0% 0% round 99px)' }}
      >
        {/* Counter-offset container */}
        <div className="absolute flex items-center" style={{ top: '-3px', left: '-3px', right: '-3px', bottom: '-3px' }}>
          <div ref={activeLightIconRef} className="w-1/2 flex justify-center origin-center"><SunIcon /></div>
          <div ref={activeDarkIconRef} className="w-1/2 flex justify-center origin-center"><MoonIcon /></div>
        </div>
      </div>
    </button>
  );
}
