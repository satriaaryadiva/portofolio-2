'use client';

import gsap from 'gsap';
import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';

const services = [
  {
    id: '01',
    title: 'Architecture & Design',
    description: 'We create living spaces that harmonize with their surroundings through thoughtful form and material selection.',
  },
  {
    id: '02',
    title: 'Interior Curation',
    description: 'Crafting internal environments that reflect the unique identity of those who inhabit them.',
  },
  {
    id: '03',
    title: 'Digital Experience',
    description: 'Bridging physical and digital worlds through high-end web design and visual storytelling.',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        }
      });

      tl.from('.services-header-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1
      })
      .from('.service-border', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15
      }, '-=0.5')
      .from('.service-item', {
        opacity: 0,
        y: 30,
        rotateX: -15,
        transformOrigin: 'top center',
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
      }, '-=1');
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id='services' 
      ref={container}
      className='bg-background text-foreground px-6 py-20 md:px-12   transition-colors duration-300'
    >
      <div className='max-w-[1400px]'>
        <div className='mb-20 grid grid-cols-1 gap-10 md:grid-cols-2'>
        <h2 className='services-header-text font-mono text-4xl font-bold uppercase tracking-tighter md:text-6xl'>
            Our <br /> Expertise
          </h2>
          <p className='services-header-text max-w-md font-primary text-lg leading-relaxed opacity-70'>
            We operate at the intersection of architecture, design, and digital innovation, delivering bespoke solutions for visionary clients.
          </p>
        </div>

        <div className='space-y-12 pt-4 relative'>
          <div className='service-border absolute top-0 left-0 h-px w-full bg-border' />
          {services.map((service) => (
            <div key={service.id} className='relative pt-12'>
              <div className='service-border absolute top-0 left-0 h-px w-full bg-border/30' />
              <div className='service-item group flex flex-col justify-between py-4 md:flex-row md:items-start'>
                <div className='flex items-start space-x-12'>
                  <span className='font-mono text-xs opacity-40'>{service.id}</span>
                  <h3 className='relative block overflow-hidden font-display text-3xl font-medium uppercase md:text-4xl h-[1.1em] w-full'>
                    <div className='transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full group-hover:skew-y-3 origin-left'>
                      {service.title}
                    </div>
                    <div className='absolute inset-0 italic opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0 group-hover:opacity-100 group-hover:skew-y-0 origin-left'>
                      {service.title}
                    </div>
                  </h3>
                </div>
                <p className='mt-4 max-w-sm font-primary text-sm leading-relaxed opacity-60 md:mt-0'>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
