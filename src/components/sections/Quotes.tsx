'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as React from 'react';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Quotes() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quote-line', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col justify-center items-center px-4 py-2 bg-background text-foreground overflow-hidden border-t border-border/10"
    >
      
      {/* Top small text */}
      <div className="absolute top-12 text-center w-full px-6">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">
          A DEDICATED UI DEVELOPER BUILDING PREMIUM BRANDS
        </span>
      </div>
      {/* Main Quote Text */}
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center font-mono text-[5vw] md:text-[3vw] lg:text-[3vw] font-bold uppercase py-20 leading-[1.1] tracking-normal">
        <div className="overflow-hidden ">
          <p className="quote-line">&rdquo; IT&apos;S NEVER & JUST A WEBSITE.</p>
        </div>
        <div className="overflow-hidden not-first:">
          <p className="quote-line">EVERY <span className="underline decoration-2 md:decoration-4 underline-offset-[6px] md:underline-offset-10">DETAIL</span> MATTERS.</p>
        </div>
        <div className="overflow-hidden not-first:">
          <p className="quote-line">WE CRAFT DIGITAL EXPERIENCES.</p>
        </div>
        <div className="overflow-hidden not-first:">
          <p className="quote-line">YOUR DESIGN. OUR OBSESSION.</p>
        </div>
        <div className="overflow-hidden not-first:">
          <p className="quote-line">YOUR BRAND. OUR <span className="underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">PLAYGROUND.&rdquo;</span></p>
        </div>
      </div>
      {/* Bottom small text */}
      <div className="absolute bottom-12 left-6 md:left-12">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">
          I CRAFT BOLD DESIGN & CLEAN CODE.
        </span>
      </div>
      
      <div className="absolute bottom-12 right-6 md:right-12 text-right">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-60 tabular-nums">
         MEDAN, INDONESIA
        </span>
      </div>
    </section>
  );
}
