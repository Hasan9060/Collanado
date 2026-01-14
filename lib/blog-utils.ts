import { BlogPost } from "@/types/blog";

/**
 * Get the slug string from a BlogPost
 * Handles both string and Sanity slug object formats
 */
export function getSlugString(slug: BlogPost['slug'] | undefined | null): string {
    if (!slug) return '';
    return typeof slug === 'string' ? slug : slug.current;
}
