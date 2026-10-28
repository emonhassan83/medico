import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];

const roleBasedPrivateRoutes = {
  PATIENT: [/^\/patient/],
  DOCTOR: [/^\/doctor/],
  ADMIN: [/^\/admin/],
  RECEPTIONIST: [/^\/receptionist/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;

  //* redirect on role based private routes
  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;
  const redirectUrl = role && role?.toLowerCase();

  //* if access token is found then redirect login page
  if (!accessToken) {
    //* access auth-route for unauthorized users
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  //* if access token is exists then access all routes
  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role]; //* get specific role based route
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  //* protected home page routes
  if (pathname === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL(`/${redirectUrl}`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  return NextResponse.redirect(new URL(`/${redirectUrl}`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/admin/:page*",
    "/receptionist/:page*",
    "/doctor/:page*",
    "/patient/:page*",
  ],
};
