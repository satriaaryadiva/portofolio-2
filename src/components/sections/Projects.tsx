'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useLayoutEffect, useRef, useState,useCallback } from 'react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'SHOKA',
    badge: 'SHOKA',
    category: 'Design & Landing Page ',
    image: '/images/shoka-ne.png',
    url: 'https://example.com/shoka',
    year: '2024',
    color: 'bg-yellow-400',
    textColor: 'text-black',
    imageClass: 'object-contain',
    bgClass: 'bg-[#f7df1e]',
  },
  {
    title: 'ARTIFINDO SOLAR',
    badge: 'ARTIFINDO SOLAR',
    category: 'Corporate Website',
    image: '/images/artifindo3.png',
    url: 'https://example.com/artifindo',
    year: '2024',
    color: 'bg-blue-400',
    textColor: 'text-white',
    imageClass: 'object-contain',
    bgClass: 'bg-blue-400',
  },
  {
    title: 'PURREHART',
    badge: 'PURRHEART',
    category: 'Web App LIVE Donation',
    image: '/images/purrheart.png',
    url: 'https://example.com/silvr',
    year: '2023',
    color: 'bg-cyan-500',
    imageClass: 'object-contain',
    bgClass: 'bg-black',
  },
  {
    title: 'primko',
    badge: 'PRIMKO MONEY MANAGEMENT',
    category: 'web app',
    image: '/images/primko.png',
    url: 'https://example.com/primko',
    year: '2025',
    color: 'bg-orange-500',
    textColor: 'text-white',
    imageClass: 'object-contain',
    bgClass: 'bg-orange-500',
  },
  {
    title: 'RUSINDO',
    badge: 'RUSINDO LOGISTICS',
    category: 'Corporate Website',
    image: '/images/rusindo1.png',
    url: 'https://example.com/rusindo',
    year: '2024',
    color: 'bg-emerald-400',
    textColor: 'text-white',
    imageClass: 'object-contain',
    bgClass: 'bg-emerald-600',
  },
  {
    title: 'ARTIFINDO',
    badge: 'ARTIFINDO SOLAR',
    category: 'Green Energy',
    image: '/images/hero-bg.png',
    url: 'https://example.com/artifindo-solar',
    year: '2024',
    color: 'bg-zinc-800',
    textColor: 'text-white',
    imageClass: 'object-cover',
    bgClass: 'bg-black',
  },
];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activeProject, setActiveProject] = useState<{title: string, color: string} | null>(null);
  
  const extraWrapperRef = useRef<HTMLDivElement>(null);
  const viewAllBtnRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLDivElement>(null);
  const extraTriggersRef = useRef<ScrollTrigger[]>([]);
  const isAnimatingRef = useRef(false);

  const applyTiltEffect = useCallback((items: any[]) => {
    items.forEach(item => {
      const el = item as HTMLElement;
      const imgWrapper = el.querySelector('.project-image-wrapper') as HTMLElement;
      const imgContainer = el.querySelector('.project-img') as HTMLElement;
      const badge = el.querySelector('.project-badge') as HTMLElement;
      const glare = el.querySelector('.project-glare') as HTMLElement;
      
      if (!imgWrapper || el.dataset.tiltApplied === 'true') return;
      
      el.dataset.tiltApplied = 'true';

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPct = (y / rect.height - 0.5) * 2; // -1 to 1
        
        // 1. Tilt the main wrapper
        gsap.to(imgWrapper, {
          rotateX: -yPct * 15,
          rotateY: xPct * 15,
          scale: 0.94,
          duration: 0.6,
          ease: 'power3.out',
          transformPerspective: 1200
        });

        // 2. Parallax the inner image (moves opposite to tilt for depth)
        if (imgContainer) {
          gsap.to(imgContainer, {
            x: -xPct * 25,
            y: -yPct * 25,
            scale: 1.1, // Zoom slightly to hide edges during parallax
            duration: 0.6,
            ease: 'power3.out',
          });
        }
        
        // 3. Float the badge out towards the user
        if (badge) {
          gsap.to(badge, {
            x: xPct * 30,
            y: yPct * 30,
            rotateX: -yPct * 20,
            rotateY: xPct * 20,
            translateZ: 50,
            duration: 0.6,
            ease: 'power3.out',
            transformPerspective: 1000
          });
        }

        // 4. Dynamic Glare Overlay
        if (glare) {
          const bgX = (x / rect.width) * 100;
          const bgY = (y / rect.height) * 100;
          gsap.to(glare, {
            background: `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`,
            duration: 0.2
          });
        }
      };

      const handleLeave = () => {
        gsap.to([imgWrapper, imgContainer, badge], {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          translateZ: 0,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)'
        });
      };

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  // Initial setup for the first 4 items
  useLayoutEffect(() => {
    // Initial GSAP setup for follower
    gsap.set(followerRef.current, { scale: 0, xPercent: -50, yPercent: -50 });

    ctxRef.current = gsap.context(() => {
      // 1. Entrance Reveal for Header
      gsap.to('.projects-title-line', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        },
        y: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
      });
      gsap.to('.projects-subtitle', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        },
        x: 0,
        opacity: 0.6,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Animate initial items
      const initialItems = gsap.utils.toArray('.project-initial');
      gsap.from(initialItems, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: initialItems[0] as HTMLElement,
          start: 'top 80%',
        }
      });
      
      applyTiltEffect(initialItems);

      // Enhance Scroll Parallax for Images
      initialItems.forEach((item) => {
        const el = item as HTMLElement;
        const img = el.querySelector('.project-img-inner');
        if (img) {
          gsap.fromTo(img, 
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
      });

      // Add Column Parallax for even items (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const evenItems = initialItems.filter(item => (item as HTMLElement).classList.contains('is-even'));
        evenItems.forEach((col) => {
          gsap.fromTo(col as HTMLElement,
            { y: 0 },
            {
              y: 120, // Parallax offset pushing right column down
              ease: 'none',
              scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        });
      });

      // 2. Cursor Follower Logic
      if (typeof window !== 'undefined') {
        const xSetter = gsap.quickTo(followerRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
        const ySetter = gsap.quickTo(followerRef.current, 'y', { duration: 0.6, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, container);

    return () => {
      ctxRef.current?.revert();
      extraTriggersRef.current.forEach(st => st.kill());
    };
  }, []);

  // Handle visibility transitions for the follower
  useEffect(() => {
    if (activeProject) {
      gsap.to(followerRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    } else {
      gsap.to(followerRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [activeProject]);

  const handleShowProjects = () => {
    if (isAnimatingRef.current || !extraWrapperRef.current || !viewAllBtnRef.current || !closeBtnRef.current) return;
    isAnimatingRef.current = true;

    const extraItems = gsap.utils.toArray('.project-extra');
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Setup ScrollTriggers for extra items after height is fully established
        extraItems.forEach((item) => {
          const el = item as HTMLElement;
          const img = el.querySelector('.project-img-inner');
          if (img) {
            const st = ScrollTrigger.create({
              trigger: el, start: 'top bottom', end: 'bottom top', scrub: true,
              animation: gsap.fromTo(img, { yPercent: -15 }, { yPercent: 15, ease: 'none' })
            });
            extraTriggersRef.current.push(st);
          }
        });
        
        applyTiltEffect(extraItems);

        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const evenItems = extraItems.filter(item => (item as HTMLElement).classList.contains('is-even'));
          evenItems.forEach((col) => {
            const st = ScrollTrigger.create({
              trigger: extraWrapperRef.current, 
              start: 'top bottom', end: 'bottom top', scrub: true,
              animation: gsap.fromTo(col as HTMLElement, { y: 0 }, { y: 120, ease: 'none' })
            });
            extraTriggersRef.current.push(st);
          });
        });
        
        // Show close button
        gsap.fromTo(closeBtnRef.current, { display: 'none', opacity: 0, y: 20 }, { display: 'flex', opacity: 1, y: 0, duration: 0.5 });
        
        ScrollTrigger.refresh();
        isAnimatingRef.current = false;
      }
    });

    // 1. Fade out View All Button
    tl.to(viewAllBtnRef.current, { opacity: 0, duration: 0.4, ease: 'power3.inOut', onComplete: () => { viewAllBtnRef.current!.style.display = 'none'; } }, 0);

    // 2. Animate wrapper height to auto
    tl.fromTo(extraWrapperRef.current, 
      { height: 0, opacity: 0 }, 
      { height: 'auto', opacity: 1, duration: 1.2, ease: 'power4.inOut' }, 
      0.1
    );

    // 3. Stagger items in
    tl.fromTo(extraItems, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out' }, 
      0.4
    );
  };

  const handleHideProjects = () => {
    if (isAnimatingRef.current || !extraWrapperRef.current || !viewAllBtnRef.current || !closeBtnRef.current) return;
    isAnimatingRef.current = true;

    const extraItems = gsap.utils.toArray('.project-extra');
    
    // Kill existing extra ScrollTriggers so they don't break during height collapse
    extraTriggersRef.current.forEach(st => st.kill());
    extraTriggersRef.current = [];

    const tl = gsap.timeline({
      onComplete: () => {
        // Show View All Button again
        viewAllBtnRef.current!.style.display = 'block';
        gsap.to(viewAllBtnRef.current, { opacity: 1, duration: 0.5 });
        
        // Scroll back up to the top of the projects section smoothly
        if (container.current) {
          const headerOffset = window.innerWidth > 768 ? 100 : 50;
          const elementPosition = container.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        
        setTimeout(() => ScrollTrigger.refresh(), 100);
        isAnimatingRef.current = false;
      }
    });

    // 1. Hide Close Button
    tl.to(closeBtnRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power3.in', onComplete: () => { closeBtnRef.current!.style.display = 'none'; } }, 0);

    // 2. Animate items out
    tl.to(extraItems, { y: 50, opacity: 0, stagger: -0.05, duration: 0.5, ease: 'power2.in' }, 0);

    // 3. Collapse wrapper height
    tl.to(extraWrapperRef.current, { height: 0, opacity: 0, duration: 1, ease: 'power4.inOut' }, 0.4);
  };

  return (
    <section 
      id='work' 
      ref={container}
      className='relative bg-background text-foreground px-6 py-20 md:px-12 md:py-32 transition-colors duration-300'
    >
      {/* Dynamic Cursor Tag */}
      <div 
        ref={followerRef}
        className={`pointer-events-none rotate-12 fixed left-0 top-0 z-50 flex items-center justify-center rounded-sm px-6 py-2 opacity-0 -translate-x-1/2 -translate-y-1/2 shadow-2xl transition-colors duration-300 ${activeProject?.color || 'bg-primary'}`}
        style={{ transform: 'translate(-50%, -50%) scale(0)' }}
      >
        <span className='font-heading  text-lg uppercase tracking-tight text-white'>
          {activeProject?.title || ''}
        </span>
      </div>

      <div className='mb-20 flex flex-col items-start justify-between border-b border-border pb-10 md:flex-row md:items-end'>
        <h2 className='font-mono text-5xl font-bold uppercase tracking-tighter md:text-7xl'>
          <div className='overflow-hidden pb-2'><div className='projects-title-line translate-y-[120%] rotate-3 opacity-0'>Selected</div></div>
          <div className='overflow-hidden pb-2'><div className='projects-title-line translate-y-[120%] rotate-3 opacity-0'>Works</div></div>
        </h2>
        <div className='projects-subtitle mt-6 font-mono text-xs uppercase tracking-widest opacity-0 translate-x-10 md:mt-0'>
          Projects in 2024
        </div>
      </div>

      {/* INITIAL PROJECTS GRID */}
      <div className='grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 md:gap-x-12 md:gap-y-12 md:pb-32'>
        {projects.slice(0, 4).map((project, index) => {
          return (
            <Link 
              key={project.title + index} 
              href={project.url}
              target="_blank"
              className={`project-item project-initial group relative block cursor-pointer overflow-visible ${index % 2 !== 0 ? 'is-even' : ''}`}
              onMouseEnter={() => setActiveProject({ title: project.title, color: project.color })}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Image Container */}
              <div className={`project-image-wrapper relative aspect-square overflow-hidden rounded-sm ${project.bgClass || 'bg-muted'}`}>
                <div className='project-img h-full w-full transition-all duration-700 ease-out'>
                  <div className='project-img-inner absolute inset-0 top-[-5%] h-[110%] w-full'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      className={project.imageClass || 'object-cover'}
                    />
                  </div>
                </div>
                
                <div className='absolute inset-0 flex items-center justify-center p-8 pointer-events-none'>
                  <h3 className={`font-heading text-6xl font-bold uppercase tracking-tighter opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 md:text-8xl ${project.textColor || 'text-white'}`}>
                   </h3>
                </div>

                {/* Dynamic Glare Overlay */}
                <div className="project-glare pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)' }}></div>

                <div className={`project-badge absolute bottom-6 right-6 ${project.color} ${project.textColor || 'text-white'} px-4 py-2 font-bold uppercase tracking-tighter text-sm -rotate-6 shadow-xl transition-transform duration-500 pointer-events-none`}>
                  {project.badge}
                </div>
              </div>
              
              {/* Bottom Info Bar */}
              <div className='mt-6 flex items-start justify-between pb-4 border-b md:mt-8'>
                <div>
                  <h4 className='group/text relative block overflow-hidden font-display text-xl tracking-widest font-bold uppercase md:text-2xl'>
                    <div className='relative overflow-hidden h-[1em] block font-mono text-[9px] uppercase tracking-widest text-[#E1D4BB] opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <div className='transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full group-hover:skew-y-3'>
                        [ VIEW PROJECT ]
                      </div>
                    </div>
                    <div className='transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full group-hover:skew-y-3'>
                      {project.title}
                    </div>
                    <div className='absolute inset-0 translate-y-full italic transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:skew-y-0'>
                      {project.title}
                    </div>
                  </h4>
                  <p className='mt-1 font-mono text-[10px] uppercase tracking-widest opacity-90'>
                    {project.category}
                  </p>
                </div> 
                <div className='font-mono text-xs opacity-90'>
                  {project.year}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* EXTRA PROJECTS WRAPPER (GSAP ANIMATED HEIGHT) */}
      <div ref={extraWrapperRef} className='w-full overflow-hidden' style={{ height: 0, opacity: 0 }}>
        <div className='grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 md:gap-x-12 md:gap-y-12 md:pb-32'>
          {projects.slice(4).map((project, index) => {
            const globalIndex = index + 4;
            return (
              <Link 
                key={project.title + globalIndex} 
                href={project.url}
                target="_blank"
                className={`project-item project-extra group relative block cursor-pointer overflow-visible ${globalIndex % 2 !== 0 ? 'is-even' : ''}`}
                onMouseEnter={() => setActiveProject({ title: project.title, color: project.color })}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Image Container */}
                <div className={`project-image-wrapper relative aspect-square overflow-hidden rounded-sm ${project.bgClass || 'bg-muted'}`}>
                  <div className='project-img h-full w-full transition-all duration-700 ease-out'>
                    <div className='project-img-inner absolute inset-0 top-[-5%] h-[110%] w-full'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        className={project.imageClass || 'object-cover'}
                      />
                    </div>
                  </div>
                  
                  <div className='absolute inset-0 flex items-center justify-center p-8 pointer-events-none'>
                    <h3 className={`font-heading text-6xl font-bold uppercase tracking-tighter opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 md:text-8xl ${project.textColor || 'text-white'}`}>
                     </h3>
                  </div>

                  {/* Dynamic Glare Overlay */}
                  <div className="project-glare pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)' }}></div>

                  <div className={`project-badge absolute bottom-6 right-6 ${project.color} ${project.textColor || 'text-white'} px-4 py-2 font-bold uppercase tracking-tighter text-sm -rotate-6 shadow-xl transition-transform duration-500 pointer-events-none`}>
                    {project.badge}
                  </div>
                </div>
                
                {/* Bottom Info Bar */}
                <div className='mt-6 flex items-start justify-between pb-4 border-b md:mt-8'>
                  <div>
                    <h4 className='group/text relative block overflow-hidden font-display text-xl tracking-widest font-bold uppercase md:text-2xl'>
                      <div className='relative overflow-hidden h-[1em] block font-mono text-[9px] uppercase tracking-widest text-[#E1D4BB] opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                        <div className='transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full group-hover:skew-y-3'>
                          [ VIEW PROJECT ]
                        </div>
                      </div>
                      <div className='transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full group-hover:skew-y-3'>
                        {project.title}
                      </div>
                      <div className='absolute inset-0 translate-y-full italic transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:skew-y-0'>
                        {project.title}
                      </div>
                    </h4>
                    <p className='mt-1 font-mono text-[10px] uppercase tracking-widest opacity-90'>
                      {project.category}
                    </p>
                  </div> 
                  <div className='font-mono text-xs opacity-90'>
                    {project.year}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* VIEW ALL BUTTON (MASSIVE EDITORIAL) */}
      {projects.length > 4 && (
        <div ref={viewAllBtnRef} className='w-full'>
          <button 
            onClick={handleShowProjects}
            className='group relative flex w-full cursor-pointer items-center justify-between border-y border-foreground/10 py-12 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-foreground hover:text-background hover:px-8 md:py-20 md:hover:px-12 overflow-hidden'
          >
             <h2 className='relative z-10 text-left font-heading text-5xl font-bold font-mono uppercase leading-[0.9] tracking-tighter transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-4 md:text-8xl lg:text-[10rem]'>
               View All <br className='hidden md:block' /> Works
             </h2>
             
             <div className='relative z-10 flex flex-col items-end gap-6 md:gap-8'>
               <div className='flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:rotate-90 group-hover:scale-110 group-hover:border-background group-hover:bg-background group-hover:text-foreground md:h-32 md:w-32'>
                  <svg className='h-6 w-6 md:h-12 md:w-12' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
               </div>
               <p className='font-mono text-[9px] uppercase tracking-widest opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:text-xs'>
                 [{projects.length - 4} Hidden Projects]
               </p>
             </div>
             
             {/* Hidden abstract overlay text that reveals on hover */}
             <div className='pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 whitespace-nowrap font-heading text-[15rem] font-bold tracking-tighter text-background/10 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8 group-hover:opacity-100 md:text-[20rem]'>
               EXPLORE EXPLORE
             </div>
             <div className='pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-transparent via-foreground/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100'></div>
          </button>
        </div>
      )}

      {/* CLOSE ARCHIVE BUTTON */}
      <div ref={closeBtnRef} className='mt-12 flex w-full justify-center pb-12' style={{ display: 'none', opacity: 0 }}>
        <button 
          onClick={handleHideProjects}
          className='group flex cursor-pointer items-center justify-center gap-4 rounded-full border border-foreground/20 bg-transparent px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background'
        >
          <span>Close Archive</span>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-all duration-500 group-hover:bg-background group-hover:text-foreground group-hover:-translate-y-1'>
             <svg className='h-4 w-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
             </svg>
          </div>
        </button>
      </div>

    </section>
  );
}
