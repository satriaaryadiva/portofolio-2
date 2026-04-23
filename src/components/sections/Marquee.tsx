'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as React from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Marquee() {
  const container = useRef<HTMLDivElement>(null);
  const textContainer1 = useRef<HTMLDivElement>(null);
  const textContainer2 = useRef<HTMLDivElement>(null);
  
  // Track native directions for the two marquees
  const dir1 = useRef(1);
  const dir2 = useRef(-1);

  useLayoutEffect(() => {
    let xPercent1 = 0;
    let xPercent2 = -50;
    let requestAnimationFrameId: number;
    
    const ctx = gsap.context(() => {
      // Very slow and elegant base speed
      const baseSpeed = 0.03;
      const speedObj = { current: baseSpeed };

      ScrollTrigger.create({
        onUpdate: (self) => {
          // Temporarily reverse direction if scrolling up, for a cool push/pull effect
          const scrollDir = self.direction;
          
          const velocity = Math.abs(self.getVelocity());
          
          // Much smoother and subtler boost on scroll
          const speedBoost = gsap.utils.clamp(0, 0.4, velocity / 1000);
          const targetSpeed = baseSpeed + speedBoost;
          
          gsap.to(speedObj, {
            current: targetSpeed * scrollDir, // If scrolling up, speedObj becomes negative
            duration: 0.2, 
            overwrite: true,
            onComplete: () => {
                gsap.to(speedObj, {
                    current: baseSpeed, // return to native forward direction
                    duration: 1.5, 
                    ease: "power2.out",
                });
            }
          });

          // Elegant, subtle skew
          const skewAmount = gsap.utils.clamp(-6, 6, self.getVelocity() / 400);
          gsap.to([textContainer1.current, textContainer2.current], {
             skewX: skewAmount,
             duration: 0.3,
             overwrite: true,
             onComplete: () => {
                gsap.to([textContainer1.current, textContainer2.current], { 
                  skewX: 0, 
                  duration: 0.8, 
                  ease: "elastic.out(1, 0.3)" 
                });
             }
          });
        }
      });
      
      const animate = () => {
        if (!textContainer1.current || !textContainer2.current) return;
        
        // Loop container 1
        if (xPercent1 <= -50) xPercent1 += 50;
        else if (xPercent1 > 0) xPercent1 -= 50;
        
        // Loop container 2
        if (xPercent2 <= -50) xPercent2 += 50;
        else if (xPercent2 > 0) xPercent2 -= 50;
        
        gsap.set(textContainer1.current, { xPercent: xPercent1 });
        gsap.set(textContainer2.current, { xPercent: xPercent2 });
        
        // Absolute speed determines magnitude, direction determines sign
        xPercent1 -= speedObj.current * dir1.current;
        xPercent2 -= Math.abs(speedObj.current) * dir2.current; // Container 2 always opposes native base, but responds to scroll magnitude
        
        requestAnimationFrameId = requestAnimationFrame(animate);
      };

      requestAnimationFrameId = requestAnimationFrame(animate);
    }, container);

    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
      ctx.revert();
    };
  }, []);

  const MarqueeLines = () => (
    <>
       <span>Full-Stack Development</span>
       <span className='font-mono opacity-40 text-[4vw] md:text-[2vw] text-background' style={{ WebkitTextStroke: '0px'}}>—</span>
       <span>Scalable Solutions</span>
       <span className='font-mono opacity-40 text-[4vw] md:text-[2vw] text-background' style={{ WebkitTextStroke: '0px'}}>—</span>
       <span className='italic font-light'>Modern Web Architect</span>
       <span className='font-mono opacity-40 text-[4vw] md:text-[2vw] text-background' style={{ WebkitTextStroke: '0px'}}>—</span>
       <span>Clean Code Craftsman</span>
       <span className='font-mono opacity-40 text-[4vw] md:text-[2vw] text-background' style={{ WebkitTextStroke: '0px'}}>—</span>
       <span>Performance Focused</span>
       <span className='font-mono opacity-40 text-[4vw] md:text-[2vw] text-background' style={{ WebkitTextStroke: '0px'}}>—</span>
    </>
  );

  return (
    <section 
      ref={container}
      className='relative flex w-full flex-col overflow-hidden bg-foreground py-16 text-background md:py-24 perspective-[1000px]'
    >
      {/* Top row: Solid text, moving left natively */}
      <div 
        ref={textContainer1}
        className='flex whitespace-nowrap will-change-transform mb-2 md:mb-4'
        style={{ transformOrigin: "center center" }}
      >
        <div className='flex items-center space-x-12 pr-12 font-display text-[10vw] font-black uppercase leading-none tracking-tight md:text-[7vw] text-background'>
          <MarqueeLines />
        </div>
        <div className='flex items-center space-x-12 pr-12 font-display text-[10vw] font-black uppercase leading-none tracking-tight md:text-[7vw] text-background'>
          <MarqueeLines />
        </div>
      </div>

      {/* Bottom row: Outlined text, moving right natively */}
      <div 
        ref={textContainer2}
        className='flex whitespace-nowrap will-change-transform'
        style={{ transformOrigin: "center center" }}
      >
        <div 
          className='flex items-center space-x-12 pr-12 font-display text-[10vw] font-black uppercase leading-none tracking-tight md:text-[7vw] text-transparent'
          style={{ WebkitTextStroke: '1.5px var(--color-background)' }}
        >
          <MarqueeLines />
        </div>
        <div 
          className='flex items-center space-x-12 pr-12 font-display text-[10vw] font-black uppercase leading-none tracking-tight md:text-[7vw] text-transparent'
          style={{ WebkitTextStroke: '1.5px var(--color-background)' }}
        >
          <MarqueeLines />
        </div>
      </div>
    </section>
  );
}
