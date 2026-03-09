import { getPost, getPosts } from "@/lib/blogs";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: `${post.title} — Aayan Joshi`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post || !post.published) notFound();

    // Simple paragraph rendering: split on double newlines
    const paragraphs = post.content.split(/\n\n+/);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="glass fixed top-0 left-0 right-0 z-50 shadow-lg">
                <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <a href="/" className="text-2xl font-bold gradient-text tracking-tight">
                        AJ
                    </a>
                    <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                        <a href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            All Posts
                        </a>
                    </Button>
                </nav>
            </header>

            {/* Article */}
            <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
                <article>
                    <div className="mb-8 animate-fade-in-up">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
                            {post.title}
                        </h1>
                    </div>

                    <Card className="bg-card/60 border-border/40 animate-fade-in-up delay-200">
                        <CardContent className="pt-6">
                            <div className="space-y-4 text-foreground/90 leading-relaxed">
                                {paragraphs.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </article>

                <div className="mt-12 text-center animate-fade-in-up delay-300">
                    <Button variant="outline" asChild>
                        <a href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to all posts
                        </a>
                    </Button>
                </div>
            </main>
        </div>
    );
}
