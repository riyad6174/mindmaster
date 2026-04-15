'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

const programs = [
  {
    title: 'Elementary Explorers',
    grade: 'Grades 1-5',
    gradeStyle: 'bg-[#6bff8f] rotate-12',
    description: 'Nurturing curiosity through project-based learning and foundational literacy.',
    btnBg: 'bg-[#6bff8f] text-[#005f28]',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    imageAlt: 'Young students engaged in a colorful science experiment',
  },
  {
    title: 'Middle Mindset',
    grade: 'Grades 6-8',
    gradeStyle: 'bg-[#e5c6ff] -rotate-12',
    description: 'Building critical thinking and social-emotional skills in a digital-first environment.',
    btnBg: 'bg-[#e5c6ff] text-[#6900b4]',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
    imageAlt: 'Pre-teen students collaborating on a digital design project',
  },
  {
    title: 'Academy of Leaders',
    grade: 'Grades 9-12',
    gradeStyle: 'bg-[#fcdf46] rotate-6',
    description: 'Advanced placement and career counseling for university readiness and beyond.',
    btnBg: 'bg-[#fcdf46] text-[#483d00]',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    imageAlt: 'Senior high school students presenting a capstone project',
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

export default function Programs() {
  return (
    <section id="programs" className="py-24 px-6 md:px-8 bg-[#f1f1f1]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Academic Excellence
            </h2>
            <p className="text-xl font-bold mt-2 text-[#5b5b5b]" style={{ fontFamily: 'var(--font-manrope)' }}>
              Tailored pathways for every stage of growth.
            </p>
          </div>
          <button
            className="brutalist-button bg-black text-white font-black px-8 py-4 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(107,255,143,1)] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            View All Programs
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.title}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white border-4 border-black rounded overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="h-48 border-b-4 border-black relative overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className={`absolute top-4 right-4 ${program.gradeStyle} border-2 border-black font-black text-xs px-3 py-1 uppercase z-10`}
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {program.grade}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {program.title}
                </h3>
                <p className="text-[#5b5b5b] font-bold mb-8 flex-grow" style={{ fontFamily: 'var(--font-manrope)' }}>
                  {program.description}
                </p>
                <button
                  className={`brutalist-button mt-auto w-full ${program.btnBg} font-black py-4 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Explore Program
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
