import { Hero } from "@/components/Hero";
import { FeaturesBar } from "@/components/FeaturesBar";
import { ProductSection } from "@/components/ProductSection";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesBar />
      <ProductSection limit={8} title="Top.Products" showFilters={false} />
      <AboutSection />
    </main>
  );
}


