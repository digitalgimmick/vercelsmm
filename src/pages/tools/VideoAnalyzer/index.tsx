import Features from './sections/Features';
import HowToUse from './sections/HowToUse';
import Benefits from './sections/Benefits';
import FAQ from './sections/FAQ';
import RelatedTools from './sections/RelatedTools';
import ToolsCTA from '@/components/tools/ToolsCTA';
import Hero from './sections/Hero';

export default function VideoAnalyzer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Hero />
      <Features />
      <HowToUse />
      <Benefits />
      <FAQ />
      <RelatedTools />
      <ToolsCTA />
    </div>
  );
}
