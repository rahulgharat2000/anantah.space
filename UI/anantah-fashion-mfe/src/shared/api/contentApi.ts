import { apiRequest } from "./client";

export type ContentItem = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  href: string | null;
};

export type ContentBlock = {
  id: string;
  kind: "hero" | "editorial" | "collection-grid" | "service-strip" | string;
  eyebrow: string | null;
  title: string;
  body: string | null;
  imageUrl: string | null;
  actionLabel: string | null;
  actionHref: string | null;
  theme: string;
  items: ContentItem[];
};

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
};

export function getContentPage(slug: string, signal?: AbortSignal) {
  return apiRequest<ContentPage>(`/api/v1/fashion/content/pages/${encodeURIComponent(slug)}`, signal);
}