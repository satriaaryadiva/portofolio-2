'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Letter configuration mapping to images
const nameString = "SATRIA ARYA DIVA";

// Map some specific indexes to have hover images next to them
const letterImages: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', // after A
  7: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop', // after R
  12: 'https://images.unsplash.com/photo-1600585154340-be6199f50a09?q=80&w=600&auto=format&fit=crop', // after D
};

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState('');

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for letters
      gsap.from('.hero-letter', {
        y: '80%',
        opacity: 0,
        rotateZ: 5,
        stagger: 0.03,
        duration: 1,
        ease: 'power4.out',
        delay: 0.1,
      });

      // 2. Scroll Zoom Transition (The bridge to About)
      // When scrolling down, the central image scales up massive to cover the screen
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(zoomImageRef.current, {
          scale: 15, // Scale 15x covers most monitors completely
          y: '60%', // Adjust Y so it stays near center during pin
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=120%', // Scroll distance to complete zoom
            scrub: true,
            pin: true, // Pins the section so you scroll "into" the image
          }
        });
      });
      
      // Fallback for smaller screens
      mm.add("(max-width: 767px)", () => {
         gsap.to(zoomImageRef.current, {
          scale: 8,
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
          }
        });
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container}
      className='relative flex h-screen w-full flex-col justify-center overflow-hidden bg-background text-foreground transition-[color,background-color] duration-500 pt-20 pb-8 md:pt-32'
    >
    

      {/* Main Massive Name: Split into characters with flex inline scaling */}
      <div className='z-20 mt-16 w-full flex justify-center items-center px-2 sm:px-6'>
        <div className='flex flex-wrap justify-center w-full font-display text-[13vw] md:text-[9vw] lg:text-[7.6vw] font-bold uppercase tracking-tighter lood  text-foreground'>
   
          {nameString}
         
        
          
        </div>
      </div>

      {/* Sub Title */}
      <div className='w-full text-center mt-12 mb-auto z-10'>
         <span className='font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60'>
           PORTFOLIO 2026
         </span>
      </div>

      {/* Bottom Text & Zoom Image */}
      <div className='relative z-30 mt-auto flex w-full items-end justify-around px-6 pt-20 md:px-12'>
        
        <div className='font-display text-5xl md:text-8xl font-bold uppercase  '>
          WEB
        </div>

        {/* The Scroll Zoom Image positioned absolute center of this flex row */}
        <div className='absolute m-auto top-1/2 -translate-x-1/2 -translate-y-1/2' style={{ zIndex: 100 }}>
          <div 
            ref={zoomImageRef}
            className='relative w-32 h-32 md:w-56 md:h-56  overflow-hidden shadow-2xl will-change-transform'
          >
            <Image
              src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1200&auto=format&fit=crop'
              alt='Transition image'
              fill
              className='object-cover'
              priority
              sizes='(max-width: 768px) 50vw, 30vw'
            />
          </div>
        </div>

        <div className='font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-right'>
          DEVELOPER
        </div>
        
      </div>

    </section>
  );
}
