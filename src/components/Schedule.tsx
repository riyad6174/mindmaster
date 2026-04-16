'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

type ClassEntry = {
  label: string;
  icon: string;
  category: string;
  bg: string;
  iconColor: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  tagBg: string;
  tagText: string;
};
type BreakRow = {
  type: 'break';
  label: string;
  icon: string;
  accent: string;
};
type ClassRow = {
  type: 'class';
  timeStart: string;
  timeEnd: string;
  classes: Record<string, ClassEntry | null>;
};
type ScheduleRow = ClassRow | BreakRow;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Medium: light pastel bg + solid accent border + colored shadow
const P: Omit<ClassEntry, 'label' | 'icon'> = {
  category: 'Tech',
  bg: 'bg-[#f5e8ff]',
  iconColor: 'text-[#8126cf]',
  textColor: 'text-[#1a1a1a]',
  borderColor: 'border-[#8126cf]',
  shadowColor: 'rgba(129,38,207,0.35)',
  tagBg: 'bg-[#8126cf]',
  tagText: 'text-white',
};
const G: Omit<ClassEntry, 'label' | 'icon'> = {
  category: 'Science',
  bg: 'bg-[#e8fff4]',
  iconColor: 'text-[#006a2d]',
  textColor: 'text-[#1a1a1a]',
  borderColor: 'border-[#006a2d]',
  shadowColor: 'rgba(0,106,45,0.35)',
  tagBg: 'bg-[#006a2d]',
  tagText: 'text-white',
};
const A: Omit<ClassEntry, 'label' | 'icon'> = {
  category: 'Creative',
  bg: 'bg-[#fffbe8]',
  iconColor: 'text-[#6a5b00]',
  textColor: 'text-[#1a1a1a]',
  borderColor: 'border-[#d4a800]',
  shadowColor: 'rgba(212,168,0,0.45)',
  tagBg: 'bg-[#fcdf46]',
  tagText: 'text-[#483d00]',
};

const schedule: ScheduleRow[] = [
  {
    type: 'class',
    timeStart: '09:00',
    timeEnd:   '10:30',
    classes: {
      Monday:    { label: 'Advanced Robotics', icon: 'precision_manufacturing', ...P },
      Tuesday:   { label: 'Creative Coding',   icon: 'code',                    ...P },
      Wednesday: { label: 'Art & Design',       icon: 'palette',                 ...A },
      Thursday:  { label: 'Science Lab',        icon: 'science',                 ...G },
      Friday:    { label: 'Ethics in AI',       icon: 'psychology',              ...G },
    },
  },
  {
    type: 'break',
    label: 'Short Break — 10:30 to 11:00',
    icon: 'free_breakfast',
    accent: '#6bff8f',
  },
  {
    type: 'class',
    timeStart: '11:00',
    timeEnd:   '12:30',
    classes: {
      Monday:    { label: 'Graphic Design',  icon: 'draw',              ...A },
      Tuesday:   { label: 'Math Olympiad',   icon: 'calculate',         ...G },
      Wednesday: { label: '3D Sculpting',    icon: 'view_in_ar',        ...A },
      Thursday:  { label: 'Debate Club',     icon: 'record_voice_over', ...G },
      Friday:    { label: 'Global Politics', icon: 'public',            ...G },
    },
  },
  {
    type: 'break',
    label: 'Lunch Break — 12:30 to 14:00',
    icon: 'restaurant',
    accent: '#fcdf46',
  },
  {
    type: 'class',
    timeStart: '14:00',
    timeEnd:   '15:30',
    classes: {
      Monday:    { label: 'Physics Lab', icon: 'bolt',          ...G },
      Tuesday:   { label: 'VR Explore',  icon: 'vrpano',        ...P },
      Wednesday: { label: 'Robotics',    icon: 'smart_toy',     ...P },
      Thursday:  { label: 'App Dev',     icon: 'phone_android', ...P },
      Friday:    null,
    },
  },
];

// Always-visible bold day header colors
const dayHeaderColors: Record<string, { bg: string; text: string; activeShadow: string }> = {
  Monday:    { bg: '#6bff8f', text: '#004a1d', activeShadow: '0 0 0 4px #004a1d inset' },
  Tuesday:   { bg: '#e5c6ff', text: '#4f0089', activeShadow: '0 0 0 4px #4f0089 inset' },
  Wednesday: { bg: '#fcdf46', text: '#483d00', activeShadow: '0 0 0 4px #483d00 inset' },
  Thursday:  { bg: '#6bff8f', text: '#004a1d', activeShadow: '0 0 0 4px #004a1d inset' },
  Friday:    { bg: '#e5c6ff', text: '#4f0089', activeShadow: '0 0 0 4px #4f0089 inset' },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const rowIn: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  return (
    <section
      id="schedule"
      className="py-24 px-6 md:px-8 bg-[#f8f9fa] border-t-4 border-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6"
        >
          <div>
            <span
              className="inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Weekly Timetable
            </span>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Adventure<br />Schedule
            </h2>
            <p
              className="text-base font-bold text-[#5b5b5b] mt-3"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Tap a day column to highlight your classes
            </p>
          </div>

          {/* Legend pills */}
          <div className="flex flex-wrap gap-3 items-center">
            {[
              { bg: '#f5e8ff', border: '#c4b5fd', dot: '#8126cf', label: 'Tech & Digital' },
              { bg: '#e8fff4', border: '#86efac', dot: '#006a2d', label: 'Science & Academic' },
              { bg: '#fffbe8', border: '#fde68a', dot: '#6a5b00', label: 'Creative Arts' },
            ].map((l) => (
              <div
                key={l.label}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border-2"
                style={{ backgroundColor: l.bg, borderColor: l.border }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: l.dot }} />
                <span
                  className="font-black text-xs uppercase tracking-wide text-[#1a1a1a]"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <div className="border-4 border-black rounded-2xl overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">

          {/* Day headers — always colored, clickable */}
          <div
            className="grid border-b-4 border-black"
            style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}
          >
            {/* Corner cell */}
            <div className="bg-black flex items-center justify-center border-r-4 border-black p-3">
              <span
                className="material-symbols-outlined text-[#6bff8f] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_month
              </span>
            </div>

            {days.map((day) => {
              const c = dayHeaderColors[day];
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(isActive ? null : day)}
                  className="p-4 text-center border-r-4 last:border-r-0 border-black transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: c.bg,
                    boxShadow: isActive ? c.activeShadow : 'none',
                  }}
                >
                  <p
                    className="font-black text-lg md:text-xl uppercase leading-none"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: c.text }}
                  >
                    {day.slice(0, 3)}
                  </p>
                  <p
                    className="font-bold text-[10px] uppercase tracking-widest mt-0.5 hidden md:block opacity-70"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: c.text }}
                  >
                    {day}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Rows */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {schedule.map((row, idx) => {

              /* ── Break row ── */
              if (row.type === 'break') {
                return (
                  <motion.div
                    key={idx}
                    variants={rowIn}
                    className="bg-black border-b-4 border-black last:border-b-0 px-6 py-4 flex items-center gap-4"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-white/20"
                      style={{ backgroundColor: row.accent + '22' }}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ color: row.accent, fontVariationSettings: "'FILL' 1" }}
                      >
                        {row.icon}
                      </span>
                    </div>
                    <span
                      className="font-black text-sm uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: row.accent }}
                    >
                      {row.label}
                    </span>
                  </motion.div>
                );
              }

              /* ── Class row ── */
              return (
                <motion.div
                  key={idx}
                  variants={rowIn}
                  className="grid border-b-4 last:border-b-0 border-black"
                  style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}
                >
                  {/* Time cell */}
                  <div className="bg-black border-r-4 border-black flex flex-col items-center justify-center gap-0.5 py-4 px-2">
                    <span
                      className="font-black text-sm text-[#6bff8f] leading-none"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {row.timeStart}
                    </span>
                    <span className="text-white/30 text-xs font-bold">—</span>
                    <span
                      className="font-black text-sm text-[#6bff8f] leading-none"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {row.timeEnd}
                    </span>
                  </div>

                  {/* Class cells */}
                  {days.map((day) => {
                    const cell = row.classes[day];
                    const isDimmed = activeDay && activeDay !== day;
                    return (
                      <div
                        key={day}
                        className={`p-2.5 border-r-4 last:border-r-0 border-black transition-opacity duration-300 ${isDimmed ? 'opacity-15' : 'opacity-100'}`}
                      >
                        {cell ? (
                          <motion.div
                            whileHover={{ scale: 1.04, y: -3, transition: { duration: 0.18 } }}
                            whileTap={{ scale: 0.97 }}
                            className={`${cell.bg} border-2 ${cell.borderColor} rounded-xl p-3 h-full cursor-pointer flex flex-col gap-2`}
                            style={{ boxShadow: `4px 4px 0px 0px ${cell.shadowColor}` }}
                          >
                            {/* Top row: icon + category tag */}
                            <div className="flex items-start justify-between gap-1">
                              <span
                                className={`material-symbols-outlined text-3xl ${cell.iconColor}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                {cell.icon}
                              </span>
                              <span
                                className={`${cell.tagBg} ${cell.tagText} font-black text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-md leading-none whitespace-nowrap`}
                                style={{ fontFamily: 'var(--font-space-grotesk)' }}
                              >
                                {cell.category}
                              </span>
                            </div>
                            {/* Label */}
                            <p
                              className={`font-black text-xs leading-snug ${cell.textColor}`}
                              style={{ fontFamily: 'var(--font-space-grotesk)' }}
                            >
                              {cell.label}
                            </p>
                          </motion.div>
                        ) : (
                          <div
                            className="rounded-xl h-full min-h-[90px] flex items-center justify-center"
                            style={{
                              background: 'repeating-linear-gradient(45deg, #f1f1f1, #f1f1f1 4px, #ffffff 4px, #ffffff 12px)',
                              border: '2px dashed #e2e2e2',
                            }}
                          >
                            <p
                              className="font-black text-xs text-[#c0c0c0] uppercase tracking-widest"
                              style={{ fontFamily: 'var(--font-space-grotesk)' }}
                            >
                              Off
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
