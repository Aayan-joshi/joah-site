import fs from "fs";
import path from "path";

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    published: boolean;
}

interface BlogData {
    posts: BlogPost[];
}

const DB_PATH = path.join(process.cwd(), "data", "blogs.json");

function readDb(): BlogData {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as BlogData;
}

function writeDb(data: BlogData): void {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/** Get all posts. If `publishedOnly` is true, filter to published posts only. */
export function getPosts(publishedOnly = false): BlogPost[] {
    const { posts } = readDb();
    const filtered = publishedOnly ? posts.filter((p) => p.published) : posts;
    return filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/** Get a single post by slug. */
export function getPost(slug: string): BlogPost | undefined {
    const { posts } = readDb();
    return posts.find((p) => p.slug === slug);
}

/** Create a new post. Throws if slug already exists. */
export function createPost(
    post: Omit<BlogPost, "date">
): BlogPost {
    const data = readDb();
    if (data.posts.some((p) => p.slug === post.slug)) {
        throw new Error(`Post with slug "${post.slug}" already exists`);
    }
    const newPost: BlogPost = {
        ...post,
        date: new Date().toISOString().split("T")[0],
    };
    data.posts.push(newPost);
    writeDb(data);
    return newPost;
}

/** Update an existing post by slug. */
export function updatePost(
    slug: string,
    updates: Partial<Omit<BlogPost, "slug">>
): BlogPost {
    const data = readDb();
    const idx = data.posts.findIndex((p) => p.slug === slug);
    if (idx === -1) throw new Error(`Post "${slug}" not found`);
    data.posts[idx] = { ...data.posts[idx], ...updates };
    writeDb(data);
    return data.posts[idx];
}

/** Delete a post by slug. */
export function deletePost(slug: string): void {
    const data = readDb();
    const idx = data.posts.findIndex((p) => p.slug === slug);
    if (idx === -1) throw new Error(`Post "${slug}" not found`);
    data.posts.splice(idx, 1);
    writeDb(data);
}
