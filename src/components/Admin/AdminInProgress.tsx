'use client';

import { motion } from 'framer-motion';

interface AdminInProgressProps {
  title: string;
  subtitle?: string;
}

export default function AdminInProgress({ title, subtitle }: AdminInProgressProps) {
  return (
    <div className="p-8 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 bg-[#e8f4ff] rounded-3xl flex items-center justify-center mb-6 border border-[#1a84d2]/20"
      >
        <span className="material-symbols-outlined text-5xl text-[#1a84d2] animate-pulse">
          construction
        </span>
      </motion.div>
      
      <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {title}
      </h1>
      
      <p className="max-w-md text-slate-500 font-bold text-sm leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
        {subtitle || "We're currently building this feature to help you manage your center more effectively. Stay tuned for updates!"}
      </p>

      <div className="mt-10 flex gap-3">
        <div className="w-2 h-2 bg-[#1a84d2] rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-[#1a84d2] rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-[#1a84d2] rounded-full animate-bounce" />
      </div>
    </div>
  );
}
