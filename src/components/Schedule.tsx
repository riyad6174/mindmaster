'use client';

import { useState, useCallback, useEffect } from 'react';
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


const categoryConfig: Record<EventCategory, { bg: string; border: string; text: string; label: string; tagBg: string; tagText: string }> = {
  academic: { bg: '#1a84d2', border: '#003459', text: '#fff', label: 'Academic',  tagBg: 'bg-[#e8f4ff]', tagText: 'text-[#1a84d2]' },
  exam:     { bg: '#8126cf', border: '#3d006e', text: '#fff', label: 'Exam',      tagBg: 'bg-[#f5e8ff]', tagText: 'text-[#8126cf]' },
  holiday:  { bg: '#b02500', border: '#520c00', text: '#fff', label: 'Holiday',   tagBg: 'bg-[#fff0ec]', tagText: 'text-[#b02500]' },
  break:    { bg: '#6a5b00', border: '#3b3200', text: '#fff', label: 'Break',     tagBg: 'bg-[#fffbe8]', tagText: 'text-[#6a5b00]' },
  event:    { bg: '#1d7c5e', border: '#0a3728', text: '#fff', label: 'Event',     tagBg: 'bg-[#e4fff6]', tagText: 'text-[#1d7c5e]' },
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
      className="truncate px-1.5 py-0.5 text-[11px] font-black rounded leading-tight"
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

export default function Schedule() {
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/calendar')
      .then((r) => r.json())
      .then((data: Array<{ _id: string; title: string; start: string; end: string; category: EventCategory; allDay: boolean; desc?: string }>) => {
        if (Array.isArray(data)) {
          setEvents(
            data.map((e, i) => ({
              id: i,
              title: e.title,
              start: new Date(e.start),
              end: new Date(e.end),
              category: e.category,
              allDay: e.allDay,
              desc: e.desc,
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => setEventsLoading(false));
  }, []);

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
              className="inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              2024 – 2025
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
              Stay up to date with important dates — exams, holidays, school events, and enrollment milestones.
            </p>
          </div>
          <Legend />
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="bg-white border-4 border-black rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="mm-calendar-wrapper p-4 md:p-6 min-h-[700px]">
              {eventsLoading ? (
                <div className="flex items-center justify-center h-[700px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#1a84d2] border-t-transparent rounded-full animate-spin" />
                    <p className="font-black text-xs uppercase tracking-widest text-[#5b5b5b]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      Loading Calendar…
                    </p>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </motion.div>

      </div>

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
    </section>
  );
}
