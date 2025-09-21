import { auth as middleware } from "@/lib/auth";
import { NextResponse } from "next/server";
export default middleware((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  } else if (req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
