'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose relative group mb-4 rounded-[4px] border-2 border-fx-black dark:border-fx-white shadow-fx dark:shadow-fx-dark overflow-hidden">
      {/* Header bar — thin semi-transparent border-b, does not overlap the outer border */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111111] dark:bg-[#e5e5e5] border-b border-white/10 dark:border-black/10">
        <span className="text-xs font-mono text-fx-yellow dark:text-fx-black uppercase tracking-widest font-bold">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className={[
            'text-xs font-bold font-sans px-3 py-1 rounded-[4px] transition-all duration-150',
            'border-2',
            copied
              ? 'bg-fx-green text-fx-black border-fx-green'
              : 'bg-transparent text-gray-400 dark:text-gray-600 border-white/20 dark:border-black/20 hover:border-fx-yellow hover:text-fx-yellow dark:hover:border-fx-black dark:hover:text-fx-black',
          ].join(' ')}
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code — custom scrollbar, thin and unobtrusive */}
      <pre className={[
        'overflow-x-auto p-4 m-0',
        'bg-[#0a0a0a] dark:bg-[#f5f5f5]',
        '[&::-webkit-scrollbar]:h-[3px]',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-white/20 dark:[&::-webkit-scrollbar-thumb]:bg-black/20',
      ].join(' ')}>
        <code className="!text-[#e4e4e7] dark:!text-[#18181b] !bg-transparent !p-0 !rounded-none text-sm font-mono leading-relaxed before:!content-none after:!content-none">
          {code}
        </code>
      </pre>
    </div>
  );
}
