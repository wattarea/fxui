import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'fs/promises';
import path from 'path';
import { CodeBlock } from '../../../components/CodeBlock';

interface PageProps {
  params: { slug: string };
}

const mdxComponents = {
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => <>{children}</>,
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const lang = typeof className === 'string' ? className : '';
    const isInline = !lang.startsWith('language-');
    if (isInline) {
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 text-fx-black dark:text-fx-white px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    const language = lang.replace('language-', '') || 'tsx';
    return (
      <CodeBlock language={language} code={String(children).trim()} />
    );
  },
} as Record<string, React.ComponentType<React.HTMLAttributes<HTMLElement>>>;

export default async function DocsPage({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.mdx`);

  let source: string;
  try {
    source = await readFile(filePath, 'utf-8');
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 overflow-x-hidden">
      <article className="prose prose-fx max-w-none overflow-x-hidden">
        <MDXRemote source={source} components={mdxComponents} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const { readdir } = await import('fs/promises');
  const files = await readdir(path.join(process.cwd(), 'content'));
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }));
}
