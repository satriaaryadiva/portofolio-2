'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [, setTime] = useState('');

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', minute: '2-digit', hour12: true 
      }) + ' GMT+7');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className='w-full bg-background text-foreground transition-colors duration-300'>
      
      {/* Top Links Section */}
      <div className='px-4 md:px-12 pt-16 md:pt-24 pb-8 flex flex-col'>
        
        {/* Header Labels */}
        <div className='w-full flex justify-between font-mono text-[10px] md:text-sm font-bold uppercase tracking-widest mb-4'>
          <span>(FOLLOW ME ON)</span>
          <span>(NAVIGATION)</span>
        </div>
        
        {/* Custom Hairline Divider */}
        <div className='w-full h-px bg-foreground mb-6 md:mb-10' />

        {/* Links Grid */}
        <div className='flex justify-between items-start'>
          
          {/* Left: Follow */}
          <div className='flex flex-col space-y-2 md:space-y-4'>
            {['Instagram', 'LinkedIn', 'Behance', 'Email'].map((social) => (
              <a 
                key={social} 
                href='#' 
                className='group relative inline-flex overflow-hidden font-mono text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight'
              >
                <div className='transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full'>
                  {social}
                </div>
                <div className='absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 italic'>
                  {social}
                </div>
              </a>
            ))}
          </div>

          {/* Right: Navigation */}
          <div className='flex flex-col items-end space-y-2 md:space-y-4 text-right'>
            {['Home', 'Works', 'Break', 'About'].map((nav) => (
              <a 
                key={nav} 
                href='#' 
                className='group relative inline-flex overflow-hidden font-mono text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight'
              >
                <div className='transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full'>
                  {nav}
                </div>
                <div className='absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 italic'>
                  {nav}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Back To Top Button */}
        <div className='w-full flex justify-center mt-12 md:mt-4'>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className='font-mono text-[10px] md:text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity'
          >
            BACK TO TOP
          </button>
        </div>
      </div>

      {/* Marquee Section */}
      <div className='w-full bg-[#5B6C0C] py-4 md:py-8 overflow-hidden text-[#EBE9E0]'>
        <div className='flex whitespace-nowrap animate-[marquee_15s_linear_infinite]'>
          {[...Array(6)].map((_, i) => (
             <span 
               key={i} 
               className='font-mono text-[22vw] md:text-[18vw] leading-[0.75] font-black uppercase tracking-tight pr-6 md:pr-10'
             >
               LET&apos;S BUILD SOMETHING
             </span>
          ))}
        </div>
      </div>

      {/* Bottom Metadata Section */}
      <div className='px-4 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center md:items-end font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest'>
        <div className='flex items-center space-x-6 md:space-x-12 mb-4 md:mb-0'>
          <span>MEDAN, ID</span>
       
    
        </div>
        <div className='text-center md:text-right leading-relaxed'>
          <span>©{currentYear}</span>
          <br/>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}
