import { NextRequest, NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

function middleware(req: NextRequest) {
	if (req.nextUrl.pathname) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export default withAuth(middleware, ["/profile", "/admin", "/editor"]);

export const config = {
	matcher: ["/profile/:path*", "/admin/:path*", "/editor/:path*"],
};
