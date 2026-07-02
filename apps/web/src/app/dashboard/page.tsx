'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingCart, Users, Receipt, BarChart3, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    fetch('/api/reports/dashboard?tenantId=placeholder', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, [router]);

  const cards = [
    { label: 'Items', icon: Package, href: '/items', color: 'bg-emerald-500' },
    { label: 'POS', icon: ShoppingCart, href: '/pos', color: 'bg-sky-500' },
    { label: 'Parties', icon: Users, href: '/parties', color: 'bg-violet-500' },
    { label: 'Invoices', icon: Receipt, href: '/invoices', color: 'bg-amber-500' },
    { label: 'Reports', icon: BarChart3, href: '/reports', color: 'bg-rose-500' },
    { label: 'Settings', icon: Settings, href: '/settings', color: 'bg-slate-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button onClick={() => { localStorage.removeItem('token'); router.push('/login'); }} className="text-sm text-gray-600 hover:text-gray-900">Logout</button>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border"><div className="text-sm text-gray-500">Sales Today</div><div className="text-2xl font-bold">PKR {Number(stats.salesToday).toLocaleString()}</div></div>
            <div className="bg-white p-4 rounded-xl shadow-sm border"><div className="text-sm text-gray-500">Stock Value</div><div className="text-2xl font-bold">PKR {Number(stats.stockValue).toLocaleString()}</div></div>
            <div className="bg-white p-4 rounded-xl shadow-sm border"><div className="text-sm text-gray-500">Pending Returns</div><div className="text-2xl font-bold">{stats.pendingReturns}</div></div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition flex items-center gap-4">
              <div className={`${c.color} text-white p-3 rounded-lg`}><c.icon size={24} /></div>
              <span className="font-semibold text-lg">{c.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
