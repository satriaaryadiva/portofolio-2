'use client';

import gsap from 'gsap';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const expertiseItems = [
  {
    title: 'ART DIRECTION',
    desc: 'VISION',
    image: 'https://images.unsplash.com/photo-1600585154340-be6199f50a09?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'BRANDING',
    desc: 'IDENTITY',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'WEBFLOW',
    desc: 'INTEGRATION',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'UI/UX DESIGN',
    desc: 'EXPERIENCE',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'GSAP ANIMATIONS',
    desc: 'MOTION',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: '3D & MOTION',
    desc: 'RENDER',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
 
  {
    title: 'SEO & CONTENT',
    desc: 'RANKING',
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Image reveals now statically positioned on the left, so we don't need mouse tracking

  useEffect(() => {
    if (!imageRevealRef.current) return;

    if (hoveredIndex !== null) {
      const items = containerRef.current?.querySelectorAll('.expertise-item');
      if (items && items[hoveredIndex]) {
        const el = items[hoveredIndex] as HTMLElement;
        const rect = el.getBoundingClientRect();
        const targetY = rect.top + rect.height / 2;

        gsap.to(imageRevealRef.current, {
          y: targetY,
          scale: 1,
          yPercent: -50,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    } else {
      gsap.to(imageRevealRef.current, {
        scale: 0.9,
        yPercent: -50,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }, [hoveredIndex]);

  return (
    <section 
      ref={containerRef}
      className='relative flex min-h-screen w-full flex-col items-center  justify-center bg-background px-6 py-20 text-foreground transition-colors duration-300 md:py-32'
    >
      <div className='absolute left-6 top-10 flex items-center space-x-6 font-mono text-[10px] uppercase tracking-widest opacity-50 md:left-12 md:top-20 md:text-xs'>
        <div className='h-px w-12 bg-foreground md:w-24' />
        <span className=''>MY SERVICES</span>
      </div>
      {/* Dynamic Cursor Image Reveal */}
      <div 
        ref={imageRevealRef}
        className='pointer-events-none fixed left-[5%] md:left-[10%] top-0 z-50 h-[32vh] w-[30vw] max-w-[320px] overflow-hidden rounded-xl opacity-0  '
        style={{ transform: 'translate(0, -50%) scale(0.9)' }}
      >
        {expertiseItems.map((item, index) => (
          <div 
            key={`img-${index}`} 
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className='object-cover transition-all duration-500'
              sizes='(max-width: 768px) 50vw, 33vw'
            />
          </div>
        ))}
      </div>

      <div className='z-10 flex w-full flex-col items-center group'>
        {expertiseItems.map((item, index) => (
          <div
            key={index}
            className='expertise-item relative cursor-pointer gap-20 
             text-center font-display text-[10vw] font-bold uppercase leading-[1.1] tracking-wide transition-all duration-300 md:text-[6.5vw]'
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className={`relative group/text inline-block transition-colors duration-500 ease-out h-[1.1em] overflow-hidden ${
                hoveredIndex === null 
                  ? 'text-foreground' 
                  : hoveredIndex === index 
                    ? 'text-foreground' 
                    : 'text-foreground/20'
              }`}
            >
              <div className={`transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredIndex === index ? 'translate-y-[-100%] skew-y-3' : 'translate-y-0'}`}>
                {item.title}
              </div>
              <div className={`absolute inset-0 italic transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredIndex === index ? 'translate-y-0 skew-y-0' : 'translate-y-[100%]'}`}>
                {item.title}
              </div>

              {/* Description text that appears on hover next to the title */}
              <span 
                className={`absolute left-[105%] top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] md:text-xs tracking-widest text-[#E1D4BB] transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Optional Side Label to match screenshot */}
      <div className='absolute bottom-8 right-12 hidden font-mono text-[10px] uppercase tracking-widest opacity-30 md:block'>
        LOS ANGELES, CA 22:50:51
      </div>
    </section>
  );
}
