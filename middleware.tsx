import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleWare(req) {
    console.log(req.nextUrl.pathname);
    console.log(req?.nextauth?.token?.role);

    if (
      req.nextUrl.pathname.startsWith("/write") &&
      req?.nextauth?.token?.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/write/new", "/write/:id/:path"],
};
