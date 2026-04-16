'use client';

import { motion, type Variants } from 'framer-motion';

const contactCards = [
  {
    icon: 'location_on',
    label: 'Address',
    value: '131 Woodward Ave, Regina, SK, Canada, S4R3H5',
    bg: 'bg-[#e8f4ff]',
    iconColor: 'text-[#1a84d2]',
    border: 'border-[#86c8ef]',
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
    bg: 'bg-[#e8f4ff]',
    iconColor: 'text-[#1a84d2]',
    border: 'border-[#86c8ef]',
  },
];

const socialLinks = [
  {
    icon: 'photo_camera',
    label: 'Instagram',
    handle: '@mindmasters',
    bg: 'bg-[#f5e8ff]',
    iconColor: 'text-[#8126cf]',
  },
  {
    icon: 'play_circle',
    label: 'YouTube',
    handle: 'MindMastersEdu',
    bg: 'bg-[#fffbe8]',
    iconColor: 'text-[#6a5b00]',
  },
  {
    icon: 'chat',
    label: 'Facebook',
    handle: 'Mind Masters',
    bg: 'bg-[#e8f4ff]',
    iconColor: 'text-[#1a84d2]',
  },
];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function ContactSocial() {
  return (
    <section
      id='contact'
      className='py-24 bg-[#f8f9fa] border-t-4 border-black overflow-hidden'
    >
      <div className='max-w-7xl mx-auto px-6 md:px-8'>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='mb-14'
        >
          <span
            className='inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Visit Us
          </span>
          <h2
            className='text-4xl md:text-6xl font-black uppercase tracking-tighter'
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Find Us
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* ── LEFT: Map + contact cards ── */}
          <motion.div
            variants={fadeLeft}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.15 }}
            className='flex flex-col gap-6'
          >
            {/* Google Map */}
            <div className='border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.0258557125503!2d-104.63123062437032!3d50.477862371597446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x531c1eee78c2a6f7%3A0x7e51ac0d2243e6a1!2s131%20Woodward%20Ave%2C%20Regina%2C%20SK%20S4R%203H5%2C%20Canada!5e0!3m2!1sen!2sbd!4v1776349364976!5m2!1sen!2sbd'
                width='100%'
                height='620'
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Mind Masters Edu Center location'
              />
            </div>

            {/* Contact info cards — 2×2 grid */}
            {/* <motion.div
              className='grid grid-cols-2 gap-3'
              variants={stagger}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.1 }}
            >
              {contactCards.map((c) => (
                <motion.div
                  key={c.label}
                  variants={itemUp}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className={`${c.bg} border-2 ${c.border} rounded-2xl p-4 flex gap-3 items-start`}
                >
                  <div
                    className={`w-9 h-9 bg-white border-2 ${c.border} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${c.iconColor}`}
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
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>

          {/* ── RIGHT: Quick contact form + socials ── */}
          <motion.div
            variants={fadeRight}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.15 }}
            className='flex flex-col gap-6'
          >
            {/* Contact form card */}
            <div className='bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5'>
              <div>
                <h3
                  className='text-2xl font-black uppercase tracking-tight mb-1'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Send a Message
                </h3>
                <p
                  className='text-sm font-bold text-[#5b5b5b]'
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <label
                    className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    placeholder='Your name'
                    className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-2.5 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white'
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label
                    className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Phone
                  </label>
                  <input
                    type='tel'
                    placeholder='Your number'
                    className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-2.5 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white'
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label
                  className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Email
                </label>
                <input
                  type='email'
                  placeholder='your@email.com'
                  className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-2.5 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white'
                  style={{ fontFamily: 'var(--font-manrope)' }}
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <label
                  className='font-black text-xs uppercase tracking-wide text-[#1a1a1a]'
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder='How can we help?'
                  className='border-2 border-[#e2e2e2] focus:border-black rounded-xl px-4 py-2.5 font-bold text-sm outline-none transition-colors bg-[#f8f9fa] focus:bg-white resize-none'
                  style={{ fontFamily: 'var(--font-manrope)' }}
                />
              </div>

              <button
                className='brutalist-button w-full bg-[#8126cf] text-white font-black py-3.5 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 text-base'
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Send Message
                <span className='material-symbols-outlined text-xl'>send</span>
              </button>
            </div>

            {/* Social links */}
            <div className='grid grid-cols-3 gap-3'>
              {socialLinks.map((s) => (
                <motion.button
                  key={s.label}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.95 }}
                  className={`${s.bg} border-2 border-black rounded-2xl p-4 flex flex-col items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${s.iconColor}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {s.icon}
                  </span>
                  <div className='text-center'>
                    <p
                      className='font-black text-xs text-[#1a1a1a]'
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {s.label}
                    </p>
                    <p
                      className='font-bold text-[10px] text-[#5b5b5b]'
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {s.handle}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
