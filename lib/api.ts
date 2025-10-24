// lib/api.ts (Fixed: Removed client-side Cookies from server functions; use fixed 'en-US' locale for date formatting on server. Client-side can override if needed via re-render.)
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface Article {
  id: number;
  title: string;
  excerpt: string | null;
  category: string;
  topic: string;
  image: string | null;
  date: string;
  author: string;
  readTime: string;
  slug: string;
  content?: string;
  tags?: string[];
}

export async function getArticles(
  params: { category?: string; topic?: string; limit?: number } = {}
): Promise<Article[]> {
  try {
    const query = new URLSearchParams({
      populate: "*",
      ...(params.category && { "filters[category][$eq]": params.category }),
      ...(params.topic && { "filters[topic][$eq]": params.topic }),
      "sort[0]": "date:desc",
      "pagination[limit]": params.limit?.toString() || "20",
    });

    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
        : {},
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch articles:", res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];

    // Use fixed 'en-US' locale for server-side date formatting (client can reformat if needed)
    const locale = 'en-US';

    return data
      .map((item: any) => ({
        id: item.id,
        title: item.title || "Untitled",
        excerpt: item.excerpt || "",
        category: item.category || "hot",
        topic: item.topic || "",
        tags: item.tags || [],
        image: item.image
          ? `${STRAPI_URL}${item.image?.url || ""}`
          : "/placeholder.svg?height=600&width=800",
        date: item.date
          ? new Intl.DateTimeFormat(locale, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(item.date))
          : "Just now",
        author: item.author || "Anonymous",
        readTime: item.readTime || "1 min",
        slug: item.slug || "",
        content: item.content || "",
      }))
      .filter((article) => article.slug); // Lọc bỏ bài không có slug
  } catch (error) {
    console.error("🔥 Error in getArticles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  if (!slug) {
    throw new Error("Slug is required");
  }
  try {
    const query = new URLSearchParams({
      "filters[slug][$eq]": slug,
      populate: "*",
    });

    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
        : {},
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];

    if (!data.length) {
      throw new Error("Article not found");
    }

    const item = data[0];
    // Use fixed 'en-US' locale for server-side date formatting
    const locale = 'en-US';

    return {
      id: item.id,
      title: item.title || "Untitled",
      excerpt: item.excerpt || "",
      category: item.category || "hot",
      topic: item.topic || "",
      tags: item.tags || [],
      image: item.image
        ? `${STRAPI_URL}${item.image?.url || ""}`
        : "/placeholder.svg?height=600&width=800",
      date: item.date
        ? new Intl.DateTimeFormat(locale, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date(item.date))
        : "Just now",
      author: item.author || "Anonymous",
      readTime: item.readTime || "1 min",
      slug: item.slug || "",
      content: item.content || "",
    };
  } catch (error) {
    console.error("🔥 Error in getArticleBySlug:", error);
    throw error;
  }
}