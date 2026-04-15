'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

type ClassEntry = {
  label: string;
  icon: string;
  bg: string;
  iconColor: string;
  borderColor: string;
};
type BreakRow = {
  type: 'break';
  label: string;
  bg: string;
  textColor: string;
  icon: string;
};
type ClassRow = {
  type: 'class';
  time: string;
  classes: Record<string, ClassEntry | null>;
};
type ScheduleRow = ClassRow | BreakRow;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// 3-color palette only: purple (tech), green (science/academic), amber (creative)
const P = {
  bg: 'bg-[#f5e8ff]',
  iconColor: 'text-[#8126cf]',
  borderColor: 'border-[#c4b5fd]',
};
const G = {
  bg: 'bg-[#e8fff4]',
  iconColor: 'text-[#006a2d]',
  borderColor: 'border-[#86efac]',
};
const A = {
  bg: 'bg-[#fffbe8]',
  iconColor: 'text-[#6a5b00]',
  borderColor: 'border-[#fde68a]',
};

const schedule: ScheduleRow[] = [
  {
    type: 'class',
    time: '09:00 – 10:30',
    classes: {
      Monday: {
        label: 'Advanced Robotics',
        icon: 'precision_manufacturing',
        ...P,
      },
      Tuesday: { label: 'Creative Coding', icon: 'code', ...P },
      Wednesday: { label: 'Art & Design', icon: 'palette', ...A },
      Thursday: { label: 'Science Lab', icon: 'science', ...G },
      Friday: { label: 'Ethics in AI', icon: 'psychology', ...G },
    },
  },
  {
    type: 'break',
    label: 'Short Break — 10:30 to 11:00',
    bg: 'bg-[#fffbe8]',
    textColor: 'text-[#6a5b00]',
    icon: 'free_breakfast',
  },
  {
    type: 'class',
    time: '11:00 – 12:30',
    classes: {
      Monday: { label: 'Graphic Design', icon: 'draw', ...A },
      Tuesday: { label: 'Math Olympiad', icon: 'calculate', ...G },
      Wednesday: { label: '3D Sculpting', icon: 'view_in_ar', ...A },
      Thursday: { label: 'Debate Club', icon: 'record_voice_over', ...G },
      Friday: { label: 'Global Politics', icon: 'public', ...G },
    },
  },
  {
    type: 'break',
    label: 'Lunch Break — 12:30 to 14:00',
    bg: 'bg-[#e8fff4]',
    textColor: 'text-[#006a2d]',
    icon: 'restaurant',
  },
  {
    type: 'class',
    time: '14:00 – 15:30',
    classes: {
      Monday: { label: 'Physics Lab', icon: 'bolt', ...G },
      Tuesday: { label: 'VR Explore', icon: 'vrpano', ...P },
      Wednesday: { label: 'Robotics', icon: 'smart_toy', ...P },
      Thursday: { label: 'App Dev', icon: 'phone_android', ...P },
      Friday: null,
    },
  },
];

const dayColors: Record<string, string> = {
  Monday: 'bg-[#6bff8f] text-[#004a1d]',
  Tuesday: 'bg-[#e5c6ff] text-[#4f0089]',
  Wednesday: 'bg-[#fcdf46] text-[#483d00]',
  Thursday: 'bg-[#6bff8f] text-[#004a1d]',
  Friday: 'bg-[#e5c6ff] text-[#4f0089]',
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  return (
    <section
      id='schedule'
      className='py-24 px-6 md:px-8 bg-[#f8f9fa] border-t-4 border-black overflow-hidden'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className='flex flex-col md:flex-row justify-between items-end mb-10 gap-6'
        >
          <div>
            <span
              className='inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Weekly Timetable
            </span>
            <h2
              className='text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Adventure
              <br />
              Schedule
            </h2>
            <p
              className='text-base font-bold text-[#5b5b5b] mt-3'
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Click a day to highlight your classes
            </p>
          </div>

          {/* Day filter pills */}
          <div className='flex flex-wrap gap-2'>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(activeDay === day ? null : day)}
                className={`font-black text-xs uppercase px-4 py-2 border-2 border-black rounded-full transition-all duration-200 ${
                  activeDay === day
                    ? `${dayColors[day]} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                    : 'bg-white text-[#5b5b5b] hover:bg-[#f1f1f1]'
                }`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <div className='border-2 border-black rounded overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white'>
          {/* Day headers */}
          <div
            className='grid border-b-2 border-black'
            style={{ gridTemplateColumns: '140px repeat(5, 1fr)' }}
          >
            <div className='p-4 bg-[#f1f1f1] border-r-2 border-black' />
            {days.map((day) => (
              <div
                key={day}
                className={`p-4 text-center border-r-2 last:border-r-0 border-black transition-colors duration-200 ${
                  activeDay === day
                    ? dayColors[day]
                    : 'bg-[#f1f1f1] text-[#1a1a1a]'
                }`}
              >
                <p
                  className='font-black text-sm uppercase tracking-wide'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {day.slice(0, 3)}
                </p>
                <p
                  className='font-bold text-xs opacity-60 hidden md:block'
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {day}
                </p>
              </div>
            ))}
          </div>

          {/* Rows */}
          <motion.div
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.1 }}
          >
            {schedule.map((row, idx) => {
              if (row.type === 'break') {
                return (
                  <motion.div
                    key={idx}
                    variants={rowVariant}
                    className={`${row.bg} border-b-2 border-black last:border-b-0 px-6 py-3 flex items-center gap-3`}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${row.textColor}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {row.icon}
                    </span>
                    <span
                      className={`font-black text-sm uppercase tracking-wide ${row.textColor}`}
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {row.label}
                    </span>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={idx}
                  variants={rowVariant}
                  className='grid border-b-2 last:border-b-0 border-black'
                  style={{ gridTemplateColumns: '140px repeat(5, 1fr)' }}
                >
                  {/* Time cell */}
                  <div className='p-4 bg-[#f1f1f1] border-r-2 border-black flex items-center justify-center'>
                    <span
                      className='font-black text-xs text-[#5b5b5b] text-center leading-tight'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {row.time}
                    </span>
                  </div>

                  {/* Class cells */}
                  {days.map((day) => {
                    const cell = row.classes[day];
                    const isDimmed = activeDay && activeDay !== day;
                    return (
                      <div
                        key={day}
                        className={`p-3 border-r-2 last:border-r-0 border-black transition-opacity duration-200 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                      >
                        {cell ? (
                          <motion.div
                            whileHover={{ scale: 1.04, y: -2 }}
                            transition={{ duration: 0.18 }}
                            className={`${cell.bg} border-2 ${cell.borderColor} rounded-xl p-3 h-full cursor-pointer`}
                          >
                            <span
                              className={`material-symbols-outlined text-xl ${cell.iconColor} block mb-1`}
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {cell.icon}
                            </span>
                            <p
                              className='font-black text-xs text-[#1a1a1a] leading-tight'
                              style={{
                                fontFamily: 'var(--font-space-grotesk)',
                              }}
                            >
                              {cell.label}
                            </p>
                          </motion.div>
                        ) : (
                          <div className='bg-[#f8f9fa] border-2 border-dashed border-[#e2e2e2] rounded-xl p-3 h-full flex items-center justify-center'>
                            <p
                              className='font-bold text-xs text-[#c0c0c0] text-center'
                              style={{ fontFamily: 'var(--font-manrope)' }}
                            >
                              Day Off
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

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='mt-6 flex flex-wrap gap-4 items-center'
        >
          <span
            className='font-black text-xs uppercase text-[#5b5b5b] tracking-wide'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Subject categories:
          </span>
          {[
            {
              bg: 'bg-[#f5e8ff]',
              border: 'border-[#c4b5fd]',
              label: 'Tech & Digital',
            },
            {
              bg: 'bg-[#e8fff4]',
              border: 'border-[#86efac]',
              label: 'Science & Academic',
            },
            {
              bg: 'bg-[#fffbe8]',
              border: 'border-[#fde68a]',
              label: 'Creative Arts',
            },
          ].map((l) => (
            <div key={l.label} className='flex items-center gap-2'>
              <span
                className={`w-3 h-3 rounded-sm ${l.bg} border ${l.border} inline-block`}
              />
              <span
                className='font-bold text-xs text-[#5b5b5b]'
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {l.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
