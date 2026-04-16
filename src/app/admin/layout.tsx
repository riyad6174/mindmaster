'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarLink {
  label: string;
  icon: string;
  href?: string;
  sublinks?: { label: string; href: string }[];
}

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', icon: 'dashboard', href: '/admin' },
  { label: 'Queries', icon: 'question_answer', href: '/admin/queries' },
  { label: 'Enrollments', icon: 'school', href: '/admin/enrollments' },
  { 
    label: 'Manage Programs', 
    icon: 'category', 
    sublinks: [
      { label: 'Categories', href: '/admin/programs/categories' },
      { label: 'Add Program', href: '/admin/programs/add' },
      { label: 'All Programs', href: '/admin/programs/all' }
    ] 
  },
  { label: 'Manage Notices', icon: 'campaign', href: '/admin/notices' },
  { label: 'Articles', icon: 'article', href: '/admin/articles' },
  { label: 'Academic Calendar', icon: 'calendar_month', href: '/admin/calendar' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) return null;

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f1f3f5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-2 border-slate-200 flex flex-col sticky top-0 h-screen z-40 overflow-y-auto">
        <div className="p-6 border-b-2 border-slate-200">
          <Link href="/admin">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#1a84d2]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Mind Masters
            </h2>
          </Link>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Control Center
          </p>
        </div>

        <nav className="flex-grow p-4 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const hasSub = !!link.sublinks;
            const isActive = link.href ? pathname === link.href : link.sublinks?.some(s => pathname === s.href);
            const isSubOpen = openSubmenu === link.label;

            return (
              <div key={link.label}>
                {hasSub ? (
                  <button
                    onClick={() => setOpenSubmenu(isSubOpen ? null : link.label)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
                      isActive ? 'text-[#1a84d2] bg-slate-50' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#1a84d2]' : 'text-slate-400'}`}>
                        {link.icon}
                      </span>
                      {link.label}
                    </div>
                    <span className={`material-symbols-outlined text-base transition-transform ${isSubOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                ) : (
                  <Link
                    href={link.href!}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
                      isActive
                        ? 'bg-[#1a84d2] text-white shadow-md shadow-[#1a84d2]/20'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[#1a84d2]'}`}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                )}

                <AnimatePresence>
                  {hasSub && isSubOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col pl-10 pr-2 mt-1 gap-1"
                    >
                      {link.sublinks!.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block py-2 px-3 rounded-md text-[13px] font-bold transition-all ${
                            pathname === sub.href ? 'text-[#1a84d2] bg-slate-50' : 'text-slate-500 hover:text-black hover:bg-slate-50'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-500 font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
