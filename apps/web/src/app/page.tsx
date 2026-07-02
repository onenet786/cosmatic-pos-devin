import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-900 to-slate-850 text-white p-8">
      <h1 className="text-5xl font-bold mb-4">Cosmatic POS ERP</h1>
      <p className="text-xl mb-8 text-gray-300">Cosmetics Trading ERP & POS Platform</p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition">
          Go to Dashboard
        </Link>
        <Link href="/login" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition">
          Login
        </Link>
      </div>
    </main>
  );
}
