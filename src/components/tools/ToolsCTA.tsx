import { ArrowRight, Youtube, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ToolsCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-8">
            <Youtube className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-400 font-medium tracking-wide">
              Trusted by 100K+ YouTubers
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-outfit">
            Ready to Grow Your
            <span className="block gradient-text font-extrabold mt-2">
              YouTube Channel?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 font-inter font-light leading-relaxed">
            We help YouTubers grow their views through programmatic ads that bring real users 
            to watch their videos. Start growing your channel today!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium tracking-wide px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-red-500/20 hover:bg-red-500/10 hover:text-red-400 text-red-400 font-medium tracking-wide px-8"
            >
              Watch Demo
              <Play className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">50Bn+</div>
              <div className="text-sm text-gray-400">Views Delivered</div>
            </div>
            <div className="glass-card px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">100K+</div>
              <div className="text-sm text-gray-400">Happy Creators</div>
            </div>
            <div className="glass-card px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">99%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="glass-card px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
