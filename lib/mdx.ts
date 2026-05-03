import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type MdxFrontmatter = {
  title: string;
  slug: string;
  summary?: string;
  order?: number;
  [key: string]: unknown;
};

export type MdxEntry = {
  frontmatter: MdxFrontmatter;
  body: string;
};

export async function loadMdxEntries(dir: string): Promise<MdxEntry[]> {
  const files = await fs.readdir(dir);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));
  const entries = await Promise.all(
    mdxFiles.map(async (filename) => {
      const raw = await fs.readFile(path.join(dir, filename), 'utf-8');
      const parsed = matter(raw);
      return {
        frontmatter: parsed.data as MdxFrontmatter,
        body: parsed.content,
      };
    }),
  );
  entries.sort((a, b) => {
    const ao = a.frontmatter.order ?? 999;
    const bo = b.frontmatter.order ?? 999;
    if (ao !== bo) return ao - bo;
    return (a.frontmatter.slug ?? '').localeCompare(b.frontmatter.slug ?? '');
  });
  return entries;
}

export async function loadMdxBySlug(dir: string, slug: string): Promise<MdxEntry | null> {
  try {
    const raw = await fs.readFile(path.join(dir, `${slug}.mdx`), 'utf-8');
    const parsed = matter(raw);
    return { frontmatter: parsed.data as MdxFrontmatter, body: parsed.content };
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

export const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');
export const WORK_DIR = path.join(process.cwd(), 'content', 'work');
