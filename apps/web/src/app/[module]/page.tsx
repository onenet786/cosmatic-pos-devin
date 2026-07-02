'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  BarChart3,
  Boxes,
  FileText,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Users,
  Warehouse,
} from 'lucide-react';

type ModuleConfig = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  actions: Array<{ title: string; description: string; icon: LucideIcon }>;
};

const modules: Record<string, ModuleConfig> = {
  items: {
    title: 'Items & Inventory',
    description: 'Manage products, stock levels, warehouses, batches, and expiry dates.',
    icon: Package,
    color: 'bg-emerald-500',
    actions: [
      { title: 'Item catalogue', description: 'Products, barcodes, units, brands, and categories', icon: Boxes },
      { title: 'Stock overview', description: 'Current quantities and stock valuation by warehouse', icon: BarChart3 },
      { title: 'Warehouses', description: 'Branch warehouses, transfers, and adjustments', icon: Warehouse },
    ],
  },
  pos: {
    title: 'Point of Sale',
    description: 'Open cashier sessions, process sales, and manage customer returns.',
    icon: ShoppingCart,
    color: 'bg-sky-500',
    actions: [
      { title: 'New sale', description: 'Scan items and accept customer payments', icon: ShoppingCart },
      { title: 'POS sessions', description: 'Opening float, closing totals, and cash variance', icon: Receipt },
      { title: 'Returns', description: 'Review and process POS return requests', icon: FileText },
    ],
  },
  parties: {
    title: 'Customers & Suppliers',
    description: 'Keep customer, supplier, pricing, credit, and contact records together.',
    icon: Users,
    color: 'bg-violet-500',
    actions: [
      { title: 'Customers', description: 'Customer contacts, pricing, and credit limits', icon: Users },
      { title: 'Suppliers', description: 'Supplier details and payable balances', icon: Warehouse },
      { title: 'Price lists', description: 'Customer-specific and wholesale pricing', icon: Receipt },
    ],
  },
  invoices: {
    title: 'Invoices & Orders',
    description: 'Control purchase and sales documents from quotation through payment.',
    icon: Receipt,
    color: 'bg-amber-500',
    actions: [
      { title: 'Sales invoices', description: 'Sales orders, invoices, receipts, and returns', icon: Receipt },
      { title: 'Purchases', description: 'Purchase orders, goods receipts, and supplier invoices', icon: ShoppingCart },
      { title: 'Payments', description: 'Receipts, payments, and post-dated cheques', icon: FileText },
    ],
  },
  reports: {
    title: 'Reports & Insights',
    description: 'Monitor sales, inventory, receivables, and financial performance.',
    icon: BarChart3,
    color: 'bg-rose-500',
    actions: [
      { title: 'Sales dashboard', description: 'Sales trends and branch performance', icon: BarChart3 },
      { title: 'Trial balance', description: 'Account balances for the selected fiscal year', icon: FileText },
      { title: 'Receivable aging', description: 'Outstanding customer balances by age', icon: Receipt },
    ],
  },
  settings: {
    title: 'Platform Settings',
    description: 'Configure branches, users, roles, approvals, and financial periods.',
    icon: Settings,
    color: 'bg-slate-600',
    actions: [
      { title: 'Users & roles', description: 'Team access and role permissions', icon: Users },
      { title: 'Branches', description: 'Business locations and warehouse assignments', icon: Warehouse },
      { title: 'Configuration', description: 'Fiscal years, approvals, and platform options', icon: SlidersHorizontal },
    ],
  },
};

export default function ModulePage() {
  const params = useParams<{ module: string }>();
  const router = useRouter();
  const config = modules[params.module];

  useEffect(() => {
    if (!localStorage.getItem('token')) router.replace('/login');
  }, [router]);

  if (!config) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Module not found</h1>
          <Link href="/dashboard" className="mt-5 inline-flex text-primary-600 hover:text-primary-700">Return to dashboard</Link>
        </div>
      </main>
    );
  }

  const ModuleIcon = config.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Link href="/dashboard" aria-label="Back to dashboard" className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Cosmatic ERP</p>
            <h1 className="text-lg font-bold text-slate-900">{config.title}</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="overflow-hidden rounded-3xl bg-slate-900 px-7 py-9 text-white shadow-xl shadow-slate-200 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className={`${config.color} grid h-16 w-16 shrink-0 place-items-center rounded-2xl shadow-lg`}>
              <ModuleIcon size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{config.title}</h2>
              <p className="mt-2 max-w-2xl text-slate-300">{config.description}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {config.actions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <article key={action.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-700">
                  <ActionIcon size={21} />
                </div>
                <h3 className="mt-5 font-bold text-slate-900">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{action.description}</p>
                <div className="mt-5 border-t border-slate-100 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Workspace ready</div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
