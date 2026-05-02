'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'My framework for AI employees', href: '#sec-02' },
  { label: 'How to think about AI employees', href: '#sec-03' },
  { label: 'The AI employees I\'m building', href: '#sec-04' },
  { label: 'Where can AI employees help you?', href: '#sec-05' },
  { label: 'Get in touch', href: '#sec-06' },
];

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 md:px-12 py-5 border-b-2 border-ink sticky top-0 bg-paper z-50">
      {/* Logo */}
      <Link href="/" className="font-sans font-black text-xl tracking-tight text-ink no-underline">
        ShiftAI<span className="text-accent-red">.</span>
      </Link>

      {/* Menu dropdown */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5 px-3 py-2 border border-ink rounded hover:bg-grey-1 transition-colors"
        >
          Menu {open ? '▲' : '▼'}
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-72 border-2 border-ink bg-paper shadow-hard z-50">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 font-sans text-sm text-ink no-underline hover:bg-highlight transition-colors ${
                  i < NAV_ITEMS.length - 1 ? 'border-b border-dashed border-grey-2' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
