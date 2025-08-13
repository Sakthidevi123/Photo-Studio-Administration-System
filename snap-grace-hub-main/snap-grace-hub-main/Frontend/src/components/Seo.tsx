import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && description) {
      descTag.setAttribute('content', description);
    }

    // Canonical
    const href = window.location.origin + window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', href);
  }, [title, description]);

  return null;
}
