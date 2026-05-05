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

const projects = [
  {
    title: 'SHOKA',
    badge: 'SHOKA',
    category: 'Landing Page & WebApp',
    image: '/images/shoka-ne.png',
    year: '2024',
    color: 'bg-yellow-400',
    textColor: 'text-black',
    imageClass: 'object-contain',
    bgClass: 'bg-[#f7df1e]',
  },
  {
    title: 'CHAИCE',
    badge: 'CHANCE',
    category: 'Motion Design',
    image: '/images/artifindo3.png',
    year: '2024',
    color: 'bg-blue-400',
    textColor: 'text-white',
    imageClass: 'object-contain',
    bgClass: 'bg-blue-400',
  },
  {
    title: 'SILVR',
    badge: 'SILVR',
    category: 'Fintech Solutions',
    image: '/images/purrheart.png',
    year: '2023',
    color: 'bg-cyan-500',
    imageClass: 'object-contain',
    bgClass: 'bg-fuchsia-700',
  },
  {
    title: 'intramuros',
    badge: 'INTRA',
    category: 'Editorial Design',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    color: 'bg-orange-500',
  },
];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<{title: string, color: string} | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Reveal (Staggered Grid)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        }
      });
      
      const items = gsap.utils.toArray('.project-item');
      
      tl.from('.projects-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .from(items, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.5');

      // Enhance Scroll Parallax for Images inside the containers
      items.forEach((item) => {
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

      // Add Column Parallax for even items (Desktop only using MatchMedia)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const evenItems = gsap.utils.toArray('.project-item:nth-child(even)');
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

    return () => ctx.revert();
  }, []);

  // Handle visibility transitions for the follower
  useEffect(() => {
    if (activeProject) {
      gsap.to(followerRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    } else {
      gsap.to(followerRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [activeProject]);

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

      <div className='projects-header mb-20 flex flex-col items-start justify-between border-b border-border pb-10 md:flex-row md:items-end'>
        <h2 className='font-mono text-5xl font-bold uppercase tracking-tighter md:text-7xl'>
          Selected <br /> Works
        </h2>
        <div className='mt-6 font-mono text-xs uppercase tracking-widest md:mt-0 opacity-60'>
          Projects in 2024
        </div>
      </div>

      <div className='grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-12'>
        {projects.map((project, index) => (
          <div 
            key={index} 
            className='project-item group relative cursor-pointer overflow-hidden  '
            onMouseEnter={() => setActiveProject({ title: project.title, color: project.color })}
            onMouseLeave={() => setActiveProject(null)}
          >
            {/* Image Container matching screenshot style */}
            <div className={`relative aspect-square overflow-hidden ${project.bgClass || 'bg-muted'}`}>
              <div className='project-img h-full w-full transition-all duration-700 ease-out group-hover:scale-90'>
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
              
              {/* Central Title Overlay (Screenshot Style) */}
              <div className='absolute inset-0 flex items-center justify-center p-8'>
                <h3 className={`font-heading text-6xl font-bold uppercase tracking-tighter opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 md:text-8xl ${project.textColor || 'text-white'}`}>
                 </h3>
              </div>

              {/* Static Badge at Bottom Right (Screenshot Style) */}
              <div className={`absolute bottom-6 right-6 ${project.color} ${project.textColor || 'text-white'} px-4 py-2 font-bold uppercase tracking-tighter text-sm -rotate-6 shadow-xl transition-transform duration-500 group-hover:scale-110`}>
                {project.badge}
              </div>
            </div>
            
            {/* Bottom Info Bar */}
            <div className='mt-6 flex items-start justify-between pb-4 border-b  md:mt-8'>
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
          </div>
        ))}
      </div>
    </section>
  );
}
