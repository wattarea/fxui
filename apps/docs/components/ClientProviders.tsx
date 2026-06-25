'use client';

import { ToastProvider } from 'fxui-core';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
