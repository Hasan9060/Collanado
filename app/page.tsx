import HeroSection from '@/components/sections/Hero';
import Collegeabout from '@/components/sections/Collegeabout';
import ScholarshipBanner from '@/components/banner/Scholarshipbanner';
import ProgramsSection from '@/components/sections/Programs';
import NewsSection from '@/components/sections/NewsSection';
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const query = `*[_type == "news"] | order(publishedAt desc) [0...10]`;
  const news = await client.fetch(query);

  return (
    <>
      <HeroSection />
      <ScholarshipBanner />
      <Collegeabout />
      <ProgramsSection />
      <NewsSection news={news} />
    </>
  );
}