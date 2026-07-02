import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cosmatic POS ERP',
  description: 'Cosmetics Trading ERP & POS Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
