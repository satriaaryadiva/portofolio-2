'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressCircleRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 283 adalah keliling perkiraan dari lingkaran dengan r=45 (2 * pi * 45)
      gsap.to(progressCircleRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-100 flex h-16 w-16 cursor-pointer items-center justify-center mix-blend-difference md:bottom-10 md:right-10 group"
      onClick={scrollToTop}
    >
      {/* Latar Belakang Lingkaran Hitam Transparan */}
      <div className="absolute inset-0 rounded-full bg-black/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"></div>
      
      {/* SVG Animasi */}
      <svg className="absolute h-full w-full -rotate-90 transform transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100">
        {/* Lingkaran Base/Track */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/20"
        />
        {/* Lingkaran Indikator (Fill) */}
        <circle
          ref={progressCircleRef}
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="283"
          strokeDashoffset="283"
          className="text-white drop-shadow-md"
        />
      </svg>

      {/* Ikon Panah Ke Atas (Back to Top) */}
      <div className="absolute flex h-full w-full items-center justify-center text-white transition-transform duration-500 group-hover:-translate-y-1">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </div>
  );
}
