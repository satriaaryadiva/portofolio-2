'use client';

import * as React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import ContactCTA from '@/components/sections/ContactCTA';
import Expertise from '@/components/sections/Expertise';
import FAQ from '@/components/sections/FAQ';
import HeroAboutSequence from '@/components/sections/HeroAboutSequence';
import HorizontalShowcase from '@/components/sections/HorizontalShowcase';
import Marquee from '@/components/sections/Marquee';
import Projects from '@/components/sections/Projects';
import Quotes from '@/components/sections/Quotes';
import Services from '@/components/sections/Services';
import SmoothScroll from '@/components/SmoothScroll';

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
        <main className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
          <Navbar />
          <HeroAboutSequence />
          <Marquee />
          <Quotes />
          <Projects />
          <HorizontalShowcase />
          <Expertise/>
          <Services />
          <FAQ />
          <ContactCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
