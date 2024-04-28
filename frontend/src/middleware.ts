import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTPayload, jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token");

	// Definir la ruta protegida
	const protectedPath = "/home";

	// Solo aplica middleware si la solicitud es para la ruta protegida
	if (request.nextUrl.pathname.startsWith(protectedPath)) {
		if (!token) {
			// No hay token presente, redirigir al usuario para iniciar sesión
			return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
		}

		try {
			// Intenta verificar el token
			const decodedToken = (await jwtVerify(token.value, new TextEncoder().encode((process.env.JWT_SECRET as string) || "secret"))) as unknown as JWTPayload & { exp?: number };
			if (decodedToken) {
				const now = Date.now() / 1000;
				if (decodedToken.exp && now > decodedToken.exp) {
					return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
				}
				return NextResponse.next();
			} else {
				return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
			}
		} catch (error) {
			// Error en la verificación del token, redirigir para iniciar sesión
			return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
		}
	}

	// Si no es la ruta protegida, continúa con normalidad
	return NextResponse.next();
}

export const config = {
	matcher: ["/home/:path*"],
};
