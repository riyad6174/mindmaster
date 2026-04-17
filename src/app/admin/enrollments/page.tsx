'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface EnrollmentSubmission {
  _id: string;
  name: string;
  motherName: string;
  fatherName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  program: string;
  supportArea: string[];
  learningFormat: string;
  enrollDate: string;
  status: string;
  createdAt: string;
}

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EnrollmentSubmission | null>(null);

  useEffect(() => {
    fetch('/api/admin/enrollments')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEnrollments(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const downloadSinglePDF = (e: EnrollmentSubmission) => {
    const doc = new jsPDF();
    
    // Add branding
    doc.setFontSize(22);
    doc.setTextColor(26, 132, 210); // #1a84d2
    doc.text('MIND MASTERS EDU CENTER', 14, 22);
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text('Student Enrollment Record', 14, 30);
    
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.line(14, 35, 196, 35);

    autoTable(doc, {
      startY: 45,
      body: [
        ['Student Name', e.name],
        ['Date of Birth', e.dob],
        ['Father\'s Name', e.fatherName],
        ['Mother\'s Name', e.motherName],
        ['Phone', e.phone],
        ['Email', e.email],
        ['Address', e.address],
        ['Chosen Program', e.program],
        ['Area of Support', e.supportArea?.length ? e.supportArea.join(', ') : 'N/A'],
        ['Learning Format', e.learningFormat || 'N/A'],
        ['Preferred Start Date', e.enrollDate],
        ['Submission Date', format(new Date(e.createdAt), 'MMMM d, yyyy')],
      ],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, fillColor: [232, 244, 255] } },
    });

    doc.save(`Enrollment_${e.name.replace(/\s+/g, '_')}.pdf`);
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Mind Masters - All Enrollments', 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Program', 'Phone', 'Email', 'Date']],
      body: enrollments.map(e => [
        e.name, 
        e.program, 
        e.phone, 
        e.email, 
        format(new Date(e.createdAt), 'MMM d, yyyy')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [26, 132, 210] },
    });

    doc.save('Mind_Masters_Enrollments_List.pdf');
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Enrollment List
          </h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Manage student applications and records.</p>
        </div>
        <button 
          onClick={downloadAllPDF}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-black transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
          Export All Records
        </button>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Date</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Student</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Program</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px]">Status</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-slate-500 text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-manrope">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400">Loading enrollments...</td>
                </tr>
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400">No enrollments found.</td>
                </tr>
              ) : (
                enrollments.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-600">
                      {format(new Date(e.createdAt), 'MMM d, HH:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-slate-900">{e.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{e.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] font-bold uppercase px-2 py-0.5 border border-[#c4b5fd] bg-[#f5e8ff] text-[#8126cf] rounded">
                        {e.program}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                        e.status === 'pending' 
                          ? 'bg-amber-50 text-amber-600 border-amber-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                       <button
                        onClick={() => downloadSinglePDF(e)}
                        className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
                        title="Download PDF"
                      >
                        <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                      </button>
                      <button
                        onClick={() => setSelected(e)}
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
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Student Application Profile
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">ID: {selected._id}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </header>

              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Student</label>
                    <p className="text-base font-bold text-slate-900">{selected.name}</p>
                    <p className="text-xs font-medium text-slate-500">{selected.dob}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Program</label>
                    <p className="inline-flex text-xs font-bold text-[#8126cf] uppercase px-2 py-0.5 bg-[#f5e8ff] border border-[#c4b5fd] rounded">
                      {selected.program}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8 p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Father's Name</label>
                    <p className="text-sm font-bold text-slate-800">{selected.fatherName}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Mother's Name</label>
                    <p className="text-sm font-bold text-slate-800">{selected.motherName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Contact Details</label>
                    <p className="text-sm font-bold text-slate-800">{selected.phone}</p>
                    <p className="text-xs font-medium text-[#1a84d2]">{selected.email}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Preferences</label>
                    <p className="text-xs font-bold text-slate-700">Format: <span className="text-slate-500">{selected.learningFormat || 'N/A'}</span></p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-bold text-slate-700">Support Areas:</p>
                      {selected.supportArea?.length ? (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {selected.supportArea.map((area) => (
                            <span key={area} className="text-[10px] font-bold px-2 py-0.5 bg-[#e8f4ff] border border-[#86c8ef] text-[#1a84d2] rounded">
                              {area}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500">N/A</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-700">Start: <span className="text-slate-500">{selected.enrollDate}</span></p>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Mailing Address</label>
                  <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">{selected.address}</p>
                </div>
              </div>

              <footer className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={() => downloadSinglePDF(selected)}
                  className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-black transition-all"
                >
                  <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                  Print PDF
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-all font-manrope"
                >
                  Close
                </button>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
