'use client';

import { motion, type Variants } from 'framer-motion';

const reasons = [
  {
    icon: 'lightbulb',
    iconColor: 'text-[#006a2d]',
    iconBg: 'bg-[#e8fff4]',
    borderColor: 'border-[#006a2d]',
    shadowColor: 'rgba(0,106,45,0.25)',
    num: '01',
    numColor: 'text-[#86efac]',
    title: 'Customized Learning',
    body: 'Every student gets a unique AI-powered curriculum tailored to their pace and learning style.',
  },
  {
    icon: 'diversity_3',
    iconColor: 'text-[#8126cf]',
    iconBg: 'bg-[#f5e8ff]',
    borderColor: 'border-[#8126cf]',
    shadowColor: 'rgba(129,38,207,0.25)',
    num: '02',
    numColor: 'text-[#c4b5fd]',
    title: 'Mentorship First',
    body: 'Learn from industry experts, not just textbooks. Real-world insights every single day.',
  },
  {
    icon: 'rocket_launch',
    iconColor: 'text-[#6a5b00]',
    iconBg: 'bg-[#fffbe8]',
    borderColor: 'border-[#d4a800]',
    shadowColor: 'rgba(212,168,0,0.35)',
    num: '03',
    numColor: 'text-[#fde68a]',
    title: 'Future-Proof Skills',
    body: 'From coding to emotional intelligence, we prepare you for the next century of innovation.',
  },
  {
    icon: 'shield',
    iconColor: 'text-[#006a2d]',
    iconBg: 'bg-[#e8fff4]',
    borderColor: 'border-[#006a2d]',
    shadowColor: 'rgba(0,106,45,0.25)',
    num: '04',
    numColor: 'text-[#86efac]',
    title: 'Safe Environment',
    body: 'A nurturing, inclusive space where every student feels seen, valued, and empowered to grow.',
  },
  {
    icon: 'emoji_events',
    iconColor: 'text-[#8126cf]',
    iconBg: 'bg-[#f5e8ff]',
    borderColor: 'border-[#8126cf]',
    shadowColor: 'rgba(129,38,207,0.25)',
    num: '05',
    numColor: 'text-[#c4b5fd]',
    title: 'Proven Results',
    body: 'Consistent top performers in regional and national competitions across all disciplines.',
  },
  {
    icon: 'groups',
    iconColor: 'text-[#6a5b00]',
    iconBg: 'bg-[#fffbe8]',
    borderColor: 'border-[#d4a800]',
    shadowColor: 'rgba(212,168,0,0.35)',
    num: '06',
    numColor: 'text-[#fde68a]',
    title: 'Vibrant Community',
    body: 'Events, clubs, and peer networks that build lifelong friendships and collaborative spirit.',
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 px-6 md:px-8 bg-white border-t-4 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span
              className="inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Our Advantage
            </span>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Why Mind<br />Masters?
            </h2>
          </div>
          <p
            className="text-lg font-bold text-[#5b5b5b] max-w-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Six reasons thousands of families choose us as their partner in learning.
          </p>
        </motion.div>

        {/* 3-col × 2-row grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={cardIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative bg-white border-[3px] ${r.borderColor} rounded-2xl p-7 flex flex-col gap-4 group cursor-default overflow-hidden`}
              style={{ boxShadow: `6px 6px 0px 0px ${r.shadowColor}` }}
            >
              {/* Large number watermark */}
              <span
                className={`absolute top-4 right-5 text-6xl font-black leading-none select-none pointer-events-none ${r.numColor}`}
                style={{ fontFamily: 'var(--font-space-grotesk)', opacity: 0.35 }}
              >
                {r.num}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 ${r.iconBg} border-2 ${r.borderColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]`}>
                <span
                  className={`material-symbols-outlined text-3xl ${r.iconColor}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {r.icon}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3
                  className="text-lg font-black text-[#1a1a1a] mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {r.title}
                </h3>
                <p
                  className="font-bold text-sm text-[#5b5b5b] leading-relaxed"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {r.body}
                </p>
              </div>

              {/* Bottom accent line on hover */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${r.iconBg} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
