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
    title: 'Precision.',
    desc: 'Every pixel, every line meticulously calculated to serve a purpose.',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Scale.',
    desc: 'Designing systems that grow seamlessly with your ambitions.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Light.',
    desc: 'Harnessing contrast to guide the eye and tell the right story.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6199f50a09?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Form.',
    desc: 'Eliminating the unnecessary so the necessary may speak.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Get total width to scroll (total width of track minus viewport width)
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      // Horizontal Scroll Animation
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`, // The duration of the scroll
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on resize
      });
      
      // Image Parallax within the horizontal scroll
      const images = gsap.utils.toArray('.showcase-img');
      images.forEach((img) => {
          gsap.to(img as HTMLElement, {
              xPercent: -20,
              ease: 'none',
              scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: () => `+=${getScrollAmount() * -1}`,
                  scrub: 1,
              }
          });
      });

    }, sectionRef);

    return () => ctx.revert();
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
               Our <br/> Perspective
           </h2>
           <p className='mt-8 max-w-sm font-primary text-lg opacity-60'>
               A visual exploration of the core tenets that drive our studio's design philosophy. Scroll to discover.
           </p>
        </div>

        {/* Gallery Items */}
        <div className='flex h-[70vh] gap-12 md:gap-24'>
          {showcaseItems.map((item, index) => (
            <div 
              key={index} 
              className='group relative flex h-full w-[70vw] flex-col justify-between overflow-hidden md:w-[45vw]'
            >
              {/* Image Container */}
              <div className='relative h-[80%] w-full overflow-hidden shadow-2xl'>
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
              <div className='flex w-full items-end justify-between pt-6 border-b border-background/20 pb-4'>
                 <div>
                    <h3 className='font-display text-3xl uppercase md:text-5xl'>{item.title}</h3>
                 </div>
                 <p className='max-w-[200px] text-right font-mono text-[10px] uppercase opacity-50 md:text-xs'>
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
