'use client';

import Link from 'next/link';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href} className="group relative block overflow-hidden font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
      <div className="relative h-[1.2em] overflow-hidden">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
          <span className="block h-[1.2em] leading-[1.2em] opacity-60 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
          <span className="block h-[1.2em] leading-[1.2em] opacity-100 italic">{label}</span>
        </div>
      </div>
    </Link>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isVisible = useRef(true);
  
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for the pill shape
      setIsScrolled(currentScrollY > 50);
      
      // GSAP Hide/Show logic for Smart Navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        // Scrolling down -> Hide
        if (isVisible.current) {
          isVisible.current = false;
          gsap.to(navRef.current, {
            yPercent: -120,
            duration: 0.5,
            ease: 'back.in(1.5)',
            overwrite: 'auto'
          });
        }
      } else {
        // Scrolling up -> Show
        if (!isVisible.current) {
          isVisible.current = true;
          gsap.to(navRef.current, {
            yPercent: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.75)',
            overwrite: 'auto'
          });
        }
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.nav-anim', {
        y: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 2 // Waits for the global preloader to finish
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Magnetic Button Effect for "Let's Talk"
  useLayoutEffect(() => {
    if (!btnRef.current) return;
    const btn = btnRef.current;
    
    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.25);
      yTo(relY * 0.25);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(btn, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    const handleMouseEnter = () => {
      gsap.to(btn, { scale: 1.05, duration: 0.4, ease: "power2.out" });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    btn.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      btn.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition-[padding] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isScrolled ? 'px-4 py-4 md:px-8 md:py-6' : 'px-6 py-6 md:px-12 md:py-10'
      }`}
    >
      <div className={`relative mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] origin-top ${
        isScrolled 
          ? 'max-w-5xl rounded-full border border-foreground/10 bg-background/80 px-6 py-3 md:px-8 backdrop-blur-lg shadow-xl shadow-foreground/5 scale-95' 
          : 'max-w-full rounded-none border-transparent bg-transparent px-0 py-0 backdrop-blur-none shadow-none scale-100'
      }`}>
        
        {/* Logo */}
        <Link 
          href='/' 
          className='nav-anim group font-display text-lg md:text-xl font-bold uppercase tracking-wider text-foreground flex overflow-hidden'
        >
          <div className="relative h-[1em] overflow-hidden">
             <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2 flex flex-col">
               <span className="block h-[1em] leading-[1em]">Satria Arya Diva</span>
               <span className="block h-[1em] leading-[1em] text-foreground/50 italic">Satria Arya Diva</span>
             </div>
          </div>
        </Link>
        
        {/* Desktop Links (Perfectly Centered) */}
        <ul className='hidden items-center space-x-10 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          {links.map(({ href, label }) => (
            <li key={label} className='nav-anim'>
              <NavLink href={href} label={label} />
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className='flex items-center space-x-4 md:space-x-8'>
          <div className='nav-anim'>
            <ThemeToggle />
          </div>
          
          <div className='nav-anim hidden md:block' ref={btnRef}>
            <Link 
              href='#contact' 
              className='relative inline-flex overflow-hidden rounded-full border border-foreground bg-foreground px-6 py-3 text-background font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 hover:bg-background hover:text-foreground group'
            >
              <div className="relative h-[1.2em] overflow-hidden">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2 flex flex-col">
                  <span className="block h-[1.2em] leading-[1.2em]">Let's Talk</span>
                  <span className="block h-[1.2em] leading-[1.2em] italic">Let's Talk</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='nav-anim font-mono text-[10px] font-bold uppercase tracking-widest text-foreground md:hidden'>
           [ MENU ]
        </div>
      </div>
    </header>
  );
}
