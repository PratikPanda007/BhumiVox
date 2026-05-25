import { useEffect } from "react";

type Meta = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content?: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({ title, description, ogTitle, ogDescription, ogImage }: Meta) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", ogTitle ?? title);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      ogDescription ?? description,
    );
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
  }, [title, description, ogTitle, ogDescription, ogImage]);
}
