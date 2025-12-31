import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin only once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value || "";

  try {
    // Verify the Firebase token
    await getAuth().verifyIdToken(token);
    return NextResponse.next(); // Allow access if authenticated
  } catch (error) {
    // Redirect to sign-in if not authenticated
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/team/:path*", "/admin/:path*"], 
};
