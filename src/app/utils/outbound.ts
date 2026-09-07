import type { Post } from "@/app/hooks/useFeed";

/** Every post lives on Medium or Substack, so every post link is outbound. */
export const outboundProps = (post: Post) => ({
  href: post.link,
  target: "_blank" as const,
  rel: "noopener noreferrer",
});
