'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  // { label: 'Academic Calendar', href: '/academic-calendar' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className='flex justify-between items-center px-6 md:px-8 py-2 w-full sticky top-0 z-50 bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
      {/* Logo */}
      <Link href='/'>
        <Image
          src={logo}
          alt='Mind Masters Logo'
          height={44}
          className='w-auto'
          priority
        />
      </Link>

      {/* Desktop Nav */}
      <nav className='hidden md:flex gap-8 items-center'>
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-black tracking-tight py-1 transition-all hover:translate-x-[2px] hover:translate-y-[2px] relative ${
                active ? 'text-[#1a84d2]' : 'text-black hover:text-[#8126cf]'
              }`}
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {link.label}
              {/* Active underline */}
              {active && (
                <span className='absolute -bottom-1 left-0 right-0 h-[3px] bg-[#1a84d2] rounded-full' />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Apply Now button */}
      <div className='flex items-center gap-4'>
        <Link
          href='/apply'
          className={`brutalist-button font-black px-5 py-2 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:inline-flex items-center transition-all ${
            isActive('/apply')
              ? 'bg-black text-[#6bb1ff]'
              : 'bg-[#6bb1ff] text-black'
          }`}
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Apply Now
        </Link>

        {/* Mobile menu toggle */}
        <button
          className='md:hidden flex flex-col gap-1.5 p-1'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle menu'
        >
          <span
            className={`block w-7 h-0.5 bg-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-7 h-0.5 bg-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-7 h-0.5 bg-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className='absolute top-full left-0 w-full bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:hidden z-40'>
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-8 py-4 font-black border-b-2 border-black/10 transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-[#6bb1ff] text-[#003459]'
                    : 'text-black hover:bg-[#f1f1f1]'
                }`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {link.label}
                {active && (
                  <span
                    className='material-symbols-outlined text-base text-[#1a84d2]'
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    arrow_forward
                  </span>
                )}
              </Link>
            );
          })}
          <div className='px-8 py-4'>
            <Link
              href='/apply'
              onClick={() => setMenuOpen(false)}
              className={`brutalist-button inline-block font-black px-6 py-3 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                isActive('/apply')
                  ? 'bg-black text-[#6bb1ff]'
                  : 'bg-[#6bb1ff] text-black'
              }`}
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
