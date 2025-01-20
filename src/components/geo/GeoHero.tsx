import { Flag } from 'lucide-react';

interface GeoHeroProps {
  country: string;
  description: string;
}

export default function GeoHero({ country, description }: GeoHeroProps) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-8">
            <Flag className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-400 font-medium tracking-wide">{country} Targeted Views</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white tracking-tight font-outfit mb-6">
            Buy {country} YouTube Views
            <span className="block gradient-text font-extrabold">High Quality & Real</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-inter font-light leading-relaxed mb-10">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
