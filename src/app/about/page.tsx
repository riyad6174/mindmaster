'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { value: '500+', label: 'Students Enrolled', icon: 'people', color: '#1a84d2', bg: '#e8f4ff', border: 'border-[#86c8ef]' },
  { value: '10+', label: 'Years of Excellence', icon: 'verified', color: '#8126cf', bg: '#f5e8ff', border: 'border-[#c4b5fd]' },
  { value: '20+', label: 'Expert Educators', icon: 'school', color: '#6a5b00', bg: '#fffbe8', border: 'border-[#fde68a]' },
  { value: '95%', label: 'Student Success Rate', icon: 'emoji_events', color: '#1a84d2', bg: '#e8f4ff', border: 'border-[#86c8ef]' },
];

const teamMembers = [
  {
    name: 'Aisha Rahman',
    role: 'Head of Curriculum',
    icon: 'menu_book',
    bg: '#e8f4ff',
    iconColor: '#1a84d2',
    border: 'border-[#86c8ef]',
    tagBg: 'bg-[#6bb1ff]',
    tagText: 'text-[#003459]',
    desc: 'MA in Education with 12 years developing outcome-driven curricula for K-12 learners.',
  },
  {
    name: 'Omar Siddiqui',
    role: 'Lead Math Instructor',
    icon: 'calculate',
    bg: '#f5e8ff',
    iconColor: '#8126cf',
    border: 'border-[#c4b5fd]',
    tagBg: 'bg-[#e5c6ff]',
    tagText: 'text-[#4f0089]',
    desc: 'Former Olympiad coach with a decade of transforming students into confident problem-solvers.',
  },
  {
    name: 'Fatima Al-Noor',
    role: 'Preschool Director',
    icon: 'child_care',
    bg: '#fffbe8',
    iconColor: '#6a5b00',
    border: 'border-[#fde68a]',
    tagBg: 'bg-[#fcdf46]',
    tagText: 'text-[#483d00]',
    desc: 'Early childhood specialist who believes every child learns best through play and exploration.',
  },
  {
    name: 'Yusuf Malik',
    role: 'Quran & Islamic Studies',
    icon: 'import_contacts',
    bg: '#e8f4ff',
    iconColor: '#1a84d2',
    border: 'border-[#86c8ef]',
    tagBg: 'bg-[#6bb1ff]',
    tagText: 'text-[#003459]',
    desc: 'Hafiz ul Quran with ijazah in Tajweed, bringing warmth and patience to every class.',
  },
  {
    name: 'Sara Hussain',
    role: 'Student Counselor',
    icon: 'psychology',
    bg: '#f5e8ff',
    iconColor: '#8126cf',
    border: 'border-[#c4b5fd]',
    tagBg: 'bg-[#e5c6ff]',
    tagText: 'text-[#4f0089]',
    desc: 'Certified counselor focused on social-emotional learning and helping students thrive.',
  },
  {
    name: 'Hassan Qureshi',
    role: 'Technology & STEM Lead',
    icon: 'precision_manufacturing',
    bg: '#fffbe8',
    iconColor: '#6a5b00',
    border: 'border-[#fde68a]',
    tagBg: 'bg-[#fcdf46]',
    tagText: 'text-[#483d00]',
    desc: 'Software engineer turned educator — runs robotics, coding camps, and VR learning sessions.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* ── HERO ── */}
      <section className="relative py-20 px-6 md:px-8 bg-black border-b-4 border-black overflow-hidden">
        {/* dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#6bb1ff_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span
              className="inline-block bg-[#6bb1ff] border-2 border-[#6bb1ff] px-4 py-1 font-black text-xs uppercase tracking-widest mb-6 shadow-[3px_3px_0px_0px_rgba(107,255,143,0.5)]"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#003459' }}
            >
              Our Story
            </span>
            <h1
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              We Are<br />
              <span style={{ color: '#6bb1ff' }}>Mind Masters</span>
            </h1>
            <p
              className="text-lg md:text-xl font-bold text-[#aaa] max-w-2xl leading-relaxed mb-10"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              A community where curious minds collide with creative genius. Since our founding, we have been transforming students into confident leaders — one lesson at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="brutalist-button bg-[#6bb1ff] text-black font-black px-8 py-4 border-4 border-[#6bb1ff] rounded-xl shadow-[6px_6px_0px_0px_rgba(107,255,143,0.4)] text-base"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Apply Now →
              </Link>
              <Link
                href="/contact"
                className="brutalist-button bg-transparent text-white font-black px-8 py-4 border-4 border-white rounded-xl text-base"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 px-6 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className={`${s.border} border-2 rounded-2xl p-6 flex flex-col items-start gap-2`}
                style={{ backgroundColor: s.bg }}
              >
                <div
                  className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center mb-1"
                  style={{ backgroundColor: s.color }}
                >
                  <span
                    className="material-symbols-outlined text-xl text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {s.icon}
                  </span>
                </div>
                <span
                  className="text-3xl font-black text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-bold text-sm text-[#5b5b5b]"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT TEXT ── */}
      <section className="py-20 px-6 md:px-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Left text */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-block bg-[#fcdf46] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Who We Are
              </span>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-[#1a1a1a] mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                More Than a<br />
                <span style={{ color: '#8126cf' }}>Tutoring Centre</span>
              </h2>
              <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                <p className="font-bold text-base text-[#2f2f2f] leading-relaxed">
                  Mind Masters Edu Center was founded with a simple but powerful belief: every child carries a unique spark of genius. Our role is to fan that flame — not extinguish it with one-size-fits-all instruction.
                </p>
                <p className="font-bold text-base text-[#2f2f2f] leading-relaxed">
                  We offer a range of carefully designed programs from preschool through Grade 12, blending rigorous academics with Islamic values, creative exploration, and character development. Whether your child needs extra support, advanced challenge, or a nurturing first school experience — we have a place for them here.
                </p>
                <p className="font-bold text-base text-[#2f2f2f] leading-relaxed">
                  Our educators are not just teachers — they are mentors, coaches, and community builders who invest deeply in every student's growth. Small class sizes, personalised attention, and a warm environment set us apart.
                </p>
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="bg-[#8126cf] border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span
                  className="material-symbols-outlined text-5xl text-white mb-4 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lightbulb
                </span>
                <h3
                  className="text-xl font-black text-white mb-2 uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Our Mission
                </h3>
                <p
                  className="font-bold text-sm text-[#e5c6ff] leading-relaxed"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  To inspire a lifelong love of learning by delivering world-class education enriched with strong moral and Islamic values — shaping tomorrow's leaders today.
                </p>
              </div>
              <div className="bg-[#1a84d2] border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span
                  className="material-symbols-outlined text-5xl text-white mb-4 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  visibility
                </span>
                <h3
                  className="text-xl font-black text-white mb-2 uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Our Vision
                </h3>
                <p
                  className="font-bold text-sm text-[#86c8ef] leading-relaxed"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  To be the most trusted educational partner for families — a place where every student discovers their potential and steps into the future with confidence and purpose.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-20 px-6 md:px-8 bg-white border-y-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            <span
              className="inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Founder
            </span>
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Meet the Founder
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Founder image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative border-4 border-black rounded-2xl overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] aspect-[4/3]">
                <Image
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
                  alt="Founder of Mind Masters Edu Center"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Name badge over image */}
                <div className="absolute bottom-5 left-5">
                  <div className="bg-[#fcdf46] border-2 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p
                      className="font-black text-base text-[#1a1a1a] leading-none"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      Dr. Khalid Ansari
                    </p>
                    <p
                      className="font-bold text-xs text-[#483d00]"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      Founder & Director
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Founder text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              <div>
                <p
                  className="font-black text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#8126cf' }}
                >
                  A Message from Our Founder
                </p>
                <h3
                  className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Building Futures,<br />One Student at a Time
                </h3>
              </div>

              <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                <p className="font-bold text-base text-[#2f2f2f] leading-relaxed">
                  "I started Mind Masters because I saw too many brilliant children slipping through the cracks of the traditional education system — not because they lacked ability, but because no one had taken the time to teach them in a way that resonated with them."
                </p>
                <p className="font-bold text-base text-[#2f2f2f] leading-relaxed">
                  "With a background in educational psychology and over 15 years of teaching experience, I knew we could do better. Mind Masters was built on the principle that education should be joyful, rigorous, and deeply personal."
                </p>
                <p className="font-bold text-base text-[#2f2f2f] leading-relaxed">
                  "Today, I am proud to lead a team of passionate educators who share this vision — and even prouder to see our students grow into confident, curious, and compassionate human beings."
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="bg-[#f5e8ff] border-2 border-[#c4b5fd] rounded-xl px-4 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#8126cf]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                  <span className="font-black text-xs text-[#4f0089]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>PhD Education</span>
                </div>
                <div className="bg-[#e8f4ff] border-2 border-[#86c8ef] rounded-xl px-4 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#1a84d2]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  <span className="font-black text-xs text-[#003459]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>15+ Years Teaching</span>
                </div>
                <div className="bg-[#fffbe8] border-2 border-[#fde68a] rounded-xl px-4 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#6a5b00]" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                  <span className="font-black text-xs text-[#483d00]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Islamic Scholar</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 px-6 md:px-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            <span
              className="inline-block bg-[#8126cf] text-white border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Our People
            </span>
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Meet the Team
            </h2>
            <p
              className="text-lg font-bold text-[#5b5b5b] mt-2 max-w-xl"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Dedicated educators who pour their hearts into every student&apos;s success.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col`}
              >
                {/* Top accent */}
                <div
                  className="h-2"
                  style={{ backgroundColor: member.iconColor }}
                />
                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0`}
                      style={{ backgroundColor: member.bg }}
                    >
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ color: member.iconColor, fontVariationSettings: "'FILL' 1" }}
                      >
                        {member.icon}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-black text-base text-[#1a1a1a] leading-tight"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {member.name}
                      </h3>
                      <span
                        className={`${member.tagBg} ${member.tagText} border border-black font-black text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md`}
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <p
                    className="font-bold text-sm text-[#5b5b5b] leading-relaxed"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-16 px-6 md:px-8 bg-black border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Become Part of<br />
              <span style={{ color: '#6bb1ff' }}>Our Community</span>
            </h2>
            <p
              className="text-lg font-bold text-[#aaa] mt-2"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Apply today and give your child the education they deserve.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="brutalist-button bg-[#6bb1ff] text-black font-black text-base px-8 py-4 border-4 border-[#6bb1ff] rounded-xl shadow-[6px_6px_0px_0px_rgba(107,255,143,0.4)] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Apply Now →
            </Link>
            <Link
              href="/contact"
              className="brutalist-button bg-transparent text-white font-black text-base px-8 py-4 border-4 border-white rounded-xl whitespace-nowrap"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
