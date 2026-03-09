"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Pencil,
    Trash2,
    LogOut,
    Save,
    X,
    Eye,
    EyeOff,
} from "lucide-react";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    published: boolean;
}

interface EditorState {
    mode: "create" | "edit";
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    published: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editor, setEditor] = useState<EditorState | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchPosts = useCallback(async () => {
        try {
            // Fetch ALL posts (including unpublished) via a special query
            const res = await fetch("/api/blogs?all=1");
            if (res.status === 401) {
                router.push("/admin");
                return;
            }
            const data = await res.json();
            setPosts(data);
        } catch {
            setError("Failed to load posts");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    function slugify(text: string) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    }

    function openCreate() {
        setEditor({
            mode: "create",
            slug: "",
            title: "",
            excerpt: "",
            content: "",
            published: false,
        });
        setError("");
    }

    function openEdit(post: BlogPost) {
        setEditor({
            mode: "edit",
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            published: post.published,
        });
        setError("");
    }

    async function handleSave() {
        if (!editor) return;
        setSaving(true);
        setError("");

        try {
            const slug =
                editor.mode === "create" ? slugify(editor.title) : editor.slug;

            const body = {
                title: editor.title,
                slug,
                excerpt: editor.excerpt,
                content: editor.content,
                published: editor.published,
            };

            const url =
                editor.mode === "create" ? "/api/blogs" : `/api/blogs/${editor.slug}`;
            const method = editor.mode === "create" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.status === 401) {
                router.push("/admin");
                return;
            }

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Save failed");
                return;
            }

            setEditor(null);
            await fetchPosts();
        } catch {
            setError("Something went wrong");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(slug: string) {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
            if (res.status === 401) {
                router.push("/admin");
                return;
            }
            await fetchPosts();
        } catch {
            setError("Failed to delete post");
        }
    }

    async function handleLogout() {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/admin");
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground animate-pulse">Loading…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Top bar */}
            <header className="glass fixed top-0 left-0 right-0 z-50 shadow-lg">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold gradient-text">Admin Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                            <a href="/blog">View Blog</a>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="mr-2 h-3 w-3" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 pt-28 pb-20">
                {/* Action bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Blog Posts</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {posts.length} post{posts.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <Button onClick={openCreate} className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </div>

                {error && (
                    <div className="mb-6 rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {/* Editor */}
                {editor && (
                    <Card className="mb-8 bg-card/60 border-primary/30 animate-fade-in-up">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                    {editor.mode === "create" ? "New Post" : "Edit Post"}
                                </CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setEditor(null)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="ed-title">Title</Label>
                                <Input
                                    id="ed-title"
                                    value={editor.title}
                                    onChange={(e) =>
                                        setEditor({ ...editor, title: e.target.value })
                                    }
                                    placeholder="Post title"
                                />
                                {editor.mode === "create" && editor.title && (
                                    <p className="text-xs text-muted-foreground">
                                        Slug: <code className="text-primary">{slugify(editor.title)}</code>
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ed-excerpt">Excerpt</Label>
                                <Input
                                    id="ed-excerpt"
                                    value={editor.excerpt}
                                    onChange={(e) =>
                                        setEditor({ ...editor, excerpt: e.target.value })
                                    }
                                    placeholder="A short description shown on the blog list"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ed-content">Content</Label>
                                <Textarea
                                    id="ed-content"
                                    value={editor.content}
                                    onChange={(e) =>
                                        setEditor({ ...editor, content: e.target.value })
                                    }
                                    placeholder="Write your blog post content here. Use double newlines for paragraphs."
                                    rows={12}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setEditor({ ...editor, published: !editor.published })
                                    }
                                >
                                    {editor.published ? (
                                        <>
                                            <Eye className="mr-2 h-3 w-3" />
                                            Published
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff className="mr-2 h-3 w-3" />
                                            Draft
                                        </>
                                    )}
                                </Button>
                            </div>

                            <Separator />

                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setEditor(null)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !editor.title}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {saving ? "Saving…" : "Save"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Post list */}
                {posts.length === 0 && !editor ? (
                    <Card className="bg-card/60 border-border/40">
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-4">
                                No blog posts yet. Create your first one!
                            </p>
                            <Button onClick={openCreate} variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Post
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <Card
                                key={post.slug}
                                className="bg-card/60 border-border/40 hover:border-border/60 transition-colors"
                            >
                                <CardContent className="flex items-center justify-between py-4 px-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold truncate">{post.title}</h3>
                                            <Badge
                                                variant={post.published ? "default" : "secondary"}
                                                className="shrink-0 text-xs"
                                            >
                                                {post.published ? "Published" : "Draft"}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {post.date} · /{post.slug}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEdit(post)}
                                            title="Edit"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(post.slug)}
                                            title="Delete"
                                            className="hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
