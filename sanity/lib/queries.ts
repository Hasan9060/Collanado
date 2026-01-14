import { groq } from "next-sanity";

export const blogsQuery = groq`*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "author": author->{name, image, bio},
  mainImage,
  categories,
  publishedAt,
  excerpt,
  body
}`;

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "author": author->{name, image, bio},
  mainImage,
  categories,
  publishedAt,
  excerpt,
  body,
  "relatedPosts": relatedPosts[]->{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt
  }
}`;

export const latestBlogsQuery = groq`*[_type == "blog"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  "author": author->{name, image},
  mainImage,
  publishedAt,
  excerpt
}`;

export const magazinesQuery = groq`*[_type == "magazine"] | order(publishDate desc) {
  _id,
  title,
  "slug": slug.current,
  coverImage,
  flipbookUrl,
  publishDate,
  description
}`;
