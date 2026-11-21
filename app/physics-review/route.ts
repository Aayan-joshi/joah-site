import { canAccessReview, reviewHeaders } from "./access";
import { studyPage } from "./study-page";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await canAccessReview())) {
    return new Response('<title>Physics review sign-in</title><main><h1>Physics review</h1><p><a href="/admin">Sign in as site admin</a>, then reopen this page.</p></main>', {
      status: 401,
      headers: { ...reviewHeaders, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new Response(studyPage, {
    headers: {
      ...reviewHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
    },
  });
}
