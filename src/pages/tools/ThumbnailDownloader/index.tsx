import ToolLayout from '@/components/tools/ToolLayout';
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowToUse from './sections/HowToUse';
import Benefits from './sections/Benefits';
import FAQ from './sections/FAQ';

export default function ThumbnailDownloader() {
  return (
    <ToolLayout>
      <Hero />
      <Features />
      <HowToUse />
      <Benefits />
      <FAQ />
    </ToolLayout>
  );
}
