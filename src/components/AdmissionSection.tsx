'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const badgeColors = [
  { panelBg: '#e8fff4', badgeBg: '#6bff8f', badgeText: '#004a1d', accent: '#006a2d' },
  { panelBg: '#f0e8ff', badgeBg: '#e5c6ff', badgeText: '#4f0089', accent: '#8126cf' },
  { panelBg: '#fffde8', badgeBg: '#fcdf46', badgeText: '#483d00', accent: '#6a5b00' },
];

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function AdmissionSection() {
  const [colorIdx, setColorIdx] = useState(0);
  const [shaking, setShaking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((i) => (i + 1) % badgeColors.length);
      setShaking(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShaking(false), 450);
    }, 2200);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const badge = badgeColors[colorIdx];
  const { panelBg, badgeBg, badgeText, accent } = badge;

  return (
    <section id="admission" className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-y-4 border-black overflow-hidden">

      {/* LEFT: Image — slides from left */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden flex items-center justify-center p-8 md:p-12 min-h-[400px] border-b-4 lg:border-b-0 lg:border-r-4 border-black"
        style={{ backgroundColor: panelBg, transition: 'background-color 0.4s ease' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10 z-0" />

        {/* Animated JOIN US badge */}
        <div
          className={`absolute top-10 left-10 w-24 h-24 border-4 border-black rotate-[-15deg] z-20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center rounded-xl ${shaking ? 'badge-shake' : ''}`}
          style={{ backgroundColor: badgeBg, transition: 'background-color 0.3s ease' }}
        >
          <span
            className="font-black text-xl leading-none"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: badgeText, transition: 'color 0.3s ease' }}
          >
            JOIN
          </span>
          <span
            className="font-black text-xl leading-none"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: badgeText, transition: 'color 0.3s ease' }}
          >
            US
          </span>
        </div>

        {/* Main image */}
        <div className="relative z-10 w-full max-w-lg aspect-square border-4 border-black rounded-[2rem] overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,0.15)]">
          <Image
            src="https://images.pexels.com/photos/5561460/pexels-photo-5561460.jpeg"
            alt="Students engaging in admission process"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      {/* RIGHT: Content — slides from right */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#fafafa] p-8 md:p-16 flex flex-col justify-center items-start space-y-8 relative overflow-hidden"
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
          style={{ backgroundColor: badgeBg }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none transition-colors duration-500" style={{ backgroundColor: badgeBg }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none transition-colors duration-500" style={{ backgroundColor: accent }} />

        <div className="relative z-10 w-full">
          <h2
            className="text-4xl md:text-6xl font-black text-black leading-[1] tracking-tighter mb-6 uppercase"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Start Your <br />
            <span style={{ color: accent, transition: 'color 0.4s ease' }}>
              Journey
            </span>{' '}
            Today
          </h2>

          <p
            className="text-lg md:text-xl font-bold max-w-lg text-[#2f2f2f] mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Ready to unleash your superpower? Enroll in Mind Masters and gain
            access to a community of forward-thinkers, industry experts, and a
            curriculum designed for the future.
          </p>

          <div className="flex flex-wrap gap-4 w-full">
            <Link
              href="#contact"
              className="brutalist-button font-black text-xl px-8 py-4 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                backgroundColor: badgeBg,
                color: badgeText,
                transition: 'background-color 0.4s ease, color 0.3s ease',
              }}
            >
              Know More About Admission
            </Link>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
