'use client';

'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect,useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const email = "satriaarya125@gmail.com"; 

  const sectionRef = useRef<HTMLElement>(null);
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const topTextRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLHeadingElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Section Wrapper Entrance (Scale & Fade)
      gsap.fromTo(sectionWrapperRef.current, 
        { scale: 0.9, opacity: 0 },
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

      // Subtitle Entrance
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Extreme Scrubbing Parallax for Massive Text
      gsap.fromTo(topTextRef.current, 
        { x: '-30vw', opacity: 0, scale: 0.8, rotation: -5, skewX: 10 }, 
        { 
          x: '0vw', 
          opacity: 1,
          scale: 1,
          rotation: 0,
          skewX: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(bottomTextRef.current, 
        { x: '30vw', opacity: 0, scale: 0.8, rotation: 5, skewX: -10 }, 
        { 
          x: '0vw', 
          opacity: 1,
          scale: 1,
          rotation: 0,
          skewX: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
    <section ref={sectionRef} className="relative w-full bg-background text-foreground py-20 md:py-20 flex flex-col items-center justify-center overflow-hidden cursor-default transition-colors duration-300 border-t border-border ">
      
      <div ref={sectionWrapperRef} className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center px-4 overflow-hidden origin-center">
        
        <p ref={subtitleRef} className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-16 md:mb-24">
          ( NEXT STEPS )
        </p>

        {/* The Expanding Hover Interaction */}
        <div 
          onClick={handleCopy}
          className="group flex flex-col items-center justify-center cursor-pointer w-full"
        >
           {/* Top Text */}
           <h2 ref={topTextRef} className="font-display text-[18vw] md:text-[14vw] leading-[0.75] font-black uppercase tracking-tighter z-20 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-4 md:group-hover:-translate-y-8">
             LET'S
           </h2>

           {/* The Expanding Middle Area */}
           <div className="w-[95vw] md:w-[70vw] max-w-[900px] h-0 overflow-hidden group-hover:h-[120px] md:group-hover:h-[200px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] relative z-10 rounded-[100px] my-0 group-hover:my-6 md:group-hover:my-8 bg-foreground text-background">
               
               {/* Content inside the expanded pill */}
               <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
                  <span className={`font-mono text-[9px] md:text-xs uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${copied ? 'opacity-0 -translate-y-4' : 'opacity-50 translate-y-0'}`}>
                    CLICK TO COPY EMAIL
                  </span>
                  <span className={`font-display text-2xl md:text-5xl lg:text-6xl font-bold mt-2 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${copied ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    {email}
                  </span>

                  {/* Copied State Overlay */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                     <span className="font-display text-3xl md:text-6xl font-black uppercase text-green-500 tracking-tight">
                       COPIED!
                     </span>
                  </div>
               </div>
           </div>

           {/* Bottom Text */}
           <h2 ref={bottomTextRef} className="font-display text-[18vw] md:text-[14vw] leading-[0.75] font-black uppercase tracking-tighter z-20 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-4 md:group-hover:translate-y-8">
             TALK.
           </h2>
        </div>

        {/* WhatsApp Link below */}
        <div ref={linkRef} className="mt-24 md:mt-32">
           <a 
             href="https://wa.me/6282245781440" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group relative inline-flex items-center space-x-3 font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
           >
             <span>PREFER WHATSAPP? MESSAGE ME DIRECTLY</span>
             <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
             <div className="absolute -bottom-2 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
           </a>
        </div>

      </div>
    </section>
  );
}
