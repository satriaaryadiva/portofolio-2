'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect,useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "WHAT IS YOUR TYPICAL PROCESS?",
    answer: "Every project starts with a deep dive into your brand's core values. From there, I move into wireframing, high-fidelity design, and finally, meticulous development using modern frameworks like Next.js and GSAP for fluid animations."
  },
  {
    question: "HOW LONG DOES A PROJECT TAKE?",
    answer: "A standard premium website takes between 4 to 8 weeks, depending on the complexity, number of pages, and the level of custom 3D or GSAP animations required."
  },
  {
    question: "DO YOU WORK WITH INTERNATIONAL CLIENTS?",
    answer: "Absolutely. I collaborate with clients globally, ensuring seamless communication across different time zones through asynchronous updates and scheduled calls."
  },
  {
    question: "WHAT TECHNOLOGIES DO YOU USE?",
    answer: "My core stack revolves around React, Next.js, and Tailwind CSS. For the high-end interactive elements, I heavily rely on GSAP, Framer Motion, and occasionally WebGL for 3D web experiences."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Left side text stagger
      const leftElements = gsap.utils.toArray('.faq-left-elem');
      gsap.from(leftElements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Right side accordion stagger
      const rightElements = gsap.utils.toArray('.faq-item');
      gsap.from(rightElements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-background text-foreground py-20 md:py-40 px-4 md:px-12 border-t border-border/20 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Title */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-32">
            <div className="faq-left-elem flex items-center space-x-6 font-mono text-[10px] uppercase tracking-widest opacity-50 mb-8 md:mb-12">
              <div className="h-px w-12 bg-foreground md:w-24" />
              <span>THE DETAILS</span>
            </div>
            <h2 className="faq-left-elem font-display text-5xl md:text-6xl uppercase font-bold leading-[1.1]">
              Frequently <br /> Asked
            </h2>
            <p className="faq-left-elem mt-6 font-sans text-sm md:text-base opacity-60 max-w-xs leading-relaxed">
              Everything you need to know about how I work, project timelines, and technologies.
            </p>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="w-full md:w-2/3 flex flex-col mt-8 md:mt-0">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="faq-item border-b border-foreground/10 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center py-8 text-left group"
              >
                <h3 className={`font-display text-2xl md:text-4xl uppercase font-medium transition-colors duration-300 ${openIndex === i ? 'text-foreground' : 'text-foreground/50 group-hover:text-foreground'}`}>
                  {faq.question}
                </h3>
                <div className={`relative w-4 h-4 md:w-6 md:h-6 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${openIndex === i ? 'rotate-180' : ''}`}>
                  {/* Horizontal Line */}
                  <div className="absolute w-full h-[2px] bg-foreground" />
                  {/* Vertical Line */}
                  <div className={`absolute w-[2px] h-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${openIndex === i ? 'scale-y-0' : 'scale-y-100'}`} />
                </div>
              </button>
              
              <div 
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${openIndex === i ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0 pb-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="font-sans text-sm md:text-lg opacity-70 leading-relaxed max-w-2xl pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
