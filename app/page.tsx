// app/page.tsx (Minor update: Ensure Header is present, but already is)
import { getArticles } from '@/lib/api';
import Header from '@/components/Header';
import FeaturedHotSection from '@/components/FeaturedHotSection';
import FeaturedNewsSection from '@/components/FeaturedNewsSection';
import TopicFilterSection from '@/components/TopicFilterSection';
import EmailSubscriptionSection from '@/components/EmailSubscriptionSection';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';

export const revalidate = 60;

export default async function Home() {
  const articles = await getArticles({ limit: 20 });

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Header />
      <FeaturedHotSection articles={articles} />
      <FeaturedNewsSection articles={articles} />
      <AboutSection />
      <TopicFilterSection articles={articles} />
      <EmailSubscriptionSection />
      <Footer />
    </div>
  );
}