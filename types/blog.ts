export interface Author {
    _id?: string;
    name: string;
    image: any;
    bio?: string;
}

export interface BlogPost {
    _id: string;
    title: string;
    slug: string | { current: string };
    author: Author;
    mainImage: any;
    categories: string[];
    publishedAt: string;
    excerpt: string;
    body?: any;
    relatedPosts?: BlogPost[];
}
