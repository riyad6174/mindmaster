'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from 'framer-motion';

const heroData = [
  {
    prefix: 'Unlock Your Superpowers at',
    bgColor: '#d2ffddff',
    image: 'https://images.pexels.com/photos/8421946/pexels-photo-8421946.jpeg',
  },
  {
    prefix: 'Master Mathematics at',
    bgColor: '#faf2d9ff',
    image: 'https://images.pexels.com/photos/6964688/pexels-photo-6964688.jpeg',
  },
  {
    prefix: 'Discover Joyful Singing at',
    bgColor: '#fbf3c8ff',
    image: 'https://images.pexels.com/photos/4711732/pexels-photo-4711732.jpeg',
  },
  {
    prefix: 'Learn Mental Abacus at',
    bgColor: '#eedbffff',
    image: 'https://images.pexels.com/photos/6624376/pexels-photo-6624376.jpeg',
  },
  {
    prefix: 'Explore Fun Science at',
    bgColor: '#d2ffddff',
    image: 'https://images.pexels.com/photos/7176476/pexels-photo-7176476.jpeg',
  },
];

const floatingStats = [
  {
    icon: 'groups',
    value: '500+',
    label: 'Students',
    bg: '#6bff8f',
    text: '#004a1d',
  },
  {
    icon: 'workspace_premium',
    value: '10+',
    label: 'Yrs Exp',
    bg: '#fcdf46',
    text: '#483d00',
  },
  {
    icon: 'menu_book',
    value: '50+',
    label: 'Programs',
    bg: '#e5c6ff',
    text: '#4f0089',
  },
];

/* ─── entrance variants ──────────────────────────────────────────── */
const leftContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const itemUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};
const rightPanel: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 },
  },
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ── mouse parallax ──────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const sTiltX = useSpring(tiltX, { stiffness: 100, damping: 22 });
  const sTiltY = useSpring(tiltY, { stiffness: 100, damping: 22 });

  /* stickers move opposite direction for depth */
  const stX = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const stY = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const sStX = useSpring(stX, { stiffness: 80, damping: 20 });
  const sStY = useSpring(stY, { stiffness: 80, damping: 20 });

  /* ── auto-advance + progress bar ─────────────── */
  const goTo = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  useEffect(() => {
    setProgress(0);
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrentIndex((prev) => (prev + 1) % heroData.length);
          return 0;
        }
        return p + 2.5; // 100 / 2.5 * 100ms = 4 s
      });
    }, 100);
    return () => clearInterval(tick);
  }, [currentIndex]);

  /* ── mouse handlers ──────────────────────────── */
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const current = heroData[currentIndex];

  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-72px)] border-b-4 border-black'>
      {/* ════════════════ LEFT ════════════════ */}
      <motion.div
        variants={leftContainer}
        initial='hidden'
        animate='visible'
        className='relative p-8 md:p-16 flex flex-col justify-center items-start space-y-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black overflow-hidden'
        style={{
          backgroundColor: current.bgColor,
          transition: 'background-color 0.9s ease',
        }}
      >
        {/* Ambient decorative blobs */}
        <motion.div
          className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#8126cf] opacity-15 blur-3xl pointer-events-none'
          animate={{ scale: [1, 1.25, 1], rotate: [0, 120, 0] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className='absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#fcdf46] opacity-20 blur-2xl pointer-events-none'
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
        />

        {/* Heading */}
        <motion.h1
          variants={itemUp}
          className='text-5xl md:text-7xl font-black text-[#005f28] leading-[0.9] tracking-tighter flex flex-col relative z-10'
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {/* Animated prefix — blurs out / in on change */}
          <AnimatePresence mode='wait'>
            <motion.span
              key={current.prefix}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className='min-h-[1.8em] flex items-end pb-3 lg:pb-4'
            >
              {current.prefix}
            </motion.span>
          </AnimatePresence>

          {/* Brand name – glows */}
          <span
            className='text-brand-glow text-[#fcdf46]'
            style={{ WebkitTextStroke: '1px black' }}
          >
            Mind Masters
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemUp}
          className='text-xl md:text-2xl font-bold max-w-lg text-[#005f28] relative z-10'
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          Where curious minds collide with creative genius. Our adaptive
          learning center transforms students into leaders.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemUp}
          className='flex flex-wrap gap-4 w-full pt-2 relative z-10'
        >
          <Link
            href='#contact'
            className='brutalist-button bg-[#8126cf] text-white font-black text-xl px-8 py-4 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Apply Now
          </Link>
          <Link
            href='#contact'
            className='brutalist-button bg-[#fcdf46] text-[#483d00] font-black text-xl px-8 py-4 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Book Appointment
          </Link>
        </motion.div>

        {/* Slide nav dots + counter + arrows */}
        <motion.div
          variants={itemUp}
          className='flex items-center gap-3 relative z-10'
        >
          <button
            onClick={() =>
              goTo((currentIndex - 1 + heroData.length) % heroData.length)
            }
            className='w-7 h-7 rounded-full border-2 border-black bg-white/70 hover:bg-white flex items-center justify-center transition-colors'
          >
            <span className='material-symbols-outlined text-sm leading-none'>
              chevron_left
            </span>
          </button>

          {heroData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full border-2 border-black transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 h-3 bg-[#005f28]'
                  : 'w-3 h-3 bg-white/60 hover:bg-white'
              }`}
            />
          ))}

          <button
            onClick={() => goTo((currentIndex + 1) % heroData.length)}
            className='w-7 h-7 rounded-full border-2 border-black bg-white/70 hover:bg-white flex items-center justify-center transition-colors'
          >
            <span className='material-symbols-outlined text-sm leading-none'>
              chevron_right
            </span>
          </button>

          <span
            className='ml-1 font-black text-sm text-[#005f28]/70'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(heroData.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Progress bar */}
        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-black/10 z-20'>
          <div
            className='h-full bg-[#005f28] transition-none'
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      {/* ════════════════ RIGHT ════════════════ */}
      <motion.div
        variants={rightPanel}
        initial='hidden'
        animate='visible'
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className='relative bg-[#f6f6f6] overflow-hidden flex items-center justify-center p-8 md:p-12 min-h-[400px] cursor-crosshair'
      >
        {/* Dot grid */}
        <div className='absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] opacity-10 z-0' />

        {/* Animated background ring */}
        <motion.div
          className='absolute w-[520px] h-[520px] rounded-full border-2 border-black/5 pointer-events-none'
          animate={{ rotate: 360 }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className='absolute w-[420px] h-[420px] rounded-full border-2 border-black/5 pointer-events-none'
          animate={{ rotate: -360 }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        />

        {/* Floating stat chips */}
        {floatingStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.9 + i * 0.18,
              type: 'spring',
              stiffness: 220,
              damping: 15,
            }}
            className='absolute z-30 border-2 border-black flex items-center gap-2 px-3 py-1.5 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
            style={{
              backgroundColor: stat.bg,
              top: i === 0 ? '12%' : i === 2 ? '52%' : undefined,
              bottom: i === 1 ? '18%' : undefined,
              left: i === 0 ? '4%' : i === 1 ? '4%' : undefined,
              right: i === 2 ? '3%' : undefined,
            }}
          >
            <span
              className='material-symbols-outlined text-base'
              style={{ color: stat.text, fontVariationSettings: "'FILL' 1" }}
            >
              {stat.icon}
            </span>
            <span
              className='font-black text-xs whitespace-nowrap'
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                color: stat.text,
              }}
            >
              {stat.value} {stat.label}
            </span>
          </motion.div>
        ))}

        {/* Sticker 1: floating yellow badge */}
        <motion.div
          style={{ x: sStX, y: sStY }}
          className='absolute top-8 right-8 w-28 h-28 md:w-32 md:h-32 bg-[#fcdf46] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hero-sticker-1 z-20 cursor-pointer'
          whileHover={{ scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span
            className='font-black text-center text-xs uppercase text-[#483d00] leading-tight'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            100%
            <br />
            Adaptive
          </span>
        </motion.div>

        {/* Sticker 2: floating purple star */}
        <motion.div
          style={{ x: sStX, y: sStY }}
          className='absolute bottom-10 left-6 w-20 h-20 md:w-24 md:h-24 bg-[#8126cf] border-4 border-black hero-sticker-2 z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center cursor-pointer'
          whileHover={{ scale: 1.15, rotate: 15 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span
            className='material-symbols-outlined text-4xl text-white'
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        </motion.div>

        {/* Main image with 3D tilt parallax */}
        <motion.div
          style={{
            rotateX: sTiltX,
            rotateY: sTiltY,
            transformStyle: 'preserve-3d',
            transformPerspective: 800,
          }}
          className='relative z-10 w-full max-w-lg aspect-square border-4 border-black rounded-[2rem] overflow-hidden shadow-[12px_12px_0px_0px_rgba(129,38,207,1)] bg-black'
        >
          {/* Hover shine overlay */}
          <motion.div
            className='absolute inset-0 z-20 pointer-events-none rounded-[2rem]'
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
              opacity: useTransform(mouseX, [-0.5, 0.5], [0.3, 0.6]),
            }}
          />

          {heroData.map((data, index) => (
            <Image
              key={data.image}
              src={data.image}
              alt={data.prefix}
              fill
              className={`object-cover transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-[1.05] z-0'
              }`}
              priority={index === 0}
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          ))}
        </motion.div>

        {/* Slide label badge (bottom of image) */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={current.prefix}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white border-2 border-black px-4 py-1.5 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap'
          >
            <span
              className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {current.prefix.replace(' at', '')}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
