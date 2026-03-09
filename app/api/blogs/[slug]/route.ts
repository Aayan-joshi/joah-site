import { NextResponse } from "next/server";
import { getPost, updatePost, deletePost } from "@/lib/blogs";
import { verifyAuth } from "@/lib/auth";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authenticated = await verifyAuth();
    if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { slug } = await params;
        const body = await request.json();
        const updated = updatePost(slug, body);
        return NextResponse.json(updated);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authenticated = await verifyAuth();
    if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { slug } = await params;
        deletePost(slug);
        return NextResponse.json({ success: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
