import { NextRequest, NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

function middleware(req: NextRequest) {
	if (req.nextUrl.pathname) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

export default withAuth(middleware, ["/profile"]);

export const config = {
	matcher: ["/profile/:path*"],
};
