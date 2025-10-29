// lib/api.ts
const MICROCMS_URL = `https://${process.env.MICROCMS_SERVICE_ID}.microcms.io/api/v1/articles`;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;

export interface Article {
  id: string;
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
  // source?: string;
}

export async function getArticles(
  params: { category?: string; topic?: string; limit?: number; offset?: number } = {}
): Promise<Article[]> {
  if (!MICROCMS_API_KEY || !process.env.MICROCMS_SERVICE_ID) {
    console.error("❌ MICROCMS_API_KEY or SERVICE_ID is not defined in .env");
    throw new Error("MICROCMS credentials required");
  }

  try {
    const query = new URLSearchParams({
      limit: params.limit?.toString() || "20",
      offset: params.offset?.toString() || "0", // Added offset support
      orders: "-date",
      fields: "id,title,excerpt,category,topic,tags,image,date,author,readTime,slug,content",
    });

    const filters: string[] = [];
    if (params.category) filters.push(`category[contains]${params.category}`);
    if (params.topic) filters.push(`topic[contains]${params.topic}`);
    if (filters.length) query.append("filters", filters.join("[and]"));

    const res = await fetch(`${MICROCMS_URL}?${query.toString()}`, {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch articles:", res.status, res.statusText);
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data = json.contents || [];

    const locale = "en-US";
    return data.map((item: any) => ({
      id: item.id,
      title: item.title || "Untitled",
      excerpt: item.excerpt || "",
      category: Array.isArray(item.category) ? item.category[0] || "hot" : item.category || "hot",
      topic: Array.isArray(item.topic) ? item.topic[0] || "" : item.topic || "",
      tags: Array.isArray(item.tags) ? item.tags : [],
      image: item.image?.url || "/images/default-article.png",
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
      // source: item.source || "", 
    }));
  } catch (error) {
    console.error("🔥 Error in getArticles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  if (!slug) {
    throw new Error("Slug is required");
  }
  if (!MICROCMS_API_KEY || !process.env.MICROCMS_SERVICE_ID) {
    console.error("❌ MICROCMS_API_KEY or SERVICE_ID is not defined in .env");
    throw new Error("MICROCMS credentials required");
  }

  try {
    const query = new URLSearchParams({
      filters: `slug[equals]${slug}`,
      limit: "1",
      fields: "id,title,excerpt,category,topic,tags,image,date,author,readTime,slug,content",
    });

    const res = await fetch(`${MICROCMS_URL}?${query.toString()}`, {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY,
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data = json.contents || [];
    if (!data.length) {
      throw new Error("Article not found");
    }

    const item = data[0];
    const locale = "en-US";
    return {
      id: item.id,
      title: item.title || "Untitled",
      excerpt: item.excerpt || "",
      category: Array.isArray(item.category) ? item.category[0] || "hot" : item.category || "hot",
      topic: Array.isArray(item.topic) ? item.topic[0] || "" : item.topic || "",
      tags: Array.isArray(item.tags) ? item.tags : [],
      image: item.image?.url || "/images/default-article.png",
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
      // source: item.source || "", 
    };
  } catch (error) {
    console.error("🔥 Error in getArticleBySlug:", error);
    throw error;
  }
}