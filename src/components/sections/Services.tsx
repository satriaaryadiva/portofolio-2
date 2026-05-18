'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    id: '01',
    title: 'STRATEGY',
    subtitle: 'Discovery & Architecture',
    description: 'I don\'t just build; I engineer solutions. By deep-diving into your brand\'s core, I map out a technical and visual architecture designed to dominate your niche.',
    bg: 'bg-background',
    text: 'text-foreground',
    accent: 'text-green-500',
    numberColor: 'text-foreground/5',
  },
  {
    id: '02',
    title: 'DESIGN',
    subtitle: 'Premium Aesthetics',
    description: 'Aesthetic excellence is non-negotiable. We craft editorial-grade, visually striking interfaces that immediately establish trust and position you as an industry leader.',
    bg: 'bg-foreground',
    text: 'text-background',
    accent: 'text-green-500',
    numberColor: 'text-background/5',
  },
  {
    id: '03',
    title: 'MOTION',
    subtitle: 'Fluid Interactions',
    description: 'Static is dead. We breathe life into the experience using robust Next.js architecture paired with fluid, hardware-accelerated GSAP animations that leave users in awe.',
    bg: 'bg-green-500',
    text: 'text-black',
    accent: 'text-black/70',
    numberColor: 'text-green-400',
  },
  {
    id: '04',
    title: 'LAUNCH',
    subtitle: 'Deployment & Scale',
    description: 'i deploy lightning-fast, highly optimized web experiences. From SEO perfection to flawless accessibility, your platform is primed for exponential growth.',
    bg: 'bg-background',
    text: 'text-foreground',
    accent: 'text-green-500',
    numberColor: 'text-foreground/5',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<Element>('.stack-card');

      // Global Scroll Progress Bar
      gsap.to('.process-progress-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      cards.forEach((card: Element, index) => {
        const isLast = index === cards.length - 1;
        const inner = card.querySelector('.card-inner');
        const bgNum = card.querySelector('.bg-number');
        const orb = card.querySelector('.card-orb');

        // Background Number Parallax
        if (bgNum) {
          gsap.to(bgNum, {
            y: '-15vh',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        }

        // Orb Slow Rotation & Float
        if (orb) {
          gsap.to(orb, {
            rotation: 360,
            scale: 1.2,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }

        if (!isLast) {
          // The pin animation: The card pins, and its inner content scales down and blurs
          gsap.to(inner, {
            scale: 0.85,
            opacity: 0,
            filter: 'blur(15px)',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top top',
              end: 'bottom top', 
              scrub: true,
              pin: true,
              pinSpacing: false, // Magic: next card scrolls over it
            },
          });
        }
      });

      // Animate contents of each card on enter
      cards.forEach((card: Element) => {
        const content = card.querySelectorAll('.card-content-anim');
        const titleInner = card.querySelector('.title-inner');

        gsap.from(content, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
          }
        });

        if (titleInner) {
          gsap.fromTo(titleInner, 
            { y: '120%', rotate: 5, opacity: 0 },
            {
              y: '0%',
              rotate: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-20">
      
      {/* Global Scroll Progress Indicator (Desktop only) */}
   

      {/* Section Header */}
      <div className="relative z-10 px-6 md:px-12 mb-20 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-6">
          ( THE PROCESS )
        </h2>
        <h3 className="font-display text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter text-balance">
          How I Create <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">Masterpieces</span>
        </h3>
      </div>

      {/* Full Screen Stacking Cards Container */}
      <div className="relative w-full">
        {processSteps.map((step) => (
          <div 
            key={step.id} 
            className={`stack-card relative w-full h-dvh flex items-center justify-center overflow-hidden ${step.bg} ${step.text} border-t border-border/10`}
          >
            {/* Ambient Background Orb */}
            <div className={`card-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] opacity-10 pointer-events-none ${step.accent.replace('text-', 'bg-')}`} />

            {/* The scaled down inner wrapper */}
            <div className="card-inner absolute inset-0 w-full h-full flex items-center justify-center origin-top">
              
              {/* Massive Background Title Ghost Text */}
              <div className={`bg-number absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-40%] font-display text-[22vw] md:text-[18vw] font-black leading-none opacity-[0.06] pointer-events-none select-none tracking-tighter ${step.text}`}>
                {step.title}
              </div>

              {/* Content Grid */}
              <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-24">
                
                {/* Left Side: Title & Subtitle */}
                <div className="flex flex-col items-start w-full md:w-1/2">
                  <div className={`card-content-anim font-mono text-[10px] md:text-sm uppercase tracking-widest px-4 py-2 rounded-full border border-current/20 ${step.accent} mb-6 bg-current/5 backdrop-blur-sm`}>
                    PHASE {step.id} · {step.subtitle}
                  </div>
                  
                  <h4 className="overflow-hidden pb-4 mb-2">
                    <div className="title-inner font-display text-6xl sm:text-5xl md:text-8xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85]">
                      {step.title}
                    </div>
                  </h4>
                </div>

                {/* Right Side: Description */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p className="card-content-anim font-sans text-lg sm:text-xl md:text-3xl leading-tight opacity-90 font-medium text-balance">
                    {step.description}
                  </p>
                  
                  {/* Decorative Elements */}
                  <div className="card-content-anim mt-8 md:mt-12 flex items-center gap-6 opacity-50">
                    <div className="h-px w-16 md:w-24 bg-current" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Systematic Execution</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
