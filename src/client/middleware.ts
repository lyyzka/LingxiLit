import { NextResponse, type NextRequest } from "next/server";

const enabledPaths = [
	"/home",
	"/dashboard",
	"/dashboards",
	"/d/",
	"/telemetry",
	"/agents",
	"/connectors",
	"/organisation",
	"/settings",
	"/onboarding",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (enabledPaths.some((path) => pathname === path || pathname.startsWith(path))) {
		return NextResponse.next();
	}
	return NextResponse.redirect(new URL("/telemetry", request.url));
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
