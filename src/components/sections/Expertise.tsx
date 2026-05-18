'use client';

import gsap from 'gsap';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const expertiseItems = [
  { title: 'WEB DEVELOPMENT', desc: 'ECOMMERCE · COMPANY PROFILE · WEBAPP · CMS', image: 'https://images.unsplash.com/photo-1600585154340-be6199f50a09?q=80&w=800&auto=format&fit=crop' },
  { title: 'BRANDING', desc: 'IDENTITY · LOGO · VISUAL SYSTEM', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop' },
  { title: 'WEBFLOW', desc: 'CMS · INTEGRATION · NO-CODE', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop' },
  { title: 'UI/UX DESIGN', desc: 'FIGMA · WIREFRAME · PROTOTYPE', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop' },
  { title: 'GSAP ANIMATIONS', desc: 'MOTION · SCROLL · INTERACTION', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' },
  { title: '3D & MOTION', desc: 'THREE.JS · BLENDER · RENDER', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { title: 'SEO & CONTENT', desc: 'RANKING · AUDIT · STRATEGY', image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop' },
];

export default function Expertise() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Mobile: track which item is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Desktop floating image
  useEffect(() => {
    if (!imageRevealRef.current) return;
    if (hoveredIndex !== null) {
      const items = containerRef.current?.querySelectorAll('.expertise-item');
      if (items && items[hoveredIndex]) {
        const el   = items[hoveredIndex] as HTMLElement;
        const rect = el.getBoundingClientRect();
        gsap.to(imageRevealRef.current, {
          y: rect.top + rect.height / 2,
          xPercent: -50, yPercent: -50,
          scale: 1, opacity: 1,
          duration: 0.6, ease: 'power3.out',
        });
      }
    } else {
      gsap.to(imageRevealRef.current, {
        xPercent: -50, yPercent: -50,
        scale: 0.88, opacity: 0,
        duration: 0.4, ease: 'power2.inOut',
      });
    }
  }, [hoveredIndex]);

  const handleMobileTap = (index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-20 text-foreground md:px-12 md:py-42 overflow-hidden"
    >
      {/* Label */}
      <div className="absolute left-6 top-12 flex items-center gap-4 font-mono  text-xs font-black uppercase tracking-tight text-foreground md:left-12 md:top-16 md:text-5xl lg:text-6xl">
        <div className="h-[2px] w-8 bg-foreground md:w-16" />
        <span>My Services</span>
      </div>

      {/* Desktop floating image */}
      <div
        ref={imageRevealRef}
        className="pointer-events-none fixed left-1/2 top-0 z-50 hidden h-[34vh] w-[28vw] max-w-[340px] overflow-hidden opacity-0 md:block rounded-xl  "
        style={{ transform: 'translate(-50%, -50%) scale(0.88)' }}
      >
        {expertiseItems.map((item, index) => (
          <div
            key={`img-${index}`}
            className={`absolute inset-0 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image src={item.image} alt={item.title} fill className="object-cover" sizes="28vw" />
          </div>
        ))}
      </div>

      {/* List */}
      <div className="z-10 flex w-full flex-col items-center">
        {expertiseItems.map((item, index) => (
          <div
            key={index}
            className="expertise-item group relative w-full cursor-pointer border-b border-foreground/10 first:border-t"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleMobileTap(index)}
          >
            {/* Row */}
            <div className="flex w-full items-center justify-between gap-4 px-2 py-4 md:px-0 md:py-5">
              <span className="font-mono text-[10px] tabular-nums text-foreground/30 shrink-0 md:text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <div className={`flex-1 font-display font-bold uppercase tracking-tighter leading-none overflow-hidden transition-colors duration-300 text-[8vw] sm:text-[6vw] md:text-[4.5vw] ${
                hoveredIndex === null ? 'text-foreground' : hoveredIndex === index ? 'text-foreground' : 'text-foreground/20'
              }`}>
                <div className="relative h-[1em] overflow-hidden">
                  <div className={`transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredIndex === index ? '-translate-y-full' : 'translate-y-0'}`}>
                    {item.title}
                  </div>
                  <div className={`absolute inset-0 italic transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredIndex === index ? 'translate-y-0' : 'translate-y-full'}`}>
                    {item.title}
                  </div>
                </div>
              </div>

              {/* Desc tag */}
              <span className={`font-mono text-[9px] tracking-widest text-foreground/50 text-right shrink-0 max-w-[100px] leading-relaxed md:max-w-none md:transition-all md:duration-300 ${hoveredIndex === index ? 'md:opacity-100 md:text-green-500' : 'md:opacity-40'}`}>
                {item.desc}
              </span>

              {/* Arrow / chevron */}
              <svg
                className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-all duration-300 ${
                  expandedIndex === index ? 'rotate-90 text-green-500' : hoveredIndex === index ? 'translate-x-1 text-green-500 hidden md:block' : 'text-foreground/20 hidden md:block'
                } block md:hidden`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
              <svg
                className={`hidden md:block w-5 h-5 shrink-0 transition-all duration-300 ${hoveredIndex === index ? 'translate-x-1 text-green-500' : 'text-foreground/20'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>

            {/* Mobile expandable image */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${expandedIndex === index ? 'max-h-[50vw] mb-4 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="relative w-full h-[45vw] rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
                <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest text-white/70 uppercase">
                  {item.desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-4 font-mono text-[10px] uppercase tracking-widest opacity-20 md:right-12 md:bottom-8">
        Available for projects
      </div>
    </section>
  );
}
