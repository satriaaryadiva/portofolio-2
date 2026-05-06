'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const showcaseItems = [
  {
    title: 'Impact.',
    desc: 'Creating solutions that actually make a difference in how people interact with technology.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Aesthetics.',
    desc: 'Because beautiful design builds trust and elevates the human experience.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Connection.',
    desc: 'Bridging the gap between complex systems and intuitive user journeys.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Evolution.',
    desc: 'Constantly pushing the boundaries of what is possible on the web.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Get total width to scroll (total width of track minus viewport width)
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`, // The duration of the scroll
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates on resize
        }
      });

      // Horizontal Scroll Animation
      tl.to(track, {
        x: getScrollAmount,
        ease: 'none',
      }, 0);
      
      // Image Parallax within the horizontal scroll
      const images = gsap.utils.toArray('.showcase-img');
      if (images.length) {
        tl.to(images, {
            xPercent: -20,
            ease: 'none',
        }, 0);
      }

      // Refresh ScrollTrigger after a short delay to account for layout shifts
      // caused by lazy-loaded images in the added projects above this section.
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);

    }, sectionRef);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className='relative h-screen w-full overflow-hidden bg-foreground text-background'
    >
      <div 
        ref={trackRef} 
        className='absolute left-0 top-0 flex h-full items-center pl-6 md:pl-12 pr-[10vw]'
        style={{ width: 'max-content' }}
      >
          
        {/* Intro text block inside the track */}
        <div className='flex h-full w-[80vw] flex-col justify-center pr-12 md:w-[50vw] md:pr-24'>
           <h2 className='font-display text-5xl uppercase leading-[1.1] md:text-8xl'>
               What  <br/> Matters To Me
           </h2>
           <p className='mt-8 max-w-sm font-primary text-lg opacity-90'>
               A personal exploration of why I design and build. It's more than just writing code; it's about solving real problems and creating meaningful digital experiences.
           </p>
        </div>

        {/* Gallery Items */}
        <div className='flex h-[70vh] gap-12 md:gap-24'>
          {showcaseItems.map((item, index) => (
            <div 
              key={index} 
              className='group relative flex h-full w-[90vw] flex-col justify-between overflow-hidden md:w-[45vw]'
            >
              {/* Image Container */}
              <div className='relative h-[80%] w-full overflow-hidden  '>
                 <div className='absolute left-[-10%] top-0 h-full w-[120%]'>
                     <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className='showcase-img object-cover transition-all duration-700  '
                        sizes="100vw"
                     />
                 </div>
              </div>
              
              {/* Text Meta */}
              <div className='flex w-full items-end justify-between pt-6 border-b border-background  pb-4'>
                 <div>
                    <h3 className='font-display text-3xl uppercase md:text-5xl'>{item.title}</h3>
                 </div>
                 <p className='max-w-[200px] text-right font-mono text-[10px] uppercase font-bold  md:text-xs'>
                     {item.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
