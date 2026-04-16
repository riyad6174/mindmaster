'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminQueriesPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setContacts(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Queries & Messages
          </h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Manage student/parent inquiries.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-black transition-all shadow-sm">
          <span className="material-symbols-outlined text-sm">download</span>
          Export CSV
        </button>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Date</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Sender</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Subject</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Status</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-manrope">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400">Loading queries...</td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400">No inquiries found.</td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-600">
                      {format(new Date(contact.createdAt), 'MMM d, HH:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-slate-900">{contact.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 max-w-[240px] truncate font-medium">{contact.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                        contact.status === 'new' 
                          ? 'bg-rose-50 text-rose-600 border-rose-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelected(contact)}
                        className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Message Details
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">Submitted {format(new Date(selected.createdAt), 'MMMM d, h:mm a')}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </header>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Sender</label>
                    <p className="text-sm font-bold text-slate-900">{selected.name}</p>
                    <p className="text-xs font-medium text-[#1a84d2]">{selected.email}</p>
                  </div>
                  {selected.phone && (
                    <div>
                      <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Phone</label>
                      <p className="text-sm font-bold text-slate-900">{selected.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Subject</label>
                  <p className="text-sm font-bold text-slate-800">{selected.subject}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Message</label>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>

              <footer className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-all"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selected.email}?subject=RE: ${selected.subject}`}
                  className="bg-[#1a84d2] text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-[#156cb1] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">reply</span>
                  Reply via Email
                </a>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
