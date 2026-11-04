import { isDocumentUrl, normalizeUrl } from "./url.ts";

export interface FoundLink {
  url: string;
  text: string;
}

function decode(text: string): string {
  return text
    .replace(/<!\[CDATA\[|\]\]>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&/gi, "&")
    .replace(/"/gi, '"')
    .replace(/&#39;|'/gi, "'")
    .replace(/</gi, "<")
    .replace(/>/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHref(raw: string): string {
  return raw.replace(/&/gi, "&").replace(/"/gi, '"').trim();
}

export function extractAnchors(html: string, base: string): FoundLink[] {
  const found: FoundLink[] = [];
  const seen = new Set<string>();
  const re = /<a\b[^>]*href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(re)) {
    const raw = decodeHref(match[1] || match[2] || match[3] || "");
    const url = normalizeUrl(raw, base);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    found.push({ url, text: decode(match[4] ?? "").slice(0, 240) });
    if (found.length >= 250) break;
  }
  return found;
}

export function extractFeedUrls(html: string, base: string): string[] {
  const urls: string[] = [];
  const re = /<link\b[^>]*>/gi;
  for (const match of html.matchAll(re)) {
    const tag = match[0] ?? "";
    if (!/type\s*=\s*["']application\/(rss|atom)\+xml["']/i.test(tag)) continue;
    const href = tag.match(/href\s*=\s*(?:"([^"]+)"|'([^']+)')/i);
    const url = normalizeUrl(decodeHref(href?.[1] || href?.[2] || ""), base);
    if (url) urls.push(url);
  }
  return urls.slice(0, 3);
}

export function extractFeedItems(xml: string, base: string): FoundLink[] {
  const found: FoundLink[] = [];
  const seen = new Set<string>();
  const itemRe = /<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of xml.matchAll(itemRe)) {
    const block = match[2] ?? "";
    const title = decode(block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const atom = block.match(/<link\b[^>]*href\s*=\s*"([^"]+)"/i)?.[1];
    const rss = block.match(/<link>\s*([^<\s]+)\s*<\/link>/i)?.[1];
    const guid = block.match(/<guid[^>]*>\s*([^<\s]+)\s*<\/guid>/i)?.[1];
    const url = normalizeUrl(decodeHref(atom || rss || guid || ""), base);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    found.push({ url, text: title.slice(0, 240) });
    if (found.length >= 40) break;
  }
  return found;
}

export function extractSitemapLocs(xml: string): string[] {
  const urls: string[] = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  for (const match of xml.matchAll(re)) {
    const url = normalizeUrl(decodeHref(match[1] ?? ""));
    if (url) urls.push(url);
    if (urls.length >= 400) break;
  }
  return urls;
}

export function looksLikeHtml(contentType: string | null, url: string): boolean {
  if (isDocumentUrl(url)) return false;
  if (!contentType) return true;
  const type = contentType.toLowerCase();
  return type.includes("html") || type.includes("xml") || type.includes("text/");
}
