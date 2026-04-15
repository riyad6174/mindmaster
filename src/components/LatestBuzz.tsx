'use client';

import { motion, type Variants } from 'framer-motion';

const announcements = [
  {
    tag: 'Event',
    tagStyle: 'bg-[#8126cf] text-white border-2 border-[#8126cf]',
    cardBg: 'bg-[#f5eeff]',
    borderColor: 'border-[#c4b5fd]',
    titleColor: 'text-[#3b0764]',
    bodyColor: 'text-[#6b21a8]',
    btnBg: 'bg-[#8126cf]',
    btnText: 'text-white',
    shadow: 'shadow-[6px_6px_0px_0px_rgba(129,38,207,0.2)]',
    rotate: '-rotate-1 hover:rotate-0',
    title: "Summer Robotics Camp '24",
    body: 'Build, code, and compete in our month-long intense robotic workshop. Early bird gets the worm!',
    action: 'Read More',
    icon: 'precision_manufacturing',
  },
  {
    tag: 'Update',
    tagStyle: 'bg-[#6a5b00] text-white border-2 border-[#6a5b00]',
    cardBg: 'bg-[#fffbe8]',
    borderColor: 'border-[#fde68a]',
    titleColor: 'text-[#483d00]',
    bodyColor: 'text-[#6a5b00]',
    btnBg: 'bg-[#fcdf46]',
    btnText: 'text-[#483d00]',
    shadow: 'shadow-[6px_6px_0px_0px_rgba(252,223,70,0.35)]',
    rotate: 'rotate-1 hover:rotate-0',
    title: 'New Virtual Reality Lab',
    body: 'Explore the solar system or walk through history with our brand new state-of-the-art VR headsets.',
    action: 'Tour the Lab',
    icon: 'vrpano',
  },
  {
    tag: 'Win',
    tagStyle: 'bg-[#006a2d] text-white border-2 border-[#006a2d]',
    cardBg: 'bg-[#edfff3]',
    borderColor: 'border-[#86efac]',
    titleColor: 'text-[#004a1d]',
    bodyColor: 'text-[#006a2d]',
    btnBg: 'bg-[#6bff8f]',
    btnText: 'text-[#004a1d]',
    shadow: 'shadow-[6px_6px_0px_0px_rgba(107,255,143,0.3)]',
    rotate: '-rotate-1 hover:rotate-0',
    title: 'Math Olympiad Winners',
    body: 'Shoutout to our Grade 8 team for clinching the regional gold trophy this weekend!',
    action: 'View Gallery',
    icon: 'emoji_events',
  },
];

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
          {announcements.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`${item.cardBg} p-8 border-2 ${item.borderColor} rounded-2xl ${item.shadow} ${item.rotate} transition-transform flex flex-col cursor-pointer`}
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
              <button
                className={`brutalist-button ${item.btnBg} ${item.btnText} font-black text-sm px-5 py-2.5 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] self-start`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {item.action} →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
