// polyzone/lib/api.ts

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// 🧩 Kiểu dữ liệu bài viết
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
}

// 🧠 Hàm fetch danh sách bài viết
export async function getArticles(
  params: { category?: string; topic?: string } = {}
): Promise<Article[]> {
  try {
    const query = new URLSearchParams({
      populate: '*',
      ...(params.category && { 'filters[category][$eq]': params.category }),
      ...(params.topic && { 'filters[topic][$eq]': params.topic }),
      'sort[0]': 'date:desc',
      'pagination[limit]': '20',
    });

    const res = await fetch(`${STRAPI_URL}/api/articles?${query.toString()}`, {
      headers: STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
        : {},
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('❌ Failed to fetch articles:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title || 'Untitled',
      excerpt: item.excerpt || '',
      category: item.category || 'hot',
      topic: item.topic || '',
      image: item.image
        ? `${STRAPI_URL}${item.image?.url || ''}`
        : '/placeholder.svg?height=600&width=800',
      date: item.date
        ? new Date(item.date)
            .toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })
            .replace(' at ', ' ')
        : 'Just now',
      author: item.author || 'Anonymous',
      readTime: item.readTime || '1 min',
      slug: item.slug || '',
      content: item.content || '',
    }));
  } catch (error) {
    console.error('🔥 Error in getArticles:', error);
    return [];
  }
}

// 🧠 Hàm fetch bài viết đơn theo slug
export async function getArticleBySlug(slug: string): Promise<Article> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
          : {},
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];

    if (!data.length) {
      throw new Error('Article not found');
    }

    const item = data[0];

    return {
      id: item.id,
      title: item.title || 'Untitled',
      excerpt: item.excerpt || '',
      category: item.category || 'hot',
      topic: item.topic || '',
      image: item.image
        ? `${STRAPI_URL}${item.image?.url || ''}`
        : '/placeholder.svg?height=600&width=800',
      date: item.date
        ? new Date(item.date)
            .toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })
            .replace(' at ', ' ')
        : 'Just now',
      author: item.author || 'Anonymous',
      readTime: item.readTime || '1 min',
      slug: item.slug || '',
      content: item.content || '',
    };
  } catch (error) {
    console.error('🔥 Error in getArticleBySlug:', error);
    throw error;
  }
}
