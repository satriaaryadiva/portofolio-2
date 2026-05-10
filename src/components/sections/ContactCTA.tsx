 
'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const email = "satriaarya125@gmail.com"; 

  const sectionRef = useRef<HTMLElement>(null);
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLHeadingElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Breathing background glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.5,
          opacity: 0.15,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Section Wrapper Entrance
      gsap.fromTo(sectionWrapperRef.current, 
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      // Copy Intro Entrance
      if (copyRef.current) {
        gsap.from(copyRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Extreme Scrubbing Parallax for Massive Text
      gsap.fromTo(topTextRef.current, 
        { x: '-20vw', opacity: 0, scale: 0.9, rotation: -2, skewX: 5 }, 
        { 
          x: '0vw', 
          opacity: 1,
          scale: 1,
          rotation: 0,
          skewX: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(bottomTextRef.current, 
        { x: '20vw', opacity: 0, scale: 0.9, rotation: 2, skewX: -5 }, 
        { 
          x: '0vw', 
          opacity: 1,
          scale: 1,
          rotation: 0,
          skewX: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1.5,
          }
        }
      );

      // Link Entrance
      gsap.from(linkRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-background text-foreground py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden cursor-default transition-colors duration-300 border-t border-border">
      
      {/* Background Breathing Glow */}
      <div 
        ref={glowRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-foreground/5 md:bg-foreground/10 blur-[100px] md:blur-[140px] rounded-full pointer-events-none" 
      />

      <div ref={sectionWrapperRef} className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center px-4 overflow-hidden origin-center relative z-10">
        
        {/* Copywriting Section */}
        <div ref={copyRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-foreground/5 backdrop-blur-md text-xs font-mono uppercase tracking-widest mb-8 hover:bg-foreground/10 transition-colors duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h3 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-balance leading-[1.1]">
            Got a project in mind? <br className="hidden md:block" />
            <span className="text-muted-foreground">Let's create </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 animate-[pulse_4s_ease-in-out_infinite]">magic.</span>
          </h3>
          
          <p className="font-sans text-base md:text-xl opacity-70 leading-relaxed text-balance max-w-2xl mx-auto">
            Whether you have a clear vision or need a strategic partner to figure it out, 
            I'm here to craft premium, high-performance digital experiences that elevate your brand and drive real results.
          </p>
        </div>

        {/* The Expanding Hover Interaction */}
        <div 
          onClick={handleCopy}
          className="group flex flex-col items-center justify-center cursor-pointer w-full relative"
        >
           {/* Top Text */}
           <h2 ref={topTextRef} className="font-display text-[16vw] md:text-[14vw] leading-[0.8] md:leading-[0.75] font-black uppercase tracking-tighter z-20 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-2 md:group-hover:-translate-y-6">
             LET'S
           </h2>

           {/* The Expanding Middle Area */}
           <div className="w-[90vw] md:w-[70vw] max-w-[900px] h-[80px] md:h-0 overflow-hidden md:group-hover:h-[200px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] relative z-10 rounded-[100px] my-4 md:my-0 md:group-hover:my-8 bg-foreground text-background shadow-2xl ring-1 ring-foreground/10 group-hover:ring-foreground/30">
               
               {/* Decorative Inner Glow / Gradient */}
               <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

               {/* Content inside the expanded pill */}
               <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full px-4">
                  <span className={`flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] delay-100 ${copied ? 'opacity-0 -translate-y-4' : 'opacity-50 translate-y-0'}`}>
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <span className="md:hidden">TAP TO COPY EMAIL</span>
                    <span className="hidden md:inline">CLICK TO COPY EMAIL</span>
                  </span>
                  <span className={`font-display text-lg sm:text-2xl md:text-5xl lg:text-6xl font-bold mt-1 md:mt-2 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${copied ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    {email}
                  </span>

                  {/* Copied State Overlay */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                     <span className="flex items-center gap-2 font-display text-2xl md:text-6xl font-black uppercase text-green-500 tracking-tight">
                       <svg className="w-6 h-6 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                       COPIED!
                     </span>
                  </div>
               </div>
           </div>

           {/* Bottom Text */}
           <h2 ref={bottomTextRef} className="font-display text-[16vw] md:text-[14vw] leading-[0.8] md:leading-[0.75] font-black uppercase tracking-tighter z-20 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-2 md:group-hover:translate-y-6">
             TALK.
           </h2>
        </div>

        {/* WhatsApp Link below */}
        <div ref={linkRef} className="mt-16 md:mt-24 flex flex-col items-center gap-6">
           <a 
             href="https://wa.me/6283867691938" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group relative inline-flex items-center space-x-4 bg-foreground text-background px-8 py-4 rounded-full font-mono text-xs md:text-sm uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl hover:shadow-green-500/10"
           >
             {/* Slide-up gradient background on hover */}
             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-emerald-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
             
             <span className="relative z-10 flex items-center space-x-4">
               <span>Message on WhatsApp</span>
               <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </span>
           </a>
           <span className="font-sans text-xs md:text-sm opacity-50 flex items-center gap-2">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             Usually responds within an hour
           </span>
        </div>

      </div>
    </section>
  );
}
