'use client';

import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface ComponentPreviewProps {
  code: string;
  children: React.ReactNode;
  language?: string;
}

export function ComponentPreview({ code, children, language = 'tsx' }: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="mb-8 rounded-[4px] border-2 border-fx-black dark:border-fx-white shadow-fx dark:shadow-fx-dark overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b-2 border-fx-black dark:border-fx-white bg-gray-50 dark:bg-gray-900">
        {(['preview', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'px-5 py-2.5 text-sm font-bold font-sans capitalize transition-all duration-100',
              'border-r-2 border-fx-black dark:border-fx-white last:border-r-0',
              tab === t
                ? 'bg-fx-black dark:bg-fx-white text-fx-white dark:text-fx-black'
                : 'bg-transparent text-gray-500 hover:text-fx-black dark:hover:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'preview' ? (
        <div className="p-8 bg-fx-white dark:bg-fx-black flex items-center justify-center min-h-[120px] fx-grid-pattern">
          {children}
        </div>
      ) : (
        <div className="p-0 [&>div]:mb-0 [&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
}
