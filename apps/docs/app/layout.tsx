import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '../components/Sidebar';
import { ClientProviders } from '../components/ClientProviders';

export const metadata: Metadata = {
  title: 'FXUI — Neo-brutalist React UI Library',
  description: 'Bold. Raw. Unapologetically different.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white font-sans min-h-screen">
        <ClientProviders>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-h-screen lg:ml-64 pt-14 lg:pt-0 pl-16 lg:pl-0">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
