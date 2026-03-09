import { NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/blogs";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    if (all === "1") {
        const authenticated = await verifyAuth();
        if (!authenticated) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(getPosts(false));
    }

    return NextResponse.json(getPosts(true));
}

export async function POST(request: Request) {
    const authenticated = await verifyAuth();
    if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, excerpt, content, published } = body;

        if (!title || !slug) {
            return NextResponse.json(
                { error: "Title and slug are required" },
                { status: 400 }
            );
        }

        const post = createPost({
            title,
            slug,
            excerpt: excerpt || "",
            content: content || "",
            published: published ?? false,
        });

        return NextResponse.json(post, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
