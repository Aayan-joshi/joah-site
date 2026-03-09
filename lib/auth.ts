import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set");
    return new TextEncoder().encode(secret);
}

/** Create a signed JWT token. */
export async function signToken(): Promise<string> {
    return new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecret());
}

/** Verify a JWT token string. Returns true if valid. */
export async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, getSecret());
        return true;
    } catch {
        return false;
    }
}

/** Check if the current request has a valid admin session cookie. */
export async function verifyAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyToken(token);
}

/** Validate login credentials against env vars. */
export function validateCredentials(
    username: string,
    password: string
): boolean {
    return (
        username === (process.env.ADMIN_USERNAME ?? "admin") &&
        password === (process.env.ADMIN_PASSWORD ?? "password123")
    );
}

export { COOKIE_NAME };
