'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, dateFnsLocalizer, type View, type EventProps } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enCA } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-CA': enCA };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

type EventCategory = 'academic' | 'holiday' | 'exam' | 'event' | 'break';

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  category: EventCategory;
  allDay?: boolean;
  desc?: string;
}

const y = new Date().getFullYear();

const events: CalendarEvent[] = [
  // ── Academic Term markers ──
  { id: 1,  title: 'First Day of School',                  start: new Date(y, 8, 3),   end: new Date(y, 8, 3),   category: 'academic', allDay: true, desc: 'Welcome back! All programs resume.' },
  { id: 2,  title: 'Last Day of School',                   start: new Date(y, 5, 26),  end: new Date(y, 5, 26),  category: 'academic', allDay: true, desc: 'Final day of 2024–25 academic year.' },
  { id: 3,  title: 'Report Cards Distributed',             start: new Date(y, 10, 15), end: new Date(y, 10, 15), category: 'academic', allDay: true, desc: 'First-term progress reports sent home.' },
  { id: 4,  title: 'Report Cards Distributed',             start: new Date(y+1, 2, 14),end: new Date(y+1, 2, 14),category: 'academic', allDay: true, desc: 'Second-term progress reports sent home.' },

  // ── Exams ──
  { id: 5,  title: 'Mid-Term Exams',                       start: new Date(y, 9, 20),  end: new Date(y, 9, 24),  category: 'exam',     allDay: true, desc: 'Mid-term assessments for all grades.' },
  { id: 6,  title: 'Final Exams – Winter',                 start: new Date(y, 11, 9),  end: new Date(y, 11, 13), category: 'exam',     allDay: true, desc: 'Semester 1 final examinations.' },
  { id: 7,  title: 'Final Exams – Spring',                 start: new Date(y+1, 5, 9), end: new Date(y+1, 5, 13),category: 'exam',     allDay: true, desc: 'Semester 2 final examinations.' },
  { id: 8,  title: 'IELTS Prep Mock Test',                 start: new Date(y, 9, 5),   end: new Date(y, 9, 5),   category: 'exam',     allDay: true, desc: 'Practice IELTS assessment for enrolled students.' },
  { id: 9,  title: 'University Admission Mock Interviews', start: new Date(y, 10, 1),  end: new Date(y, 10, 2),  category: 'exam',     allDay: true, desc: 'Simulated university admission interviews.' },

  // ── Holidays ──
  { id: 10, title: '🍁 Thanksgiving Day',                  start: new Date(y, 9, 14),  end: new Date(y, 9, 14),  category: 'holiday',  allDay: true, desc: 'School closed – Thanksgiving.' },
  { id: 11, title: '🎖️ Remembrance Day',                  start: new Date(y, 10, 11), end: new Date(y, 10, 11), category: 'holiday',  allDay: true, desc: 'School closed – Remembrance Day.' },
  { id: 12, title: '🎄 Winter Break',                      start: new Date(y, 11, 23), end: new Date(y+1, 0, 3), category: 'break',    allDay: true, desc: 'Winter break – school closed.' },
  { id: 13, title: '🎉 New Year\'s Day',                   start: new Date(y+1, 0, 1), end: new Date(y+1, 0, 1), category: 'holiday',  allDay: true, desc: 'Happy New Year!' },
  { id: 14, title: '🌸 Family Day',                        start: new Date(y+1, 1, 17),end: new Date(y+1, 1, 17),category: 'holiday',  allDay: true, desc: 'School closed – Family Day.' },
  { id: 15, title: '🌷 Spring Break',                      start: new Date(y+1, 2, 24),end: new Date(y+1, 2, 28),category: 'break',    allDay: true, desc: 'Spring break – school closed.' },
  { id: 16, title: '🐣 Good Friday',                       start: new Date(y+1, 3, 18),end: new Date(y+1, 3, 18),category: 'holiday',  allDay: true, desc: 'School closed – Good Friday.' },
  { id: 17, title: '🌅 Victoria Day',                      start: new Date(y+1, 4, 19),end: new Date(y+1, 4, 19),category: 'holiday',  allDay: true, desc: 'School closed – Victoria Day.' },

  // ── School Events ──
  { id: 18, title: 'Open House & Enrollment Drive',        start: new Date(y, 7, 26),  end: new Date(y, 7, 26),  category: 'event',    allDay: true, desc: 'Meet teachers and register for programs.' },
  { id: 19, title: 'Back-to-School Night',                 start: new Date(y, 8, 10),  end: new Date(y, 8, 10),  category: 'event',    allDay: true, desc: 'Parent-teacher orientation evening.' },
  { id: 20, title: 'Professional Development Day',         start: new Date(y, 9, 11),  end: new Date(y, 9, 11),  category: 'event',    allDay: true, desc: 'No student classes – PD Day.' },
  { id: 21, title: 'Science Fair',                         start: new Date(y, 10, 22), end: new Date(y, 10, 22), category: 'event',    allDay: true, desc: 'Annual science exhibition for Grades 4–12.' },
  { id: 22, title: 'Math Olympiad',                        start: new Date(y, 10, 29), end: new Date(y, 10, 29), category: 'event',    allDay: true, desc: 'Competitive math olympiad – Krazy Math students.' },
  { id: 23, title: 'Parent-Teacher Conferences',          start: new Date(y, 10, 6),  end: new Date(y, 10, 7),  category: 'event',    allDay: true, desc: 'Scheduled conferences for all programs.' },
  { id: 24, title: 'IELTS Information Session',            start: new Date(y, 8, 18),  end: new Date(y, 8, 18),  category: 'event',    allDay: true, desc: 'Free info session for IELTS Preparation program.' },
  { id: 25, title: 'University Admission Workshop',        start: new Date(y, 9, 26),  end: new Date(y, 9, 26),  category: 'event',    allDay: true, desc: 'Top 10 Canadian Universities strategies session.' },
  { id: 26, title: 'Winter Concert',                       start: new Date(y, 11, 6),  end: new Date(y, 11, 6),  category: 'event',    allDay: true, desc: 'Annual student winter performance.' },
  { id: 27, title: 'Year-End Awards Ceremony',            start: new Date(y+1, 5, 20),end: new Date(y+1, 5, 20),category: 'event',    allDay: true, desc: 'Celebrating student achievements.' },
];

const categoryConfig: Record<EventCategory, { bg: string; border: string; text: string; label: string; tagBg: string; tagText: string }> = {
  academic: { bg: '#1a84d2', border: '#003459', text: '#fff',    label: 'Academic',  tagBg: 'bg-[#e8f4ff]', tagText: 'text-[#1a84d2]' },
  exam:     { bg: '#8126cf', border: '#3d006e', text: '#fff',    label: 'Exam',      tagBg: 'bg-[#f5e8ff]', tagText: 'text-[#8126cf]' },
  holiday:  { bg: '#b02500', border: '#520c00', text: '#fff',    label: 'Holiday',   tagBg: 'bg-[#fff0ec]', tagText: 'text-[#b02500]' },
  break:    { bg: '#6a5b00', border: '#3b3200', text: '#fff',    label: 'Break',     tagBg: 'bg-[#fffbe8]', tagText: 'text-[#6a5b00]' },
  event:    { bg: '#1d7c5e', border: '#0a3728', text: '#fff',    label: 'Event',     tagBg: 'bg-[#e4fff6]', tagText: 'text-[#1d7c5e]' },
};

const Legend = () => (
  <div className="flex flex-wrap gap-3">
    {Object.entries(categoryConfig).map(([key, val]) => (
      <div key={key} className={`flex items-center gap-2 ${val.tagBg} border-2 border-black px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
        <span className="w-3 h-3 rounded-full border-2 border-black flex-shrink-0" style={{ backgroundColor: val.bg }} />
        <span className={`font-black text-xs uppercase tracking-wide ${val.tagText}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          {val.label}
        </span>
      </div>
    ))}
  </div>
);

const EventComponent = ({ event }: EventProps<CalendarEvent>) => {
  const config = categoryConfig[event.category];
  return (
    <div
      className="rbc-event-custom truncate px-1.5 py-0.5 text-[11px] font-black rounded leading-tight"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `2px solid ${config.border}`,
        fontFamily: 'var(--font-space-grotesk)',
      }}
      title={event.desc || event.title}
    >
      {event.title}
    </div>
  );
};

export default function AcademicCalendarPage() {
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleSelectEvent = useCallback((event: object) => {
    setSelectedEvent(event as CalendarEvent);
  }, []);

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: View) => {
    setView(newView);
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* Page Header */}
      <section className="py-16 px-6 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span
              className="inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#003459' }}
            >
              2024 – 2025
            </span>
            <h1
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#1a1a1a] mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Academic Calendar
            </h1>
            <p
              className="text-lg font-bold text-[#5b5b5b] max-w-2xl mb-6"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Stay up to date with important dates — exams, holidays, school events, and enrollment milestones for all Mind Masters programs.
            </p>
            <Legend />
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="mm-calendar-wrapper p-4 md:p-6 min-h-[700px]">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 700 }}
                  view={view}
                  date={date}
                  onNavigate={handleNavigate}
                  onView={handleViewChange}
                  onSelectEvent={handleSelectEvent}
                  components={{ event: EventComponent }}
                  eventPropGetter={(event) => {
                    const e = event as CalendarEvent;
                    const config = categoryConfig[e.category];
                    return {
                      style: {
                        backgroundColor: config.bg,
                        border: `2px solid ${config.border}`,
                        color: config.text,
                        borderRadius: '6px',
                        fontFamily: 'var(--font-space-grotesk)',
                        fontWeight: 900,
                        fontSize: '11px',
                      },
                    };
                  }}
                  popup
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-black rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-8 relative"
          >
            {/* Color accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-2 rounded-t-xl"
              style={{ backgroundColor: categoryConfig[selectedEvent.category].bg }}
            />

            <div className="flex items-start justify-between gap-4 mt-2 mb-4">
              <span
                className={`${categoryConfig[selectedEvent.category].tagBg} ${categoryConfig[selectedEvent.category].tagText} border-2 border-black font-black text-xs uppercase tracking-wide px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {categoryConfig[selectedEvent.category].label}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <h3
              className="text-2xl font-black text-[#1a1a1a] leading-tight mb-2"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {selectedEvent.title}
            </h3>

            {selectedEvent.desc && (
              <p className="font-bold text-sm text-[#5b5b5b] mb-5" style={{ fontFamily: 'var(--font-manrope)' }}>
                {selectedEvent.desc}
              </p>
            )}

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 border-2 border-[#e2e2e2] rounded-xl p-3">
                <span className="material-symbols-outlined text-base" style={{ color: categoryConfig[selectedEvent.category].bg, fontVariationSettings: "'FILL' 1" }}>
                  calendar_today
                </span>
                <div>
                  <p className="font-black text-[10px] uppercase tracking-wide text-[#5b5b5b]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Start Date</p>
                  <p className="font-bold text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-manrope)' }}>
                    {format(selectedEvent.start, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              {selectedEvent.start.getTime() !== selectedEvent.end.getTime() && (
                <div className="flex items-center gap-3 border-2 border-[#e2e2e2] rounded-xl p-3">
                  <span className="material-symbols-outlined text-base" style={{ color: categoryConfig[selectedEvent.category].bg, fontVariationSettings: "'FILL' 1" }}>
                    event
                  </span>
                  <div>
                    <p className="font-black text-[10px] uppercase tracking-wide text-[#5b5b5b]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>End Date</p>
                    <p className="font-bold text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-manrope)' }}>
                      {format(selectedEvent.end, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

    </main>
  );
}
