import type { APIRoute } from 'astro';
import { SITE } from '~/data/site';

/* Generated rather than a static file, so a staging build can never ship
   production's "index me" to the preview host, or the other way round. */
export const GET: APIRoute = ({ site }) => {
  const host = new URL(site ?? SITE.url);
  const production = host.hostname === new URL(SITE.url).hostname;
  const body = production
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', host).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
