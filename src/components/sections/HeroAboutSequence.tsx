'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import * as React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const nameString = "SATRIA ARYA DIVA";



export default function HeroAboutSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPlaceholderRef = useRef<HTMLDivElement>(null);
  const aboutPlaceholderRef = useRef<HTMLDivElement>(null);
  const flyingImgRef = useRef<HTMLDivElement>(null);
  
  const heroTextPlaceholderRef = useRef<HTMLDivElement>(null);
  const aboutTextPlaceholderRef = useRef<HTMLDivElement>(null);
  const flyingTextRef = useRef<HTMLDivElement>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      if (!flyingImgRef.current || !heroPlaceholderRef.current || !aboutPlaceholderRef.current || !heroTextPlaceholderRef.current || !flyingTextRef.current) return;

      // Helper to calculate absolute X/Y within the wrapper container
      const getContainerOffset = (el: HTMLElement) => {
        let x = 0; let y = 0;
        let curr: HTMLElement | null = el;
        while (curr && curr !== containerRef.current) {
          x += curr.offsetLeft;
          y += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement;
        }
        return { x, y };
      };

      // 1. Set Initial Positions for Image and Text
      const setInitialPos = () => {
        const hp = heroPlaceholderRef.current;
        if (!hp || !flyingImgRef.current) return;
        const initialPos = getContainerOffset(hp);
        gsap.set(flyingImgRef.current, {
          width: hp.offsetWidth,
          height: hp.offsetHeight,
          x: initialPos.x,
          y: initialPos.y,
          borderRadius: '4px',
        });
      };
      
      const setInitialTextPos = () => {
        const hp = heroTextPlaceholderRef.current;
        if (!hp || !flyingTextRef.current) return null;
        const initialPos = getContainerOffset(hp);
        
        gsap.set(flyingTextRef.current, {
          x: initialPos.x + hp.offsetWidth / 2, // Center align in hero
          y: initialPos.y,
          xPercent: -50,
          fontSize: window.innerWidth >= 768 ? '7.5vw' : '9vw',
        });
        return initialPos;
      };

      setInitialPos();
      const textInitialPos = setInitialTextPos();

      // 2. Entrance Animations
      if (textInitialPos) {
        gsap.fromTo(flyingTextRef.current, 
          { y: textInitialPos.y + 50, opacity: 0, scale: 0.95, filter: 'blur(10px)' },
          { y: textInitialPos.y, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power4.out', delay: 0.2 }
        );
      }

      gsap.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      );

      gsap.to('.scroll-indicator', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });

      // 3. The SEAMLESS Scroll Transition (Image moves from Hero to About!)
      gsap.to(flyingImgRef.current, {
        width: () => aboutPlaceholderRef.current?.offsetWidth || 0,
        height: () => aboutPlaceholderRef.current?.offsetHeight || 0,
        x: () => aboutPlaceholderRef.current ? getContainerOffset(aboutPlaceholderRef.current).x : 0,
        y: () => aboutPlaceholderRef.current ? getContainerOffset(aboutPlaceholderRef.current).y : 0,
        borderRadius: '8px', 
        ease: 'none', // linear feels most natural tied to scroll scrub
        scrollTrigger: {
          trigger: '.hero-section', 
          start: 'top top', 
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true, // Forces recalculation on resize
        }
      });

      // 3.5. The SEAMLESS Scroll Transition for TEXT (Hero to About!)
      gsap.fromTo(flyingTextRef.current, {
        x: () => {
          if (!heroTextPlaceholderRef.current) return 0;
          return getContainerOffset(heroTextPlaceholderRef.current).x + heroTextPlaceholderRef.current.offsetWidth / 2;
        },
        y: () => heroTextPlaceholderRef.current ? getContainerOffset(heroTextPlaceholderRef.current).y : 0,
        xPercent: -50,
        fontSize: () => window.innerWidth >= 768 ? '7.5vw' : '9vw',
      }, {
        x: () => aboutTextPlaceholderRef.current ? getContainerOffset(aboutTextPlaceholderRef.current).x : 0,
        y: () => aboutTextPlaceholderRef.current ? getContainerOffset(aboutTextPlaceholderRef.current).y : 0,
        xPercent: 0, // Left align in about
        fontSize: () => {
          if (!aboutTextPlaceholderRef.current) return '48px';
          return window.innerWidth >= 1024 ? '3.5vw' : '48px';
        },
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // 4. Kinetic Typography Parallax!
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo('.web-left', {
          x: '0vw', rotationZ: 0, skewX: 0, opacity: 1
        }, {
          x: '40vw', 
          rotationZ: 15,
          skewX: -20,
          opacity: 0,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
        
        gsap.fromTo('.dev-right', {
          x: '0vw', rotationZ: 0, skewX: 0, opacity: 1, scaleY: 1.3
        }, {
          x: '-20vw', 
          rotationZ: -15,
          skewX: 20,
          opacity: 0,
          scaleY: 1.3,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo('.web-left', {
          x: '0vw', rotationZ: 0, opacity: 1
        }, {
          x: '-10vw', 
          rotationZ: 10,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
        
        gsap.fromTo('.dev-right', {
          x: '0vw', rotationZ: 0, opacity: 1, scaleY: 1.3
        }, {
          x: '10vw', 
          rotationZ: -10,
          opacity: 0,
          scaleY: 1.3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
      
      // 5. Highlighter Text Scrub Reveal
      gsap.to('.about-text-scrub', {
        backgroundSize: '100% 100%',
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 50%',
          end: 'center center',
          scrub: true,
        }
      });

      // 5. Massive Background Text Parallax
      gsap.to('.about-bg-text', {
        y: '-20vh',
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background text-foreground transition-colors duration-500 overflow-hidden">
      
      {/* --- THE MASTER SHARED IMAGE --- */}
      {/* This element spans both dimensions smoothly because it is absolute purely to the sequence container! */}
      <div 
        ref={flyingImgRef} 
        className="absolute top-0 left-0 z-40 overflow-hidden pointer-events-auto cursor-pointer will-change-transform"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src='/images/satria.jpg'
          alt='Satria Arya Diva'
          fill
          className='object-cover   transition-all duration-300'
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>


      {/* --- THE MASTER SHARED TEXT --- */}
      <div 
        ref={flyingTextRef}
        className="absolute top-0 left-0 z-50 font-display font-black uppercase leading-none text-foreground origin-top-left whitespace-nowrap pointer-events-none will-change-transform"
      >
        {nameString}
      </div>


      {/* ==== HERO SECTION ==== */}
      <section className='hero-section relative flex h-screen w-full flex-col justify-center px-2 pt-10 md:pt-20'>

        <div className='hero-title-container z-20 w-full flex flex-col justify-center items-center px-2 overflow-visible relative' style={{ marginTop: '5vh' }}>
          {/* Invisible placeholder for the flying text */}
          <div ref={heroTextPlaceholderRef} className='w-full max-w-[95vw] h-[9vw] md:h-[7.5vw] opacity-0' />
          
          <div className='hero-subtitle mt-8 md:mt-16 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60 flex items-center justify-center gap-2'>
            <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>MEDAN , SUMATERA UTARA - INDONESIA</span>
          </div>
        </div>

        {/* CSS Grid for perfect layout centering on Desktop, Stack on Mobile */}
        <div className='relative z-30 flex-1 flex flex-col justify-center w-full'>
          <div className='w-full flex flex-col items-center justify-center gap-10 md:gap-0 md:grid md:grid-cols-3 px-4 md:px-12 mt-16 md:mt-0'>
            <div className='web-left text-center md:text-left font-display text-[15vw] md:text-[4vw] font-black uppercase leading-none z-20 w-full'>
              I AM WEB
            </div>
            
            <div className='relative flex flex-col items-center justify-center z-10 pointer-events-auto'>
              <span className='absolute -top-8 md:-top-10 font-mono text-[9px] uppercase tracking-widest opacity-70 w-max text-center'>
               
              </span>
              <div ref={heroPlaceholderRef} className='w-[60vw] h-[75vw] md:w-80 md:h-[40vh] opacity-0' />
            </div>

            <div className='dev-right text-center md:text-right font-display text-[13vw] md:text-[5vw] font-black uppercase leading-none z-20 w-full'>
              DEVELOPER
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-50 z-20'>
          <span className='font-mono text-[8px] md:text-[10px] uppercase tracking-widest mb-2'>SCROLL</span>
          <div className='scroll-indicator w-px h-12 bg-foreground/50'></div>
        </div>

      </section>

      {/* ==== ABOUT SECTION ==== */}
      <section id="about" className='about-section relative min-h-screen w-full px-4 pt-28 pb-20 md:px-12 md:py-40 flex items-start md:items-center overflow-hidden'>
        
        {/* Massive Background Typography */}
     

        <div className='mx-auto flex w-full max-w-[1400px] flex-col md:flex-row justify-between gap-8 md:items-stretch md:gap-24 relative z-10'>
          
          {/* Invisible Bounding Box placeholder for About target state */}
          <div className='w-full flex justify-center md:block md:w-[45%]'>
             <div ref={aboutPlaceholderRef} className='relative aspect-3/4 w-[70vw] sm:w-[60vw] md:w-full bg-muted/10 opacity-0 rounded-2xl' />
          </div>

          {/* Right Text Column */}
          <div className='flex w-full flex-col justify-center md:w-[55%] z-20 mt-6 md:mt-0'>
            <div className='about-reveal mb-8 flex items-center space-x-6 font-mono text-[10px] uppercase tracking-widest opacity-50 md:mb-12 md:text-xs'>
              <div className='h-px w-12 bg-foreground md:w-24' />
              <span>ABOUT ME</span>
            </div>

            <div className='mb-6 md:mb-8 relative'>
              {/* Invisible placeholder for the flying text to land on */}
              <h2 ref={aboutTextPlaceholderRef} className='about-reveal font-display text-5xl font-bold uppercase md:text-5xl lg:text-[3.5vw] opacity-0'>
                Satria Arya Diva
              </h2>
            </div>

            <div className='mb-6 md:mb-8'>
              <h3 className='about-reveal font-display text-lg md:text-xl font-medium tracking-tight text-muted-foreground  '>
                A Dedicated <span className='text-foreground underline decoration-1 underline-offset-4'>UI Developer</span>
              </h3>
            </div>

            <div className='max-w-xl space-y-8 md:space-y-10 font-sans text-sm leading-relaxed font-semibold md:text-lg'>
              <p 
                className='about-text-scrub inline-block bg-linear-to-r from-foreground to-foreground bg-no-repeat text-foreground/20' 
                style={{ backgroundSize: '0% 100%', WebkitBackgroundClip: 'text' }}
              >
                I specialize in crafting premium digital experiences and interactive designs built entirely from scratch. Rejecting cookie-cutter templates, I focus on building robust, high-performance web applications that leave a lasting impression.
              </p>
              <p 
                className='about-text-scrub inline-block bg-linear-to-r from-foreground to-foreground bg-no-repeat text-foreground/20' 
                style={{ backgroundSize: '0% 100%', WebkitBackgroundClip: 'text' }}
              >
                With a deep obsession for smooth animations, meticulous typography, and flawless user interactions, my goal is to bridge the gap between abstract design concepts and highly functional, production-ready code.
              </p>
            </div>



            {/* HOBBIES SECTION */}
            <div className='about-reveal mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 max-w-xl'>
              <span className='font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1 sm:mb-0 sm:mr-2'>
                BEYOND WORK —
              </span>
              <div className='flex flex-wrap gap-2'>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  ☕ COFFEE
                </div>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  💻 CODE
                </div>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  🎮 GAMING
                </div>
                <div className='border border-foreground/20 px-3 py-1.5 md:px-4 md:py-1.5 font-mono text-[12px] md:text-[15px] uppercase tracking-widest text-foreground/80 transition-all hover:bg-foreground hover:text-background cursor-grab'>
                  🎧 MUSIC
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className='about-reveal mt-12 flex flex-col sm:flex-row items-center gap-4 max-w-xl pt-4'>
              <a 
                href="#contact" 
                className='group flex w-full sm:w-auto items-center justify-center rounded-full bg-foreground px-8 py-4 transition-transform active:scale-95'
              >
                <span className='relative overflow-hidden font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-background inline-flex'>
                  <span className='block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full'>
                    LET&apos;S COLLAB
                  </span>
                  <span className='absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 italic text-center'>
                    LET&apos;S COLLAB
                  </span>
                </span>
              </a>

              <a 
                href="https://www.linkedin.com/in/satria-arya-diva-39242821" 
                target="_blank"
                rel="noopener noreferrer"
                className='group flex w-full sm:w-auto items-center justify-center rounded-full border border-foreground/30 px-8 py-4 transition-all hover:bg-foreground hover:text-background active:scale-95'
              >
                <span className='relative overflow-hidden font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-background inline-flex transition-colors'>
                  <span className='block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full'>
                    SAVE MY RESUME
                  </span>
                  <span className='absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 italic text-center'>
                    SAVE MY RESUME
                  </span>
                </span>
              </a>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl aspect-3/4 md:aspect-square rounded-xl overflow-hidden shadow-2xl scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src='/images/satria.jpg'
              alt='Satria Arya Diva Modal'
              fill
              className='object-cover'
              priority
            />
            <button 
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
