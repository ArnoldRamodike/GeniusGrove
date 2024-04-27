import { clerkMiddleware, authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: ['/', '/project-detail/(.*)']
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};