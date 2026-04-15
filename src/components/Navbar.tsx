'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Programs', href: '#programs' },
  { label: 'Classes', href: '#schedule' },
  { label: 'About', href: '#why-us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-bold tracking-tight py-1 transition-all hover:translate-x-[2px] hover:translate-y-[2px] ${
              i === 0
                ? 'text-[#006a2d] border-b-4 border-[#006a2d]'
                : 'text-black hover:text-[#8126cf]'
            }`}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Apply Now button */}
      <div className='flex items-center gap-4'>
        <Link
          href='#contact'
          className='brutalist-button bg-[#6bff8f] text-black font-black px-5 py-2 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:inline-flex items-center'
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className='px-8 py-4 font-black text-black border-b-2 border-black/10 hover:bg-[#6bff8f] transition-colors'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {link.label}
            </Link>
          ))}
          <div className='px-8 py-4'>
            <Link
              href='#contact'
              onClick={() => setMenuOpen(false)}
              className='brutalist-button inline-block bg-[#6bff8f] text-black font-black px-6 py-3 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
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
