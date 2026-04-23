'use client';

import gsap from 'gsap';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const words = [
  "INITIALIZING",
  "OPTIMIZING ASSETS",
  "CRAFTING EXPERIENCE",
  "RENDERING PIXELS",
  "SETTING THE STAGE",
  "ALMOST THERE",
  "WELCOME"
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Counter animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setCounter(Math.floor(counterObj.value)),
    });

    // Progress bar animation
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
    }, 0);

    // Words animation
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 400);

    // Exit animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.2,
      onComplete: () => {
        clearInterval(wordInterval);
        onComplete();
      }
    });

    return () => {
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_transparent_70%)]" />

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center space-y-8 w-full max-w-md px-8">
        
        {/* Name / Brand */}
        <div className="font-display text-3xl  uppercase font-bold text-foreground mb-2">
          SATRIA ARYA DIVA
        </div>

        {/* Status Text */}
        <div 
          ref={wordRef}
          className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 h-4 flex items-center justify-center"
        >
          {words[wordIndex]}
        </div>

        {/* Counter */}
        <div 
          ref={counterRef}
          className="font-display text-8xl md:text-9xl font-black italic tracking-tighter leading-none"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {counter.toString().padStart(2, '0')}<span className="text-[0.4em] not-italic ml-1">%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full h-[6px] bg-white/10 overflow-hidden">
            <div 
                ref={progressRef}
                className="absolute top-0 left-0 h-full w-0 bg-white"
            />
        </div>

        {/* Footer Labels */}
        <div className="w-full flex justify-between font-mono text-[8px] md:text-[10px] tracking-widest opacity-40 uppercase">
           <span>(DEVELOPER PORTFOLIO)</span>
           <span>EST. 2024</span>
        </div>
      </div>

      {/* Aesthetic Corners */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20" />
    </div>
  );
}
