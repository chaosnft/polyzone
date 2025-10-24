import { getArticles } from '@/lib/api';
import Header from '@/components/Header';
import FeaturedHotSection from '@/components/FeaturedHotSection';
import FeaturedNewsSection from '@/components/FeaturedNewsSection';
import TopicFilterSection from '@/components/TopicFilterSection';
import EmailSubscriptionSection from '@/components/EmailSubscriptionSection';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection'; // Bổ sung section About

export const revalidate = 60; // ISR: Revalidate mỗi 60 giây cho tin tức mới

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Header />
      <FeaturedHotSection articles={articles} />
      <FeaturedNewsSection articles={articles} />
      <AboutSection /> {/* Bổ sung để match nav #about */}
      <TopicFilterSection articles={articles} />
      <EmailSubscriptionSection />
      <Footer />
    </div>
  );
}