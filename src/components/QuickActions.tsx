'use client';

import { motion, type Variants } from 'framer-motion';

const actions = [
  { icon: 'auto_stories',           label: 'Library Access', bg: 'bg-[#6bb1ff]', iconColor: 'text-black', iconSize: 'text-6xl md:text-7xl' },
  { icon: 'account_balance_wallet', label: 'Fee Payment',    bg: 'bg-[#e5c6ff]', iconColor: 'text-black', iconSize: 'text-5xl md:text-6xl' },
  { icon: 'schedule',               label: 'My Timetable',   bg: 'bg-[#fcdf46]', iconColor: 'text-black', iconSize: 'text-5xl md:text-6xl' },
  { icon: 'support_agent',          label: 'Get Support',    bg: 'bg-[#6bb1ff]', iconColor: 'text-black', iconSize: 'text-5xl md:text-6xl' },
  { icon: 'leaderboard',            label: 'Results',        bg: 'bg-[#e5c6ff]', iconColor: 'text-black', iconSize: 'text-5xl md:text-6xl' },
  { icon: 'event_note',             label: 'Events',         bg: 'bg-[#fcdf46]', iconColor: 'text-black', iconSize: 'text-5xl md:text-6xl' },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function QuickActions() {
  return (
    <section className="py-16 bg-white border-y-4 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-14"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {actions.map((action) => (
            <motion.button
              key={action.label}
              variants={itemVariant}
              whileHover={{ scale: 1.08, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.94 }}
              className="flex flex-col items-center space-y-4 group cursor-pointer"
            >
              <div
                className={`${action.bg} border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:shadow-none transition-all duration-150`}
                style={{ width: '5.5rem', height: '5.5rem' }}
              >
                <span
                  className={`material-symbols-outlined ${action.iconSize} font-black ${action.iconColor}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {action.icon}
                </span>
              </div>
              <span
                className="font-black uppercase text-xs md:text-sm tracking-wide"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {action.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
