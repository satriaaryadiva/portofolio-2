'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleText = theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE';

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='font-mono text-[10px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-50 md:text-[11px]'
      aria-label='Toggle theme'
    >
      {toggleText}
    </button>
  );
}
