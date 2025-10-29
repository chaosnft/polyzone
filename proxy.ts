import { NextRequest, NextResponse } from "next/server";

const RESTRICTED_COUNTRIES = ["KP", "RU", "IR", "SY", "CU", "VE", "BY"];

// Global cache (memory-based)
const cache = new Map<string, { country: string; expires: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 phút

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname === "/admin") {
    return NextResponse.next();
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.ip ?? "unknown";
  if (ip === "unknown") return NextResponse.next();

  const cached = cache.get(ip);
  if (cached && Date.now() < cached.expires) {
    const { country } = cached;
    if (RESTRICTED_COUNTRIES.includes(country)) {
      const url = request.nextUrl.clone();
      url.pathname = "/geoblocked";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { "User-Agent": "Polyzone-Geoblock/1.0" },
    });

    if (!geoRes.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Geolocation HTTP error for IP ${ip}: ${geoRes.status}`);
      }
      return NextResponse.next();
    }

    const geoText = await geoRes.text();
    let geoData: any;

    try {
      geoData = JSON.parse(geoText);
    } catch (parseError) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Geolocation parse error for IP ${ip}: ${parseError.message}. Likely rate limit.`);
      }
      return NextResponse.next();
    }

    const countryCode = geoData.country_code || geoData.country;
    if (!countryCode) {
      return NextResponse.next();
    }

    cache.set(ip, { country: countryCode, expires: Date.now() + CACHE_TTL });

    if (RESTRICTED_COUNTRIES.includes(countryCode)) {
      const url = request.nextUrl.clone();
      url.pathname = "/geoblocked";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Geolocation fallback for IP ${ip}: ${error.message}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};