'use client';

import Link from 'next/link';

import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];
 

export default function Navbar() {
  return (
    <header className='fixed top-0 z-50 w-full px-6 py-6 md:px-12 md:py-10'>
      <nav className='flex items-center justify-between'>
        <Link 
          href='/' 
          className='font-display text-xl font-bold uppercase tracking-wider text-foreground'
        >
          Satria Arya Diva
        </Link>
        
        <ul className='hidden items-center space-x-12 font-bold font-mono text-lg uppercase tracking-widest md:flex'>
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link 
                href={href} 
                className='text-foreground/70 transition-opacity duration-300 hover:text-foreground'
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* corner actions */}
        <div className='flex items-center space-x-6'>
          <ThemeToggle />
          <div className='hidden font-mono text-[10px] uppercase tracking-widest md:block'>
            <Link href='#contact' className='border border-border bg-background px-4 py-2 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background'>
              Let's Talk!
            </Link>
          </div>
        </div>

        <div className='font-mono text-[10px] uppercase tracking-widest text-foreground md:hidden'>
          Menu
        </div>
      </nav>
    </header>
  );
}
