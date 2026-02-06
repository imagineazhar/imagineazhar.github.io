const SITE_URL = "https://imagineazhar.com";

type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

const setMetaTag = ({ name, property, content }: MetaTag) => {
  if (typeof document === "undefined") return;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  const existing = document.head.querySelector(selector);
  const meta = existing ?? document.createElement("meta");

  if (!existing) {
    if (name) {
      meta.setAttribute("name", name);
    }
    if (property) {
      meta.setAttribute("property", property);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};

const setCanonical = (url: string) => {
  if (typeof document === "undefined") return;
  const existing = document.head.querySelector('link[rel="canonical"]');
  const link = existing ?? document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", url);
  if (!existing) {
    document.head.appendChild(link);
  }
};

export const buildUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};

export const setPageMeta = (options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
}) => {
  const { title, description, url, image, imageAlt } = options;
  const imageUrl = image ?? `${SITE_URL}/portrait.jpg`;
  const imageAltText = imageAlt ?? "Portrait of Muhammad Azhar";

  if (typeof document !== "undefined") {
    document.title = title;
  }

  setCanonical(url);

  setMetaTag({ name: "description", content: description });
  setMetaTag({ property: "og:title", content: title });
  setMetaTag({ property: "og:description", content: description });
  setMetaTag({ property: "og:url", content: url });
  setMetaTag({ property: "og:image", content: imageUrl });
  setMetaTag({ property: "og:image:alt", content: imageAltText });
  setMetaTag({ name: "twitter:title", content: title });
  setMetaTag({ name: "twitter:description", content: description });
  setMetaTag({ name: "twitter:image", content: imageUrl });
  setMetaTag({ name: "twitter:image:alt", content: imageAltText });
};
