import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { Screenshot } from './Screenshot';
import { Callout } from './Callout';

export const mdxComponents: MDXComponents = {
  Screenshot,
  Callout,
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-12 mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="text-xl font-semibold mt-10 mb-3">{children}</h3>,
  p: ({ children }) => (
    <p className="leading-relaxed mb-4 text-[var(--color-text-muted)]">{children}</p>
  ),
  a: ({ href, children, ...rest }) => {
    const isExt = typeof href === 'string' && href.startsWith('http');
    if (isExt) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-[var(--color-accent)]"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? '#'}
        className="underline underline-offset-2 hover:text-[var(--color-accent)]"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 mb-4 space-y-2 text-[var(--color-text-muted)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 mb-4 space-y-2 text-[var(--color-text-muted)]">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 italic font-serif my-6 text-[var(--color-text)]">
      {children}
    </blockquote>
  ),
};
