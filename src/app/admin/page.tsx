import { redirect } from 'next/navigation';
import { getAdminFromCookie } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import { Contact } from '@/models/Contact';
import { Enrollment } from '@/models/Enrollment';

export default async function AdminDashboardPage() {
  const admin = await getAdminFromCookie();
  if (!admin) redirect('/admin/login');

  await connectDB();
  const contactCount = await Contact.countDocuments();
  const enrollmentCount = await Enrollment.countDocuments();
  
  // Get counts for different status/categories if needed
  const newContacts = await Contact.countDocuments({ status: 'new' });
  const pendingEnrollments = await Enrollment.countDocuments({ status: 'pending' });

  const stats = [
    { label: 'Total Queries', value: contactCount, sub: `${newContacts} New`, icon: 'question_answer', color: '#1a84d2', bg: '#e8f4ff' },
    { label: 'Total Enrollments', value: enrollmentCount, sub: `${pendingEnrollments} Pending`, icon: 'school', color: '#8126cf', bg: '#f5e8ff' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Dashboard
        </h1>
        <p className="text-sm font-bold text-slate-500 mt-1">Welcome back, {admin.username}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: stat.bg }}>
              <span className="material-symbols-outlined text-2xl font-black" style={{ color: stat.color }}>
                {stat.icon}
              </span>
            </div>
            <div>
              <p className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-0.5" style={{ fontFamily: 'var(--font-manrope)' }}>
                {stat.label}
              </p>
              <h3 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {stat.value}
              </h3>
              <p className="font-bold text-[10px] uppercase tracking-wide mt-1.5 px-2 py-0.5 border border-slate-200 inline-block rounded-md" style={{ fontFamily: 'var(--font-manrope)', backgroundColor: stat.bg, color: stat.color }}>
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <h3 className="text-lg font-black uppercase tracking-tight mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-emerald-50/50">
              <span className="text-sm font-bold flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Database Connection
              </span>
              <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-600">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-emerald-50/50">
              <span className="text-sm font-bold flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                API Services
              </span>
              <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-600">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
