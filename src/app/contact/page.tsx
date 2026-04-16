'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const contactCards = [
  {
    icon: 'location_on',
    label: 'Address',
    value: '131 Woodward Ave, Regina, SK, Canada, S4R3H5',
    bg: 'bg-[#e8fff4]',
    iconColor: 'text-[#006a2d]',
    border: 'border-[#86efac]',
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+1 306-999-0855',
    bg: 'bg-[#f5e8ff]',
    iconColor: 'text-[#8126cf]',
    border: 'border-[#c4b5fd]',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'mindmasterslearningcentre@gmail.com',
    bg: 'bg-[#fffbe8]',
    iconColor: 'text-[#6a5b00]',
    border: 'border-[#fde68a]',
  },
  {
    icon: 'schedule',
    label: 'Hours',
    value: 'Mon – Sat  8:00 AM – 8:00 PM',
    bg: 'bg-[#e8fff4]',
    iconColor: 'text-[#006a2d]',
    border: 'border-[#86efac]',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <main className='min-h-screen bg-[#f8f9fa]'>
      {/* Page header */}
      <section className='py-16 px-6 md:px-8 bg-white border-b-4 border-black'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span
              className='inline-block bg-[#6bff8f] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Get In Touch
            </span>
            <h1
              className='text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#1a1a1a]'
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Contact Us
            </h1>
            <p
              className='text-lg font-bold text-[#5b5b5b] mt-3 max-w-xl'
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Have a question or ready to enroll? We'd love to hear from you.
              Fill in the form and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className='py-16 px-6 md:px-8'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* LEFT — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className='bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
              <h2
                className='text-2xl font-black uppercase tracking-tight mb-1 text-[#1a1a1a]'
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Send a Message
              </h2>
              <p
                className='text-sm font-bold text-[#5b5b5b] mb-6'
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                We&apos;ll respond within 24 hours.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='bg-[#e8fff4] border-4 border-[#006a2d] rounded-2xl p-8 flex flex-col items-center gap-4 text-center'
                >
                  <span
                    className='material-symbols-outlined text-5xl text-[#006a2d]'
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <h3
                    className='text-xl font-black text-[#006a2d]'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    className='font-bold text-sm text-[#006a2d]'
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className='brutalist-button bg-[#006a2d] text-white font-black text-sm px-6 py-2.5 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                      <label
                        className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        Full Name <span className='text-[#8126cf]'>*</span>
                      </label>
                      <input
                        type='text'
                        required
                        placeholder='Your full name'
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-3 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white'
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label
                        className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        placeholder='Your phone number'
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-3 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white'
                        style={{ fontFamily: 'var(--font-manrope)' }}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label
                      className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      Email Address <span className='text-[#8126cf]'>*</span>
                    </label>
                    <input
                      type='email'
                      required
                      placeholder='your@email.com'
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-3 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white'
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label
                      className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      Message <span className='text-[#8126cf]'>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder='How can we help you?'
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-3 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white resize-none'
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={loading}
                    className='brutalist-button bg-[#8126cf] text-white font-black py-4 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 text-base disabled:opacity-60'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {loading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
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

          {/* RIGHT — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className='flex flex-col gap-6'
          >
            <div>
              <h2
                className='text-2xl font-black uppercase tracking-tight text-[#1a1a1a] mb-1'
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Find Us
              </h2>
              <p
                className='text-sm font-bold text-[#5b5b5b]'
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                Visit us or reach out any time during our open hours.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {contactCards.map((c) => (
                <div
                  key={c.label}
                  className={`${c.bg} border-2 ${c.border} rounded-2xl p-4 flex gap-3 items-start`}
                >
                  <div
                    className={`w-10 h-10 bg-white border-2 ${c.border} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${c.iconColor}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {c.icon}
                    </span>
                  </div>
                  <div className='min-w-0'>
                    <p
                      className='font-black text-xs uppercase text-[#5b5b5b] tracking-wide mb-0.5'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {c.label}
                    </p>
                    <p
                      className='font-bold text-sm text-[#1a1a1a] leading-snug'
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div className='border-4 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-grow min-h-[280px]'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.0258557125503!2d-104.63123062437032!3d50.477862371597446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x531c1eee78c2a6f7%3A0x7e51ac0d2243e6a1!2s131%20Woodward%20Ave%2C%20Regina%2C%20SK%20S4R%203H5%2C%20Canada!5e0!3m2!1sen!2sbd!4v1776349364976!5m2!1sen!2sbd'
                width='100%'
                height='100%'
                style={{ border: 0, minHeight: '280px', display: 'block' }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Mind Masters Edu Center location'
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
