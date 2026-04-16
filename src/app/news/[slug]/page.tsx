'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buzzItems } from '@/data/buzz';
import { use } from 'react';

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const item = buzzItems.find((b) => b.slug === slug);

  if (!item) notFound();

  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* Header */}
      <section
        className="py-16 px-6 md:px-8 border-b-4 border-black"
        style={{ backgroundColor: item.cardBg }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Link
              href="/#buzz"
              className="inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-widest mb-6 hover:underline"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: item.bodyColor.replace('text-', '') }}
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Latest Buzz
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`${item.tagStyle} px-3 py-1 font-black text-xs uppercase rounded-full`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {item.tag}
              </span>
              <span
                className="font-bold text-xs text-[#5b5b5b]"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {item.date} · {item.readTime}
              </span>
            </div>

            <h1
              className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 ${item.titleColor}`}
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {item.title}
            </h1>

            <p
              className={`text-lg font-bold ${item.bodyColor} leading-relaxed`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {item.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* Article body */}
            <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5">
              {item.fullBody.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-bold text-base text-[#2f2f2f] leading-relaxed"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            <div
              className={`${item.cardBg} border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: item.accentColor }}
                >
                  <span
                    className="material-symbols-outlined text-xl text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <h2
                  className={`text-xl font-black uppercase tracking-tight ${item.titleColor}`}
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Key Highlights
                </h2>
              </div>
              <ul className="flex flex-col gap-3">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <span
                        className="material-symbols-outlined text-[10px] text-white"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    </span>
                    <span
                      className={`font-bold text-sm ${item.bodyColor}`}
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-black border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3
                  className="text-2xl font-black uppercase tracking-tight text-white leading-none mb-1"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Interested?
                </h3>
                <p
                  className="font-bold text-sm text-[#aaa]"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  Get in touch and we'll share more details with you.
                </p>
              </div>
              <Link
                href="/contact"
                className="brutalist-button font-black text-sm px-6 py-3 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(107,255,143,0.5)] text-black whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  backgroundColor: '#6bff8f',
                }}
              >
                Contact Us →
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

    </main>
  );
}
