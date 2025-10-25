// lib/api.ts
const STRAPI_URL = process.env.STRAPI_URL || "https://worthy-candy-912dcff36f.strapiapp.com";
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
  if (!STRAPI_API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN is not defined in .env");
    throw new Error("STRAPI_API_TOKEN is required");
  }

  try {
    const query = new URLSearchParams({
      populate: "*",
      ...(params.category && { "filters[category][$eq]": params.category }),
      ...(params.topic && { "filters[topic][$eq]": params.topic }),
      "sort[0]": "date:desc",
      "pagination[limit]": params.limit?.toString() || "20",
    });

    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch articles:", res.status, res.statusText);
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];

    const locale = "en-US";

    return data
      .map((item: any) => ({
        id: item.id,
        title: item.attributes?.title || "Untitled",
        excerpt: item.attributes?.excerpt || "",
        category: item.attributes?.category || "hot",
        topic: item.attributes?.topic || "",
        tags: item.attributes?.tags?.data?.map((tag: any) => tag.attributes.name) || [],
        image: item.attributes?.image?.data
          ? `${STRAPI_URL}${item.attributes.image.data.attributes.url}`
          : "/placeholder.svg?height=600&width=800",
        date: item.attributes?.date
          ? new Intl.DateTimeFormat(locale, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(item.attributes.date))
          : "Just now",
        author: item.attributes?.author || "Anonymous",
        readTime: item.attributes?.readTime || "1 min",
        slug: item.attributes?.slug || "",
        content: item.attributes?.content || "",
      }))
      .filter((article) => article.slug);
  } catch (error) {
    console.error("🔥 Error in getArticles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  if (!slug) {
    throw new Error("Slug is required");
  }
  if (!STRAPI_API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN is not defined in .env");
    throw new Error("STRAPI_API_TOKEN is required");
  }

  try {
    const query = new URLSearchParams({
      "filters[slug][$eq]": slug,
      populate: "*",
    });

    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
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
    const locale = "en-US";

    return {
      id: item.id,
      title: item.attributes?.title || "Untitled",
      excerpt: item.attributes?.excerpt || "",
      category: item.attributes?.category || "hot",
      topic: item.attributes?.topic || "",
      tags: item.attributes?.tags?.data?.map((tag: any) => tag.attributes.name) || [],
      image: item.attributes?.image?.data
        ? `${STRAPI_URL}${item.attributes.image.data.attributes.url}`
        : "/placeholder.svg?height=600&width=800",
      date: item.attributes?.date
        ? new Intl.DateTimeFormat(locale, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date(item.attributes.date))
        : "Just now",
      author: item.attributes?.author || "Anonymous",
      readTime: item.attributes?.readTime || "1 min",
      slug: item.attributes?.slug || "",
      content: item.attributes?.content || "",
    };
  } catch (error) {
    console.error("🔥 Error in getArticleBySlug:", error);
    throw error;
  }
}