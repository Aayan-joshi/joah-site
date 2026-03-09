import { getPosts } from "@/lib/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { Logo } from "../components/Logo";

export const metadata: Metadata = {
    title: "Blog — Aayan Joshi",
    description: "Thoughts on tech, projects, and more from Aayan Joshi.",
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
    const posts = getPosts(true);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="glass fixed top-0 left-0 right-0 z-50 shadow-lg">
                <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <Logo size={32} />
                    </a>
                    <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                        <a href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Portfolio
                        </a>
                    </Button>
                </nav>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-up">
                    <span className="gradient-text">Blog</span>
                </h1>
                <p className="text-muted-foreground mb-12 animate-fade-in-up delay-100">
                    Thoughts on tech, projects, and things I&apos;m learning.
                </p>

                {posts.length === 0 ? (
                    <Card className="bg-card/60 border-border/40 animate-fade-in-up delay-200">
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post, i) => (
                            <a key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                <Card
                                    className="bg-card/60 border-border/40 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 animate-fade-in-up"
                                    style={{ animationDelay: `${0.1 * i + 0.2}s` }}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <Badge variant="outline" className="mt-4 text-xs">
                                            Read more →
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div >
    );
}
