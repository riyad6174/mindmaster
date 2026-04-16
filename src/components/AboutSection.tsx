'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

const programs = [
  { icon: 'toys',               label: 'Play Based Learning', sub: 'Learn through play',     bg: 'bg-white', iconColor: 'text-[#8126cf]', border: 'border-black' },
  { icon: 'volunteer_activism', label: 'Islamic Manners',     sub: 'Character & values',     bg: 'bg-white', iconColor: 'text-[#006a2d]', border: 'border-black' },
  { icon: 'menu_book',          label: 'Early Literacy',      sub: 'Read & write skills',    bg: 'bg-white', iconColor: 'text-[#6a5b00]', border: 'border-black' },
  { icon: 'palette',            label: 'Arts and Crafts',     sub: 'Create & express',       bg: 'bg-white', iconColor: 'text-[#8126cf]', border: 'border-black' },
  { icon: 'construction',       label: 'Skill Development',   sub: 'Hands-on building',      bg: 'bg-white', iconColor: 'text-[#006a2d]', border: 'border-black' },
  { icon: 'import_contacts',    label: 'Quran Reading',       sub: 'Guided recitation',      bg: 'bg-white', iconColor: 'text-[#6a5b00]', border: 'border-black' },
  { icon: 'lightbulb',          label: 'Creative Activities', sub: 'Imagination unleashed',  bg: 'bg-white', iconColor: 'text-[#8126cf]', border: 'border-black' },
  { icon: 'park',               label: 'Outdoor Play',        sub: 'Active & energetic',     bg: 'bg-white', iconColor: 'text-[#006a2d]', border: 'border-black' },
];

const stats = [
  { value: '500+', label: 'Students' },
  { value: '50+', label: 'Programs' },
  { value: '10+', label: 'Years' },
];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function AboutSection() {
  return (
    <section
      id='about'
      className='py-24 px-6 md:px-8 bg-[#f1f1f1] border-b-4 border-black overflow-hidden'
    >
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        {/* LEFT: content */}
        <motion.div
          variants={fadeLeft}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          <span
            className='inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-sm uppercase tracking-widest mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            About Us
          </span>

          <h2
            className='text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6 text-[#1a1a1a]'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            We Are
            <br />
            <span style={{ color: '#6a5b00' }}>Mind Masters</span>
          </h2>

          <p
            className='text-lg font-bold text-[#5b5b5b] max-w-md mb-10 leading-relaxed'
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            A next-generation education center where every learner is empowered
            to discover their strengths, build real-world skills, and lead with
            confidence. We blend technology, creativity, and mentorship into one
            extraordinary journey.
          </p>

          {/* Stats */}
          <div className='flex flex-wrap gap-5 mb-10'>
            {stats.map((s) => (
              <div
                key={s.label}
                className='bg-white border-4 border-black px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              >
                <p
                  className='text-3xl font-black text-[#8126cf]'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.value}
                </p>
                <p
                  className='text-xs font-black uppercase text-[#5b5b5b] tracking-wide'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href='/about'
            className='brutalist-button inline-block bg-[#fcdf46] text-[#483d00] font-black px-8 py-4 border-4 border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Our Story
          </Link>
        </motion.div>

        {/* RIGHT: program cards */}
        <motion.div
          variants={fadeRight}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className='flex items-center justify-between mb-6'>
            <p
              className='font-black text-xl uppercase tracking-tight'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Our Programs
            </p>
            <Link
              href='/programs'
              className='brutalist-button bg-black text-white font-black text-sm px-5 py-2.5 border-4 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(107,255,143,1)]'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              View All Programs
            </Link>
          </div>

          <motion.div
            className='grid grid-cols-2 gap-4'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.1 }}
          >
            {programs.map((prog) => (
              <motion.div
                key={prog.label}
                variants={cardIn}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className={`${prog.bg} border-2 ${prog.border} rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer`}
              >
                <span
                  className={`material-symbols-outlined text-4xl ${prog.iconColor} block mb-3`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {prog.icon}
                </span>
                <p
                  className='font-black text-sm text-[#1a1a1a] leading-tight'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {prog.label}
                </p>
                <p
                  className='font-bold text-xs text-[#5b5b5b] mt-1'
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {prog.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
