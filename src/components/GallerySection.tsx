'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

const row1 = [
  { src: 'https://images.pexels.com/photos/8421946/pexels-photo-8421946.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Innovation Lab',   tag: 'Tech',     tagBg: '#f5e8ff', tagColor: '#8126cf' },
  { src: 'https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Study Sessions',  tag: 'Academic', tagBg: '#e8f4ff', tagColor: '#1a84d2' },
  { src: 'https://images.pexels.com/photos/6964688/pexels-photo-6964688.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Math Olympiad',   tag: 'Academic', tagBg: '#e8f4ff', tagColor: '#1a84d2' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80',                            label: 'Young Explorers', tag: 'Kids',     tagBg: '#fffbe8', tagColor: '#6a5b00' },
  { src: 'https://images.pexels.com/photos/7176476/pexels-photo-7176476.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Science Lab',     tag: 'Science',  tagBg: '#e8f4ff', tagColor: '#1a84d2' },
  { src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80',                               label: 'Middle School',   tag: 'Growth',   tagBg: '#f5e8ff', tagColor: '#8126cf' },
];

const row2 = [
  { src: 'https://images.pexels.com/photos/4711732/pexels-photo-4711732.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Music & Arts',    tag: 'Creative', tagBg: '#fffbe8', tagColor: '#6a5b00' },
  { src: 'https://images.pexels.com/photos/6624376/pexels-photo-6624376.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Mental Abacus',   tag: 'Math',     tagBg: '#e8f4ff', tagColor: '#1a84d2' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80',                            label: 'Academy Leaders', tag: 'Leaders',  tagBg: '#f5e8ff', tagColor: '#8126cf' },
  { src: 'https://images.pexels.com/photos/5561460/pexels-photo-5561460.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Campus Life',     tag: 'Life',     tagBg: '#fffbe8', tagColor: '#6a5b00' },
  { src: 'https://images.pexels.com/photos/8421946/pexels-photo-8421946.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'Robotics Club',   tag: 'Tech',     tagBg: '#f5e8ff', tagColor: '#8126cf' },
  { src: 'https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=500', label: 'After School',    tag: 'Life',     tagBg: '#fffbe8', tagColor: '#6a5b00' },
];

type GalleryItem = (typeof row1)[number];

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="relative w-[300px] h-[210px] flex-shrink-0 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] mx-3 group">
      <Image
        src={item.src}
        alt={item.label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
        <p
          className="font-black text-sm text-white leading-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {item.label}
        </p>
        <span
          className="font-black text-[10px] uppercase tracking-wide px-2 py-1 rounded-lg border-2 border-black flex-shrink-0"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            backgroundColor: item.tagBg,
            color: item.tagColor,
          }}
        >
          {item.tag}
        </span>
      </div>
    </div>
  );
}

// direction: 1 = left, -1 = right
function MarqueeRow({ items, direction = 1, speed = 0.6 }: { items: GalleryItem[]; direction?: 1 | -1; speed?: number }) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const loopItems = [...items, ...items];

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    const halfWidth = containerRef.current.scrollWidth / 2;
    let next = x.get() - speed * direction;

    // Reset seamlessly once one full copy has scrolled
    if (direction === 1 && next <= -halfWidth) next += halfWidth;
    if (direction === -1 && next >= 0) next -= halfWidth;

    x.set(next);
  });

  return (
    <div className="overflow-hidden relative">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        className="flex py-2"
        style={{ x, width: 'max-content' }}
      >
        {loopItems.map((item, i) => (
          <GalleryCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className="py-20 bg-white border-t-4 border-black overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 md:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <span
            className="inline-block bg-[#6bb1ff] border-2 border-black px-4 py-1 font-black text-xs uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Our Campus
          </span>
          <h2
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Life at<br />Mind Masters
          </h2>
        </div>
        <p
          className="text-lg font-bold text-[#5b5b5b] max-w-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          A glimpse into the vibrant energy, creative spaces, and unforgettable moments at our campus.
        </p>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <MarqueeRow items={row1} direction={1} speed={0.55} />
      </div>

      {/* Row 2 — scrolls right */}
      <MarqueeRow items={row2} direction={-1} speed={0.45} />

    </section>
  );
}
