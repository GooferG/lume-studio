import { describe, it, expect, beforeAll } from 'vitest';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { loadMdxEntries, loadMdxBySlug } from '@/lib/mdx';

const tmp = path.join(process.cwd(), 'tests', '_fixtures', 'mdx');

beforeAll(() => {
  if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  writeFileSync(
    path.join(tmp, 'first.mdx'),
    `---\ntitle: First\nslug: first\norder: 1\n---\nBody A`,
  );
  writeFileSync(
    path.join(tmp, 'second.mdx'),
    `---\ntitle: Second\nslug: second\norder: 2\n---\nBody B`,
  );
});

describe('loadMdxEntries', () => {
  it('returns frontmatter for all .mdx files in a directory', async () => {
    const items = await loadMdxEntries(tmp);
    expect(items.length).toBe(2);
    expect(items.map((i) => i.frontmatter.slug).sort()).toEqual(['first', 'second']);
  });

  it('orders by frontmatter.order ascending if present', async () => {
    const items = await loadMdxEntries(tmp);
    expect(items[0]?.frontmatter.slug).toBe('first');
    expect(items[1]?.frontmatter.slug).toBe('second');
  });
});

describe('loadMdxBySlug', () => {
  it('returns frontmatter and body for the matching slug', async () => {
    const item = await loadMdxBySlug(tmp, 'first');
    expect(item).not.toBeNull();
    expect(item?.frontmatter.title).toBe('First');
    expect(item?.body).toContain('Body A');
  });

  it('returns null for missing slug', async () => {
    expect(await loadMdxBySlug(tmp, 'nope')).toBeNull();
  });
});
