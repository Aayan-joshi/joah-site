import { verifyAuth } from "@/lib/auth";

export async function canAccessReview(): Promise<boolean> {
  // Reuse the site session only when the admin login has explicit credentials.
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD ||
      (process.env.JWT_SECRET?.length ?? 0) < 32) return false;
  return verifyAuth();
}

export const reviewHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
};
