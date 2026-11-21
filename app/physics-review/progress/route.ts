import { canAccessReview, reviewHeaders } from "../access";
import { configuration, parseChange, readProgress, writeProgress } from "./notion";

export const dynamic = "force-dynamic";

const json = (data: object, status = 200) =>
  Response.json(data, { status, headers: reviewHeaders });

export async function GET() {
  if (!(await canAccessReview())) return json({ error: "Sign in again." }, 401);
  const config = configuration();
  if (!config) return json({ error: "Notion sync is not configured." }, 503);
  try {
    return json(await readProgress(config));
  } catch {
    return json({ error: "Notion progress is unavailable." }, 502);
  }
}

export async function PUT(request: Request) {
  if (!(await canAccessReview())) return json({ error: "Sign in again." }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return json({ error: "Unexpected request origin." }, 403);
  }
  const config = configuration();
  if (!config) return json({ error: "Notion sync is not configured." }, 503);
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 1024) return json({ error: "Request is too large." }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }
  const change = parseChange(body);
  if (!change) return json({ error: "Invalid progress change." }, 400);
  try {
    await writeProgress(config, change);
    return json({ ok: true });
  } catch {
    return json({ error: "Progress could not be saved to Notion." }, 502);
  }
}
