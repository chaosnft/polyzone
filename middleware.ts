import { NextRequest, NextResponse } from "next/server";

const RESTRICTED_COUNTRIES = ["VN", "KP", "RU", "IR", "SY", "CU", "VE", "BY"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip cho static files, API, hoặc admin
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname === "/admin") {
    return NextResponse.next();
  }

  // Lấy IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? request.ip ?? "unknown";
  if (ip === "unknown") return NextResponse.next();

  // Cache đơn giản cho dev (memory-based, reset khi restart server)
  const cache = new Map<string, { country: string; expires: number }>();
  const CACHE_TTL = 30 * 60 * 1000; // 5 phút

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
    // Fetch geolocation
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!geoRes.ok) {
      // Nếu HTTP error, fallback allow
      console.warn(`Geolocation HTTP error for IP ${ip}: ${geoRes.status}`);
      return NextResponse.next();
    }

    // Đọc as text trước để tránh parse error
    const geoText = await geoRes.text();
    let geoData: any;

    try {
      geoData = JSON.parse(geoText);
    } catch (parseError) {
      // Nếu không parse được (rate limit: "Too many requests"), fallback allow
      console.warn(`Geolocation parse error for IP ${ip}: ${parseError.message}. Likely rate limit.`);
      return NextResponse.next();
    }

    const countryCode = geoData.country_code || geoData.country;

    // Cache kết quả
    cache.set(ip, { country: countryCode, expires: Date.now() + CACHE_TTL });

    if (RESTRICTED_COUNTRIES.includes(countryCode)) {
      const url = request.nextUrl.clone();
      url.pathname = "/geoblocked";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    // Bất kỳ lỗi nào khác (network, etc.), fallback allow
    console.warn(`Geolocation fallback for IP ${ip}: ${error.message}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};