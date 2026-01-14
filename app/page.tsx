import HeroSection from '@/components/sections/Hero';
import NewsTicker from '@/components/sections/NewsTicker';
import ImpactStats from '@/components/sections/ImpactStats';
import Collegeabout from '@/components/sections/Collegeabout';
import PrincipalMessage from '@/components/sections/PrincipalMessage';
import DepartmentsBanner from '@/components/sections/DepartmentsBanner';
import ScholarshipBanner from '@/components/banner/Scholarshipbanner';
import ProgramsSection from '@/components/sections/Programs';
import NewsSection from '@/components/sections/NewsSection';
import BlogSection from '@/components/sections/BlogSection';
import { client } from "@/sanity/lib/client";
import { latestBlogsQuery } from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const newsQuery = `*[_type == "news"] | order(publishedAt desc) [0...10]`;
  const [news, blogs] = await Promise.all([
    client.fetch(newsQuery),
    client.fetch(latestBlogsQuery)
  ]);

  return (
    <>
      <HeroSection />
      <NewsTicker />
      <ScholarshipBanner />
      <PrincipalMessage />
      <Collegeabout />
      <ImpactStats />
      <ProgramsSection />
      <DepartmentsBanner />
      <NewsSection news={news} />
      <BlogSection blogs={blogs} />
    </>
  );
}