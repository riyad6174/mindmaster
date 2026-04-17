'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';

type EventCategory = 'academic' | 'holiday' | 'exam' | 'event' | 'break';

interface CalendarEventDoc {
  _id: string;
  title: string;
  start: string;
  end: string;
  category: EventCategory;
  allDay: boolean;
  desc?: string;
}

type FormState = {
  title: string;
  category: EventCategory;
  allDay: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  desc: string;
};

const emptyForm: FormState = {
  title: '',
  category: 'event',
  allDay: true,
  startDate: '',
  startTime: '09:00',
  endDate: '',
  endTime: '10:00',
  desc: '',
};

const categoryConfig: Record<EventCategory, { bg: string; text: string; tagBg: string; tagText: string; border: string; label: string; icon: string }> = {
  academic: { bg: '#1a84d2', text: '#fff', tagBg: 'bg-[#e8f4ff]', tagText: 'text-[#1a84d2]', border: 'border-[#86c8ef]', label: 'Academic',  icon: 'school' },
  exam:     { bg: '#8126cf', text: '#fff', tagBg: 'bg-[#f5e8ff]', tagText: 'text-[#8126cf]', border: 'border-[#c4b5fd]', label: 'Exam',      icon: 'edit_note' },
  holiday:  { bg: '#b02500', text: '#fff', tagBg: 'bg-[#fff0ec]', tagText: 'text-[#b02500]', border: 'border-[#fca99a]', label: 'Holiday',   icon: 'celebration' },
  break:    { bg: '#6a5b00', text: '#fff', tagBg: 'bg-[#fffbe8]', tagText: 'text-[#6a5b00]', border: 'border-[#fde68a]', label: 'Break',     icon: 'wb_sunny' },
  event:    { bg: '#1d7c5e', text: '#fff', tagBg: 'bg-[#e4fff6]', tagText: 'text-[#1d7c5e]', border: 'border-[#6ee7b7]', label: 'Event',     icon: 'event' },
};

const categories: EventCategory[] = ['academic', 'exam', 'event', 'holiday', 'break'];

function buildDates(form: FormState): { start: string; end: string } {
  if (form.allDay) {
    return {
      start: new Date(form.startDate + 'T00:00:00').toISOString(),
      end:   new Date(form.endDate   + 'T00:00:00').toISOString(),
    };
  }
  return {
    start: new Date(form.startDate + 'T' + form.startTime + ':00').toISOString(),
    end:   new Date(form.endDate   + 'T' + form.endTime   + ':00').toISOString(),
  };
}

function formFromDoc(doc: CalendarEventDoc): FormState {
  const start = parseISO(doc.start);
  const end   = parseISO(doc.end);
  return {
    title:     doc.title,
    category:  doc.category,
    allDay:    doc.allDay,
    startDate: format(start, 'yyyy-MM-dd'),
    startTime: format(start, 'HH:mm'),
    endDate:   format(end, 'yyyy-MM-dd'),
    endTime:   format(end, 'HH:mm'),
    desc:      doc.desc || '',
  };
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<CalendarEventDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState<EventCategory | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarEventDoc | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<CalendarEventDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/calendar');
      if (res.ok) {
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(doc: CalendarEventDoc) {
    setEditing(doc);
    setForm(formFromDoc(doc));
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  const setF = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.startDate || !form.endDate) return;
    setSaving(true);
    try {
      const payload = {
        title:    form.title,
        category: form.category,
        allDay:   form.allDay,
        desc:     form.desc,
        ...buildDates(form),
      };

      const url    = editing ? `/api/admin/calendar/${editing._id}` : '/api/admin/calendar';
      const method = editing ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await loadEvents();
        closeModal();
      } else {
        alert('Failed to save event.');
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/calendar/${deleteConfirm._id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadEvents();
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete event.');
      }
    } finally {
      setDeleting(false);
    }
  }

  const filtered = filterCat === 'all'
    ? events
    : events.filter((e) => e.category === filterCat);

  const counts = categories.reduce((acc, cat) => {
    acc[cat] = events.filter((e) => e.category === cat).length;
    return acc;
  }, {} as Record<EventCategory, number>);

  const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-[#1a84d2] focus:ring-1 focus:ring-[#1a84d2]/20 bg-white transition-all';

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Academic Calendar
          </h1>
          <p className="text-sm font-bold text-slate-500 mt-1">
            Manage term sessions, exams, holidays and school events visible on the website.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#1a84d2] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#1471b8] transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Event
        </button>
      </header>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {categories.map((cat) => {
          const cfg = categoryConfig[cat];
          return (
            <div
              key={cat}
              className={`flex items-center gap-3 bg-white border rounded-xl p-3 shadow-sm ${cfg.border}`}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                <span className="material-symbols-outlined text-sm text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {cfg.icon}
                </span>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{cfg.label}</p>
                <p className="text-xl font-black text-slate-900 leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{counts[cat]}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterCat('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
            filterCat === 'all'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
          }`}
        >
          All ({events.length})
        </button>
        {categories.map((cat) => {
          const cfg = categoryConfig[cat];
          return (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                filterCat === cat
                  ? `${cfg.tagBg} ${cfg.tagText} ${cfg.border} border`
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {cfg.label} ({counts[cat]})
            </button>
          );
        })}
      </div>

      {/* Events table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-slate-400 text-[10px] w-32">Start Date</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-slate-400 text-[10px]">Title</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-slate-400 text-[10px] w-28">Category</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-slate-400 text-[10px] w-24">All Day</th>
                <th className="px-5 py-3 font-bold uppercase tracking-wider text-slate-400 text-[10px] w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm font-medium text-slate-400">
                    Loading events…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm font-medium text-slate-400">
                    No events found. Click &quot;Add Event&quot; to get started.
                  </td>
                </tr>
              ) : (
                filtered.map((ev) => {
                  const cfg = categoryConfig[ev.category];
                  const startDate = parseISO(ev.start);
                  const endDate   = parseISO(ev.end);
                  const sameDay   = format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd');
                  return (
                    <tr key={ev._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-bold text-slate-800">{format(startDate, 'MMM d, yyyy')}</p>
                        {!sameDay && (
                          <p className="text-[10px] text-slate-400 font-medium">→ {format(endDate, 'MMM d, yyyy')}</p>
                        )}
                        {!ev.allDay && (
                          <p className="text-[10px] text-slate-400 font-medium">{format(startDate, 'h:mm a')}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-bold text-slate-900">{ev.title}</p>
                        {ev.desc && (
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5 line-clamp-1">{ev.desc}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 ${cfg.tagBg} ${cfg.tagText} border ${cfg.border} px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide`}>
                          <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          ev.allDay
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {ev.allDay ? 'All Day' : 'Timed'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(ev)}
                            className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-[#1a84d2] hover:border-[#1a84d2] transition-all"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(ev)}
                            className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-red-500 hover:border-red-300 transition-all"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <header className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {editing ? 'Edit Event' : 'Add New Event'}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    {editing ? 'Update the calendar event below.' : 'Fill in the details to add an event to the academic calendar.'}
                  </p>
                </div>
                <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-all">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </header>

              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setF('title', e.target.value)}
                    placeholder="e.g. Final Exams – Winter"
                    className={inputCls}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Category *</label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {categories.map((cat) => {
                      const cfg = categoryConfig[cat];
                      const sel = form.category === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setF('category', cat)}
                          className={`flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl border-2 text-center transition-all ${
                            sel ? `border-black ${cfg.tagBg}` : 'border-slate-200 bg-white hover:border-slate-400'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-lg"
                            style={{ color: cfg.bg, fontVariationSettings: "'FILL' 1" }}
                          >
                            {cfg.icon}
                          </span>
                          <span className={`text-[9px] font-black uppercase tracking-wide ${sel ? cfg.tagText : 'text-slate-500'}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                            {cfg.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* All Day toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setF('allDay', !form.allDay)}
                    className={`relative w-10 h-5 rounded-full border-2 border-black transition-colors ${form.allDay ? 'bg-[#1a84d2]' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full border border-black transition-all ${form.allDay ? 'left-[18px]' : 'left-[2px]'}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">All-day event</span>
                </label>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Start Date *</label>
                    <input
                      type="date"
                      required
                      value={form.startDate}
                      onChange={(e) => {
                        setF('startDate', e.target.value);
                        if (!form.endDate || form.endDate < e.target.value) setF('endDate', e.target.value);
                      }}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">End Date *</label>
                    <input
                      type="date"
                      required
                      min={form.startDate}
                      value={form.endDate}
                      onChange={(e) => setF('endDate', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Times (only when not all day) */}
                {!form.allDay && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Start Time *</label>
                      <input
                        type="time"
                        required
                        value={form.startTime}
                        onChange={(e) => setF('startTime', e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">End Time *</label>
                      <input
                        type="time"
                        required
                        value={form.endTime}
                        onChange={(e) => setF('endTime', e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">Description</label>
                  <textarea
                    rows={2}
                    value={form.desc}
                    onChange={(e) => setF('desc', e.target.value)}
                    placeholder="Short description shown in the event popup…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1a84d2] text-white py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#1471b8] transition-all disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {editing ? 'save' : 'add_circle'}
                    </span>
                    {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add to Calendar'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 text-sm font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-2xl text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Delete Event?</h3>
              <p className="text-sm font-medium text-slate-500 mb-5">
                &quot;{deleteConfirm.title}&quot; will be permanently removed from the calendar.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {deleting ? 'Deleting…' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
