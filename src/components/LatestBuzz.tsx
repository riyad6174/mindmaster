'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { buzzItems } from '@/data/buzz';

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function LatestBuzz() {
  return (
    <section id="buzz" className="py-20 px-6 md:px-8 bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
        >
          <h2
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Latest Buzz
          </h2>
          <span
            className="font-black text-sm text-[#5b5b5b] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            What&apos;s happening at Mind Masters
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {buzzItems.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`${item.cardBg} p-8 border-2 ${item.borderColor} rounded-2xl ${item.shadow} ${item.rotate} transition-transform flex flex-col`}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`${item.tagStyle} px-3 py-1 font-black text-xs uppercase rounded-full`}
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {item.tag}
                </span>
                <span
                  className={`material-symbols-outlined text-3xl ${item.bodyColor}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
              </div>

              <h3
                className={`text-xl font-black ${item.titleColor} mb-3`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {item.title}
              </h3>
              <p
                className={`${item.bodyColor} font-bold text-sm mb-6 flex-grow leading-relaxed`}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {item.body}
              </p>
              <Link
                href={`/news/${item.slug}`}
                className={`brutalist-button ${item.btnBg} ${item.btnText} font-black text-sm px-5 py-2.5 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] self-start`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
