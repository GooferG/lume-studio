import type { MetadataRoute } from 'next';
import { loadMdxEntries, SERVICES_DIR, WORK_DIR } from '@/lib/mdx';
import { site } from '@/data/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, '');
  const services = await loadMdxEntries(SERVICES_DIR);
  const work = await loadMdxEntries(WORK_DIR);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/services',
    '/work',
    '/pricing',
    '/about',
    '/contact',
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));

  const serviceRoutes = services.map((e) => ({
    url: `${base}/services/${e.frontmatter.slug}`,
    lastModified: new Date(),
  }));

  const workRoutes = work.map((e) => ({
    url: `${base}/work/${e.frontmatter.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes];
}
