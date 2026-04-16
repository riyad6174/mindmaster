'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-10"
      >
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#e8f4ff] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#1a84d2]/20">
            <span className="material-symbols-outlined text-3xl text-[#1a84d2]">shield_person</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Admin Login
          </h1>
          <p className="text-sm font-bold text-slate-400 mt-2">Restricted access for Mind Masters staff.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl font-bold text-xs mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-black text-[10px] uppercase tracking-widest text-slate-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Email Address
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@mindmasters.com"
              className="border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none transition-all focus:border-[#1a84d2] focus:ring-4 focus:ring-[#1a84d2]/5"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-black text-[10px] uppercase tracking-widest text-slate-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none transition-all focus:border-[#1a84d2] focus:ring-4 focus:ring-[#1a84d2]/5"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black text-sm py-4 rounded-xl shadow-lg hover:bg-black mt-2 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                Sign In
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
          &copy; 2025 Mind Masters Edu Center
        </p>
      </motion.div>
    </main>
  );
}
