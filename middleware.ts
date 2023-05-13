// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/") &&
      req.nextUrl.pathname !== "/select-role" &&
      req.nextauth.token?.role === null &&
      req.nextauth.token!==null
    )
      return NextResponse.redirect(new URL(`/select-role`, req.url));
    if (
        req.nextUrl.pathname.startsWith("/select-role") &&
        req.nextauth.token===null
      )
        return NextResponse.redirect(new URL(`/`, req.url));
    if (
      req.nextUrl.pathname.startsWith("/select-role") &&
      req.nextauth.token?.role !== null
    ){
      if(req.nextauth.token?.role==="freelancer"){
        return NextResponse.redirect(
          new URL(`/best-matches`, req.url)
        );
      }
      return NextResponse.redirect(
        new URL(`/${req.nextauth.token?.role}/dashboard`, req.url)
      );
    }
    if (req.nextUrl.pathname === "/" && req.nextauth.token?.role === "client")
      return NextResponse.redirect(new URL("/client/dashboard", req.url));
    if (
      req.nextUrl.pathname === "/" &&
      req.nextauth.token?.role === "freelancer"
    )
      return NextResponse.redirect(new URL("/best-matches", req.url));
    if (
      req.nextUrl.pathname.startsWith("/client") &&
      req.nextauth.token?.role !== "client"
    )
      return NextResponse.redirect(new URL("/", req.url));
    if (
      req.nextUrl.pathname.startsWith("/freelancer") &&
      req.nextauth.token?.role !== "freelancer"
    )
      return NextResponse.redirect(new URL("/", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

// export const config = {
//   matcher: ["/client/:path*", "/freelancer/:path*","/select-role/:path*"],
// };
