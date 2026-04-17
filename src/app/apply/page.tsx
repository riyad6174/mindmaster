'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

type Program = 'after-school' | 'university-support' | 'krazy-math' | 'preschool';

const programOptions: {
  id: Program;
  label: string;
  icon: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    id: 'after-school',
    label: 'After School Program',
    icon: 'local_library',
    desc: 'Grades 4–12 · Sunshine, Freshman/Sophomore & Junior/Senior Math & Science',
    color: '#1a84d2',
    bg: '#e8f4ff',
    border: 'border-[#86c8ef]',
  },
  {
    id: 'university-support',
    label: 'University Support',
    icon: 'account_balance',
    desc: 'University Tutoring · Top 10 Admission Prep · IELTS · On-Demand Tutoring',
    color: '#6a5b00',
    bg: '#fffbe8',
    border: 'border-[#fde68a]',
  },
  {
    id: 'krazy-math',
    label: 'Krazy Math Tutorial',
    icon: 'calculate',
    desc: 'Grades 2–12 · Mon, Tue, Thu · 6:30 – 8:30 PM · 1876 Wallace St, Regina SK',
    color: '#8126cf',
    bg: '#f5e8ff',
    border: 'border-[#c4b5fd]',
  },
  {
    id: 'preschool',
    label: 'Preschool Program',
    icon: 'child_care',
    desc: 'Ages 3–5 · Mon–Fri · 9:00 AM – 12:00 PM · Darul Falah Islamic Centre',
    color: '#1a84d2',
    bg: '#e8f4ff',
    border: 'border-[#86c8ef]',
  },
];

type FormData = {
  name: string;
  motherName: string;
  fatherName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  enrollDate: string;
  program: Program | '';
  supportArea: string[];
  learningFormat: string;
};

const supportAreaOptions = [
  'Mathematics',
  'Science',
  'ESL',
  'IELTS Preparation',
  'University Admission Preparation',
  'Homework Support',
  'Other'
];

const learningFormatOptions = [
  'In-person',
  'Virtual (Zoom)',
  'Either'
];

const emptyForm: FormData = {
  name: '',
  motherName: '',
  fatherName: '',
  dob: '',
  phone: '',
  email: '',
  address: '',
  enrollDate: '',
  program: '',
  supportArea: [],
  learningFormat: '',
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-1.5'>
    <label
      className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      {label} {required && <span className='text-[#8126cf]'>*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  'border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-3 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white';

function ApplyForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-select program from URL param e.g. /apply?program=krazy-math
  useEffect(() => {
    const param = searchParams.get('program') as Program | null;
    if (param && programOptions.some((p) => p.id === param)) {
      setForm((f) => ({ ...f, program: param }));
    }
  }, [searchParams]);

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleSupportArea = (opt: string) =>
    setForm((f) => ({
      ...f,
      supportArea: f.supportArea.includes(opt)
        ? f.supportArea.filter((s) => s !== opt)
        : [...f.supportArea, opt],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-[#f8f9fa]'>
      {/* Page header */}
      <section className='py-16 px-6 md:px-8 bg-white border-b-4 border-black'>
        <div className='max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span
              className='inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                color: '#003459',
              }}
            >
              Enrollment
            </span>
            <h1
              className='text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#1a1a1a]'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Apply Now
            </h1>
            <p
              className='text-lg font-bold text-[#5b5b5b] mt-3 max-w-xl'
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Fill in the form below to apply for enrollment. We will review
              your application and get back to you within 48 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className='py-16 px-6 md:px-8'>
        <div className='max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className='bg-white border-4 border-black rounded-2xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='bg-[#e8f4ff] border-4 border-[#1a84d2] rounded-2xl p-10 flex flex-col items-center gap-4 text-center'
                >
                  <span
                    className='material-symbols-outlined text-6xl text-[#1a84d2]'
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <h2
                    className='text-2xl font-black text-[#1a84d2] uppercase tracking-tight'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Application Submitted!
                  </h2>
                  <p
                    className='font-bold text-sm text-[#1a84d2] max-w-sm'
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    Thank you for applying to Mind Masters Edu Center. Our team
                    will review your application and contact you within 48
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm(emptyForm);
                    }}
                    className='brutalist-button bg-[#1a84d2] text-white font-black text-sm px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-2'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                  {/* Program selection */}
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                      <p
                        className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        Select Program <span className='text-[#8126cf]'>*</span>
                      </p>
                      {form.program && (
                        <span className='inline-flex items-center gap-1 bg-[#e8f4ff] border-2 border-[#1a84d2] text-[#1a84d2] font-black text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-lg'>
                          <span className='material-symbols-outlined text-xs' style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Selected
                        </span>
                      )}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {programOptions.map((opt) => {
                        const selected = form.program === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type='button'
                            onClick={() => set('program', opt.id)}
                            className={`flex items-start gap-3 p-4 rounded-2xl border-4 text-left transition-all ${
                              selected
                                ? `border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                                : `${opt.border} shadow-none hover:border-black`
                            }`}
                            style={{
                              backgroundColor: selected ? opt.bg : '#f8f9fa',
                            }}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0`}
                              style={{
                                backgroundColor: selected
                                  ? opt.color
                                  : '#e2e2e2',
                              }}
                            >
                              <span
                                className='material-symbols-outlined text-xl'
                                style={{
                                  color: selected ? 'white' : '#5b5b5b',
                                  fontVariationSettings: "'FILL' 1",
                                }}
                              >
                                {opt.icon}
                              </span>
                            </div>
                            <div className='flex-grow min-w-0'>
                              <p
                                className='font-black text-sm text-[#1a1a1a] leading-tight mb-1'
                                style={{
                                  fontFamily: 'var(--font-space-grotesk)',
                                }}
                              >
                                {opt.label}
                              </p>
                              <p
                                className='font-bold text-[11px] text-[#5b5b5b] leading-snug'
                                style={{ fontFamily: 'var(--font-manrope)' }}
                              >
                                {opt.desc}
                              </p>
                            </div>
                            {/* Radio indicator */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 border-black flex-shrink-0 mt-0.5 flex items-center justify-center`}
                              style={{
                                backgroundColor: selected ? opt.color : 'white',
                              }}
                            >
                              {selected && (
                                <span
                                  className='material-symbols-outlined text-[10px] text-white'
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  check
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className='border-t-2 border-[#e2e2e2]' />

                  {/* Support Preferences */}
                  <div className='flex flex-col gap-5'>
                    <p
                      className='font-black text-sm uppercase tracking-wide text-[#1a1a1a] flex items-center gap-2'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      <span className='w-6 h-6 bg-black rounded-lg flex items-center justify-center'>
                        <span
                          className='material-symbols-outlined text-sm text-white'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          school
                        </span>
                      </span>
                      Support Preferences
                    </p>

                    <div className='flex flex-col gap-3'>
                      <p className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]' style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        Primary Area of Support Requested
                      </p>
                      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                        {supportAreaOptions.map((opt) => {
                          const checked = form.supportArea.includes(opt);
                          return (
                            <label
                              key={opt}
                              className={`flex items-center gap-2 cursor-pointer rounded-xl border-2 px-3 py-2 transition-all ${
                                checked
                                  ? 'border-black bg-[#e8f4ff] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                  : 'border-[#e2e2e2] bg-[#f8f9fa] hover:border-black'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded border-2 border-black flex items-center justify-center flex-shrink-0 transition-colors ${
                                  checked ? 'bg-[#1a84d2]' : 'bg-white'
                                }`}
                              >
                                {checked && (
                                  <span className='material-symbols-outlined text-[10px] text-white' style={{ fontVariationSettings: "'FILL' 1" }}>
                                    check
                                  </span>
                                )}
                              </div>
                              <input
                                type='checkbox'
                                value={opt}
                                checked={checked}
                                onChange={() => toggleSupportArea(opt)}
                                className='sr-only'
                              />
                              <span className='font-bold text-sm text-[#1a1a1a]' style={{ fontFamily: 'var(--font-manrope)' }}>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className='flex flex-col gap-3 mt-2'>
                        <p className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]' style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        Preferred Learning Format
                        </p>
                        <div className='flex flex-wrap gap-5'>
                        {learningFormatOptions.map((opt) => (
                            <label key={opt} className='flex items-center gap-2 cursor-pointer'>
                            <input type='radio' name='learningFormat' value={opt} checked={form.learningFormat === opt} onChange={(e) => set('learningFormat', e.target.value)} className='w-4 h-4 cursor-pointer accent-[#1a84d2]' />
                            <span className='font-bold text-sm text-[#1a1a1a]' style={{ fontFamily: 'var(--font-manrope)' }}>{opt}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className='border-t-2 border-[#e2e2e2]' />

                  {/* Student info */}
                  <div className='flex flex-col gap-5'>
                    <p
                      className='font-black text-sm uppercase tracking-wide text-[#1a1a1a] flex items-center gap-2'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      <span className='w-6 h-6 bg-black rounded-lg flex items-center justify-center'>
                        <span
                          className='material-symbols-outlined text-sm text-white'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          person
                        </span>
                      </span>
                      Student Information
                    </p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <Field label='Student Full Name' required>
                        <input
                          type='text'
                          required
                          placeholder='Enter full name'
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                          className={inputCls}
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        />
                      </Field>
                      <Field label='Date of Birth' required>
                        <input
                          type='date'
                          required
                          value={form.dob}
                          onChange={(e) => set('dob', e.target.value)}
                          className={inputCls}
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        />
                      </Field>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <Field label="Mother's Name" required>
                        <input
                          type='text'
                          required
                          placeholder="Mother's full name"
                          value={form.motherName}
                          onChange={(e) => set('motherName', e.target.value)}
                          className={inputCls}
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        />
                      </Field>
                      <Field label="Father's Name" required>
                        <input
                          type='text'
                          required
                          placeholder="Father's full name"
                          value={form.fatherName}
                          onChange={(e) => set('fatherName', e.target.value)}
                          className={inputCls}
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className='border-t-2 border-[#e2e2e2]' />

                  {/* Contact info */}
                  <div className='flex flex-col gap-5'>
                    <p
                      className='font-black text-sm uppercase tracking-wide text-[#1a1a1a] flex items-center gap-2'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      <span className='w-6 h-6 bg-black rounded-lg flex items-center justify-center'>
                        <span
                          className='material-symbols-outlined text-sm text-white'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          contact_phone
                        </span>
                      </span>
                      Contact Details
                    </p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <Field label='Phone Number' required>
                        <input
                          type='tel'
                          required
                          placeholder='+1 (306) 000-0000'
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          className={inputCls}
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        />
                      </Field>
                      <Field label='Email Address' required>
                        <input
                          type='email'
                          required
                          placeholder='your@email.com'
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                          className={inputCls}
                          style={{ fontFamily: 'var(--font-manrope)' }}
                        />
                      </Field>
                    </div>

                    <Field label='Home Address' required>
                      <textarea
                        required
                        rows={2}
                        placeholder='Street address, City, Province, Postal Code'
                        value={form.address}
                        onChange={(e) => set('address', e.target.value)}
                        className={`${inputCls} resize-none`}
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </Field>
                  </div>

                  {/* Divider */}
                  <div className='border-t-2 border-[#e2e2e2]' />

                  {/* Enrollment date */}
                  <div className='flex flex-col gap-5'>
                    <p
                      className='font-black text-sm uppercase tracking-wide text-[#1a1a1a] flex items-center gap-2'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      <span className='w-6 h-6 bg-black rounded-lg flex items-center justify-center'>
                        <span
                          className='material-symbols-outlined text-sm text-white'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          calendar_month
                        </span>
                      </span>
                      Enrollment
                    </p>

                    <Field label='Expected Date to Enroll' required>
                      <input
                        type='date'
                        required
                        value={form.enrollDate}
                        onChange={(e) => set('enrollDate', e.target.value)}
                        className={inputCls}
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </Field>
                  </div>

                  {/* Submit */}
                  <button
                    type='submit'
                    disabled={loading || !form.program}
                    className='brutalist-button bg-black text-white font-black py-4 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(107,177,255,1)] flex items-center justify-center gap-2 text-base disabled:opacity-50'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {loading ? (
                      'Submitting Application...'
                    ) : (
                      <>
                        Submit Application
                        <span
                          className='material-symbols-outlined text-xl'
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          send
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><span className="animate-spin h-8 w-8 border-4 border-[#1a84d2] border-t-transparent rounded-full" /></div>}>
      <ApplyForm />
    </Suspense>
  );
}
