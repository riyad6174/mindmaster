'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Program = 'preschool' | 'krazy-math';

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
    id: 'preschool',
    label: 'Preschool & After School',
    icon: 'child_care',
    desc: 'Ages 3–5 · Mon–Fri · 9:00 AM – 12:00 PM · Darul Falah Islamic Centre',
    color: '#8126cf',
    bg: '#f5e8ff',
    border: 'border-[#c4b5fd]',
  },
  {
    id: 'krazy-math',
    label: 'Krazy Math Tutorial',
    icon: 'calculate',
    desc: 'Grades 2–12 · Mon, Tue, Thu · 6:30 – 8:30 PM · 1876 Wallace St, Regina SK',
    color: '#006a2d',
    bg: '#e8fff4',
    border: 'border-[#86efac]',
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
};

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

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
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
              className='inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                color: '#004a1d',
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
                  className='bg-[#e8fff4] border-4 border-[#006a2d] rounded-2xl p-10 flex flex-col items-center gap-4 text-center'
                >
                  <span
                    className='material-symbols-outlined text-6xl text-[#006a2d]'
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <h2
                    className='text-2xl font-black text-[#006a2d] uppercase tracking-tight'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Application Submitted!
                  </h2>
                  <p
                    className='font-bold text-sm text-[#006a2d] max-w-sm'
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
                    className='brutalist-button bg-[#006a2d] text-white font-black text-sm px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-2'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                  {/* Program selection */}
                  <div className='flex flex-col gap-3'>
                    <p
                      className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      Select Program <span className='text-[#8126cf]'>*</span>
                    </p>
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
                    className='brutalist-button bg-black text-white font-black py-4 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(107,255,143,1)] flex items-center justify-center gap-2 text-base disabled:opacity-50'
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
