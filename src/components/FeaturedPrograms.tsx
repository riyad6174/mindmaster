'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import program1 from '../assets/images/program1.png';
import program2 from '../assets/images/program2.webp';

const programs = [
  {
    id: 'after-school',
    badge: 'After School',
    badgeBg: 'bg-[#e8f4ff]',
    badgeText: 'text-[#1a84d2]',
    badgeBorder: 'border-[#1a84d2]',
    accentColor: '#1a84d2',
    accentBg: '#e8f4ff',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    imageAlt: 'After School Program',
    icon: 'local_library',
    iconBg: 'bg-[#e8f4ff]',
    iconColor: 'text-[#1a84d2]',
    title: 'After School Program',
    subtitle: 'Grades 4-12',
    overview: 'Sunshine Program (Grades 4-8), Freshman/Sophomore Math & Science (Grades 8-10), and Junior/Senior Math & Science (Grades 11-12) to support academic growth.',
    details: [
      { icon: 'school', label: 'Grades', value: 'Grade 4 - Grade 12' },
      { icon: 'payments', label: 'Fees', value: 'Contact for pricing' },
      { icon: 'schedule', label: 'Schedule', value: 'Weekdays · After school hours' },
      { icon: 'location_on', label: 'Location', value: 'Mind Masters Edu Center' },
    ],
    features: [
      'Sunshine Program (Grades 4-8)',
      'Freshman/Sophomore Math & Science',
      'Junior/Senior Math & Science',
      'Curriculum-aligned support',
    ],
    cta: 'Register Now',
    contact: 'Contact us to enroll',
  },
  {
    id: 'university-support',
    badge: 'University Support',
    badgeBg: 'bg-[#fffbe8]',
    badgeText: 'text-[#6a5b00]',
    badgeBorder: 'border-[#fde68a]',
    accentColor: '#6a5b00',
    accentBg: '#fffbe8',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    imageAlt: 'University Support',
    icon: 'account_balance',
    iconBg: 'bg-[#fffbe8]',
    iconColor: 'text-[#6a5b00]',
    title: 'University Support',
    subtitle: 'Admission & Tutoring',
    overview: 'Comprehensive University-Level Tutoring, Top 10 Canadian Universities Admission Preparation, IELTS Preparation, and On-Demand Hourly Tutoring to help you succeed in higher education.',
    details: [
      { icon: 'school', label: 'Level', value: 'Pre-University & University' },
      { icon: 'payments', label: 'Fees', value: 'Contact for pricing' },
      { icon: 'schedule', label: 'Schedule', value: 'Flexible scheduling' },
      { icon: 'location_on', label: 'Location', value: 'Mind Masters Edu Center & Online' },
    ],
    features: [
      'University-Level Tutoring',
      'Top 10 Admission Prep',
      'IELTS Preparation',
      'On-Demand Hourly Tutoring',
    ],
    cta: 'Register Now',
    contact: 'Contact us to enroll',
  },
  {
    id: 'krazy-math',
    badge: 'After School Club',
    badgeBg: 'bg-[#f5e8ff]',
    badgeText: 'text-[#8126cf]',
    badgeBorder: 'border-[#c4b5fd]',
    accentColor: '#8126cf',
    accentBg: '#f5e8ff',
    image: program1,
    imageAlt: 'Krazy Math Tutorial students',
    icon: 'calculate',
    iconBg: 'bg-[#f5e8ff]',
    iconColor: 'text-[#8126cf]',
    title: 'Krazy Math Tutorial',
    subtitle: 'Advanced After School Program',
    overview: 'An advanced math-focused after-school program aligned with the Saskatchewan School Board curriculum — designed to challenge and inspire students from Grade 2 through Grade 12.',
    details: [
      { icon: 'school',       label: 'Grades',   value: 'Grade 2 – Grade 12' },
      { icon: 'payments',     label: 'Fees',     value: 'Gr 2–7: $120/mo · Gr 8–12: $150/mo' },
      { icon: 'schedule',     label: 'Schedule', value: 'Mon, Tue, Thu · 6:30 – 8:30 PM' },
      { icon: 'location_on',  label: 'Location', value: '1876 Wallace St, Regina, SK S4P 0H4' },
    ],
    features: [
      'Advanced-level math instruction',
      'Saskatchewan curriculum-aligned',
      'Grades 2 through 12',
      '$50 sibling discount',
    ],
    cta: 'Register Now',
    contact: '+1 (306) 515-3614',
  },
  {
    id: 'preschool',
    badge: 'Preschool & After School',
    badgeBg: 'bg-[#e8f4ff]',
    badgeText: 'text-[#1a84d2]',
    badgeBorder: 'border-[#1a84d2]',
    accentColor: '#1a84d2',
    accentBg: '#e8f4ff',
    image: program2,
    imageAlt: 'Preschool program at Darul Falah Islamic Centre',
    icon: 'child_care',
    iconBg: 'bg-[#e8f4ff]',
    iconColor: 'text-[#1a84d2]',
    title: 'Preschool Program',
    subtitle: 'Darul Falah Islamic Centre',
    overview: 'A nurturing preschool and after-school program focused on learning through play, creativity, and foundational skills — enriched with Islamic values to build strong character from the very beginning.',
    details: [
      { icon: 'child_care',  label: 'Age Group', value: '3 – 5 Years' },
      { icon: 'payments',    label: 'Fees',      value: '$200 / month' },
      { icon: 'schedule',    label: 'Schedule',  value: 'Mon – Fri · 9:00 AM – 12:00 PM' },
      { icon: 'mosque',      label: 'Centre',    value: 'Darul Falah Islamic Centre' },
    ],
    features: [
      'Learning through play & creativity',
      'Foundational literacy & numeracy',
      'Islamic values & character building',
      'Safe & nurturing environment',
    ],
    cta: 'Register Now',
    contact: 'Contact for details',
  },
];

export default function FeaturedPrograms() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setItemsPerView(1);
      } else {
        setItemsPerView(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, programs.length - itemsPerView);

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <section className="py-24 px-6 md:px-8 bg-[#f1f1f1] border-t-4 border-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto overflow-visible lg:overflow-hidden px-1">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span
              className="inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Featured Programs
            </span>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Our Signature<br />Programs
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6">
            <p
              className="text-lg font-bold text-[#5b5b5b] max-w-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Carefully designed programs that blend structured learning with real-world skills.
            </p>
            {/* Navigation Controls */}
            <div className="flex gap-3 mt-auto">
              <button 
                onClick={prevSlide} 
                disabled={currentIndex === 0} 
                className="w-12 h-12 border-4 border-black rounded-xl bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                aria-label="Previous Program"
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
              </button>
              <button 
                onClick={nextSlide} 
                disabled={currentIndex >= maxIndex} 
                className="w-12 h-12 border-4 border-black rounded-xl bg-[#1a84d2] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#125d93] transition-colors"
                aria-label="Next Program"
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2-col Slider */}
        <div className="w-full relative py-2 pb-4 mb-2 flex-grow overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full relative"
            style={{ transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (1.5 / itemsPerView)}rem))` }}
          >
            {programs.map((prog) => (
              <div
                key={prog.title}
                className="w-[calc(100%-0.5rem)] lg:w-[calc(50%-1.25rem)] flex-shrink-0 bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 border-b-4 border-black overflow-hidden flex-shrink-0">
                  <Image
                    src={prog.image}
                    alt={prog.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 ${prog.badgeBg} ${prog.badgeText} border-2 ${prog.badgeBorder} font-black text-xs uppercase tracking-wide px-3 py-1.5 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      <span
                        className={`material-symbols-outlined text-base ${prog.iconColor}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {prog.icon}
                      </span>
                      {prog.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col gap-5 flex-grow">
                  <div>
                    <p
                      className="font-bold text-xs uppercase tracking-widest mb-1"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: prog.accentColor }}
                    >
                      {prog.subtitle}
                    </p>
                    <h3
                      className="text-2xl md:text-3xl font-black text-[#1a1a1a] leading-tight"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {prog.title}
                    </h3>
                  </div>

                  <p
                    className="font-bold text-sm text-[#5b5b5b] leading-relaxed flex-grow"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {prog.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {prog.details.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-start gap-2.5 border-2 border-[#e2e2e2] rounded-xl p-3"
                      >
                        <div
                          className={`w-8 h-8 ${prog.iconBg} border-2 rounded-lg flex items-center justify-center flex-shrink-0`}
                          style={{ borderColor: prog.accentColor + '55' }}
                        >
                          <span
                            className={`material-symbols-outlined text-base ${prog.iconColor}`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {d.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p
                            className="font-black text-[10px] uppercase tracking-wide text-[#5b5b5b] leading-none mb-0.5"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}
                          >
                            {d.label}
                          </p>
                          <p
                            className="font-bold text-xs text-[#1a1a1a] leading-snug"
                            style={{ fontFamily: 'var(--font-manrope)' }}
                          >
                            {d.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    {prog.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: prog.accentColor }}
                        >
                          <span
                            className="material-symbols-outlined text-[11px] text-white"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check
                          </span>
                        </span>
                        <span
                          className="font-bold text-sm text-[#1a1a1a]"
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2">
                    <Link
                      href={`/apply?program=${prog.id}`}
                      className="brutalist-button font-black text-sm px-6 py-3 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        backgroundColor: prog.accentColor,
                        color: 'white',
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        arrow_forward
                      </span>
                      {prog.cta}
                    </Link>
                    <div className="flex items-center gap-2 text-[#5b5b5b]">
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ color: prog.accentColor, fontVariationSettings: "'FILL' 1" }}
                      >
                        phone
                      </span>
                      <span
                        className="font-bold text-sm"
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      >
                        {prog.contact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
