'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

const programs = [
  {
    badge: 'After School Club',
    title: 'Krazy Math Tutorial',
    subtitle: 'Advanced After School Program',
    description:
      'An advanced math-focused after-school program aligned with the Saskatchewan School Board curriculum — designed to challenge and inspire students from Grade 2 through Grade 12.',
    details: [
      { icon: 'school', label: 'Grades', value: 'Grade 2 – Grade 12' },
      { icon: 'payments', label: 'Fees', value: 'Gr 2–7: $120/mo · Gr 8–12: $150/mo' },
      { icon: 'schedule', label: 'Schedule', value: 'Mon, Tue, Thu · 6:30 – 8:30 PM' },
      { icon: 'location_on', label: 'Location', value: '1876 Wallace St, Regina, SK' },
    ],
    features: [
      'Advanced-level math instruction',
      'Saskatchewan curriculum-aligned',
      'Grades 2 through 12',
      '$50 sibling discount',
    ],
    accentColor: '#006a2d',
    accentBg: '#e8fff4',
    borderColor: 'border-[#86efac]',
    tagBg: 'bg-[#6bff8f]',
    tagText: 'text-[#004a1d]',
    icon: 'calculate',
    contact: '+1 (306) 515-3614',
  },
  {
    badge: 'Preschool',
    title: 'Preschool Program',
    subtitle: 'Darul Falah Islamic Centre',
    description:
      'A nurturing preschool program focused on learning through play, creativity, and foundational skills — enriched with Islamic values to build strong character from the very beginning.',
    details: [
      { icon: 'child_care', label: 'Age Group', value: '3 – 5 Years' },
      { icon: 'payments', label: 'Fees', value: '$200 / month' },
      { icon: 'schedule', label: 'Schedule', value: 'Mon – Fri · 9:00 AM – 12:00 PM' },
      { icon: 'mosque', label: 'Centre', value: 'Darul Falah Islamic Centre' },
    ],
    features: [
      'Learning through play & creativity',
      'Foundational literacy & numeracy',
      'Islamic values & character building',
      'Safe & nurturing environment',
    ],
    accentColor: '#8126cf',
    accentBg: '#f5e8ff',
    borderColor: 'border-[#c4b5fd]',
    tagBg: 'bg-[#e5c6ff]',
    tagText: 'text-[#4f0089]',
    icon: 'child_care',
    contact: 'Contact for details',
  },
  {
    badge: 'Elementary',
    title: 'Elementary Explorers',
    subtitle: 'Grades 1 – 5',
    description:
      'Nurturing curiosity through project-based learning and foundational literacy skills. Students develop a love for learning through hands-on experiments and collaborative activities.',
    details: [
      { icon: 'school', label: 'Grades', value: 'Grade 1 – Grade 5' },
      { icon: 'payments', label: 'Fees', value: 'Contact for pricing' },
      { icon: 'schedule', label: 'Schedule', value: 'Weekdays · After school hours' },
      { icon: 'location_on', label: 'Location', value: 'Mind Masters Edu Center' },
    ],
    features: [
      'Project-based learning approach',
      'Foundational literacy & numeracy',
      'Creative arts & STEM activities',
      'Small class sizes',
    ],
    accentColor: '#6a5b00',
    accentBg: '#fffbe8',
    borderColor: 'border-[#fde68a]',
    tagBg: 'bg-[#fcdf46]',
    tagText: 'text-[#483d00]',
    icon: 'auto_stories',
    contact: 'Contact us to enroll',
  },
  {
    badge: 'Middle School',
    title: 'Middle Mindset',
    subtitle: 'Grades 6 – 8',
    description:
      'Building critical thinking and social-emotional skills in a digital-first environment. Students tackle real-world problems through group projects and technology-driven curriculum.',
    details: [
      { icon: 'school', label: 'Grades', value: 'Grade 6 – Grade 8' },
      { icon: 'payments', label: 'Fees', value: 'Contact for pricing' },
      { icon: 'schedule', label: 'Schedule', value: 'Weekdays · After school hours' },
      { icon: 'location_on', label: 'Location', value: 'Mind Masters Edu Center' },
    ],
    features: [
      'Critical thinking & debate skills',
      'Digital literacy & coding basics',
      'Social-emotional learning',
      'Mentorship program',
    ],
    accentColor: '#8126cf',
    accentBg: '#f5e8ff',
    borderColor: 'border-[#c4b5fd]',
    tagBg: 'bg-[#e5c6ff]',
    tagText: 'text-[#4f0089]',
    icon: 'psychology',
    contact: 'Contact us to enroll',
  },
  {
    badge: 'High School',
    title: 'Academy of Leaders',
    subtitle: 'Grades 9 – 12',
    description:
      'Advanced placement and career counseling for university readiness and beyond. Students develop leadership skills, explore career pathways, and prepare for post-secondary success.',
    details: [
      { icon: 'school', label: 'Grades', value: 'Grade 9 – Grade 12' },
      { icon: 'payments', label: 'Fees', value: 'Contact for pricing' },
      { icon: 'schedule', label: 'Schedule', value: 'Weekdays · Evening sessions' },
      { icon: 'location_on', label: 'Location', value: 'Mind Masters Edu Center' },
    ],
    features: [
      'University application support',
      'Career counseling & pathways',
      'Leadership development',
      'Advanced subject tutoring',
    ],
    accentColor: '#006a2d',
    accentBg: '#e8fff4',
    borderColor: 'border-[#86efac]',
    tagBg: 'bg-[#6bff8f]',
    tagText: 'text-[#004a1d]',
    icon: 'emoji_events',
    contact: 'Contact us to enroll',
  },
  {
    badge: 'Quran & Islamic Studies',
    title: 'Quran & Islamic Studies',
    subtitle: 'All Age Groups',
    description:
      'Structured Quran reading, memorization, and Islamic studies classes taught by qualified instructors. Programs available for children and adults across all skill levels.',
    details: [
      { icon: 'person', label: 'Age Group', value: 'All ages welcome' },
      { icon: 'payments', label: 'Fees', value: 'Contact for pricing' },
      { icon: 'schedule', label: 'Schedule', value: 'Flexible scheduling available' },
      { icon: 'mosque', label: 'Centre', value: 'Mind Masters Edu Center' },
    ],
    features: [
      'Quran recitation & Tajweed',
      'Quran memorization (Hifz)',
      'Islamic studies & Seerah',
      'Flexible class timings',
    ],
    accentColor: '#6a5b00',
    accentBg: '#fffbe8',
    borderColor: 'border-[#fde68a]',
    tagBg: 'bg-[#fcdf46]',
    tagText: 'text-[#483d00]',
    icon: 'import_contacts',
    contact: 'Contact us to enroll',
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* Page header */}
      <section className="py-16 px-6 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span
              className="inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              All Programs
            </span>
            <h1
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Our Programs
            </h1>
            <p
              className="text-lg font-bold text-[#5b5b5b] mt-3 max-w-xl"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Explore every program we offer — from preschool to high school, math tutoring to Quran studies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs grid */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {programs.map((prog) => (
              <motion.div
                key={prog.title}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col`}
              >
                {/* Card top accent */}
                <div
                  className="h-2 flex-shrink-0"
                  style={{ backgroundColor: prog.accentColor }}
                />

                <div className="p-7 flex flex-col gap-4 flex-grow">
                  {/* Badge + icon row */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`${prog.tagBg} ${prog.tagText} border-2 border-black font-black text-xs uppercase tracking-wide px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {prog.badge}
                    </span>
                    <div
                      className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: prog.accentBg }}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: prog.accentColor, fontVariationSettings: "'FILL' 1" }}
                      >
                        {prog.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <p
                      className="font-bold text-xs uppercase tracking-widest mb-1"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: prog.accentColor }}
                    >
                      {prog.subtitle}
                    </p>
                    <h3
                      className="text-xl font-black text-[#1a1a1a] leading-tight"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {prog.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="font-bold text-sm text-[#5b5b5b] leading-relaxed flex-grow"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {prog.description}
                  </p>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {prog.details.map((d) => (
                      <div
                        key={d.label}
                        className={`flex items-start gap-2 border-2 ${prog.borderColor} rounded-xl p-2.5`}
                        style={{ backgroundColor: prog.accentBg }}
                      >
                        <span
                          className="material-symbols-outlined text-base flex-shrink-0 mt-0.5"
                          style={{ color: prog.accentColor, fontVariationSettings: "'FILL' 1" }}
                        >
                          {d.icon}
                        </span>
                        <div className="min-w-0">
                          <p
                            className="font-black text-[9px] uppercase tracking-wide leading-none mb-0.5"
                            style={{ fontFamily: 'var(--font-space-grotesk)', color: prog.accentColor }}
                          >
                            {d.label}
                          </p>
                          <p
                            className="font-bold text-[11px] text-[#1a1a1a] leading-snug"
                            style={{ fontFamily: 'var(--font-manrope)' }}
                          >
                            {d.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-1.5">
                    {prog.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: prog.accentColor }}
                        >
                          <span
                            className="material-symbols-outlined text-[9px] text-white"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check
                          </span>
                        </span>
                        <span
                          className="font-bold text-xs text-[#1a1a1a]"
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    <Link
                      href="/contact"
                      className="brutalist-button font-black text-sm px-4 py-2.5 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        backgroundColor: prog.accentBg,
                        color: prog.accentColor,
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        info
                      </span>
                      See Details
                    </Link>
                    <Link
                      href="/apply"
                      className="brutalist-button font-black text-sm px-4 py-2.5 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 text-white"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        backgroundColor: prog.accentColor,
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        arrow_forward
                      </span>
                      Apply Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 md:px-8 bg-black border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Ready to join?
            </h2>
            <p
              className="text-lg font-bold text-[#aaa] mt-2"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Contact us today and we'll help you find the right program.
            </p>
          </div>
          <Link
            href="/contact"
            className="brutalist-button bg-[#6bff8f] text-black font-black text-lg px-10 py-4 border-4 border-[#6bff8f] rounded-xl shadow-[6px_6px_0px_0px_rgba(107,255,143,0.4)] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Contact Us →
          </Link>
        </div>
      </section>

    </main>
  );
}
