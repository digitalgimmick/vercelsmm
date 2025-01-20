import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GeoHero from '@/components/geo/GeoHero';
import MainUSP from '@/components/home/MainUSP';
import GeoHowItWorks from '@/components/geo/GeoHowItWorks';
import GeoWhyChooseUs from '@/components/geo/GeoWhyChooseUs';
import GeoFAQ from '@/components/geo/GeoFAQ';
import GeoReviews from '@/components/geo/GeoReviews';
import { usePackageStore } from '@/stores/packageStore';
import { useState } from 'react';
import PackageCard from '@/components/home/packages/PackageCard';
import PackageDialog from '@/components/home/packages/PackageDialog';
import TrustScore from '@/components/packages/TrustScore';
import { Info, Check } from 'lucide-react';

export default function SouthAfricaViewsPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { packages } = usePackageStore();
  const navigate = useNavigate();

  const southAfricaPackages = packages.filter(pkg => pkg.region === 'south-africa');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <GeoHero 
        country="South Africa"
        description="Get real, high-retention views from South African viewers. Perfect for targeting the South African market and boosting your channel's presence in Africa."
      />

      <MainUSP />

      <section className="py-20 relative overflow-hidden">
        {/* Animated spot gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your South African Views Package
            </h2>
            <p className="text-xl text-gray-600">
              Get high-retention views from real South African viewers to boost your local audience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {southAfricaPackages.map((pkg) => (
                  <div key={pkg.id} className="relative">
                    <PackageCard
                      package={pkg}
                      onSelect={handleSelectPackage}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl p-6 bg-white/60 backdrop-blur-lg border border-gray-100 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-outfit text-lg font-semibold">Why South African Views?</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-inter text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    100% Real South African viewers
                  </li>
                  <li className="flex items-center gap-2 font-inter text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    Higher engagement rates
                  </li>
                  <li className="flex items-center gap-2 font-inter text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    Improved African rankings
                  </li>
                  <li className="flex items-center gap-2 font-inter text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    Better monetization potential
                  </li>
                  <li className="flex items-center gap-2 font-inter text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    Location-verified traffic
                  </li>
                  <li className="flex items-center gap-2 font-inter text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500" />
                    Natural delivery pattern
                  </li>
                </ul>
                <TrustScore />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PackageDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedPackage(null);
        }}
        packageId={selectedPackage}
      />

      <GeoHowItWorks 
        country="South Africa"
        steps={[
          {
            title: "Choose Your Package",
            description: "Select a South African views package that matches your goals"
          },
          {
            title: "Provide Video URL",
            description: "Enter your YouTube video URL - no password needed"
          },
          {
            title: "South African Targeting",
            description: "Our system targets real viewers from across South Africa"
          },
          {
            title: "Track Progress",
            description: "Monitor your South African audience growth in real-time"
          }
        ]}
      />

      <GeoReviews country="South Africa" />

      <GeoWhyChooseUs country="South Africa" />
      
      <GeoFAQ 
        country="South Africa"
        faqs={[
          {
            question: "How do you ensure views are from South Africa?",
            answer: "We use advanced geo-targeting technology to ensure all views come from real users within South Africa, verified through IP addresses and location data."
          },
          {
            question: "Will this help my South African rankings?",
            answer: "Yes! Getting views from South African viewers helps improve your video's visibility and rankings specifically in the South African market."
          },
          {
            question: "Can I target specific South African regions?",
            answer: "No, we currently only offer country-level targeting for all of South Africa. Views will come from across the country."
          },
          {
            question: "Are these views monetizable?",
            answer: "Yes, our South African views come from real users and comply with YouTube's monetization policies. They can contribute to your channel's revenue."
          },
          {
            question: "How fast are views delivered?",
            answer: "We deliver South African views gradually over time to maintain natural growth patterns, typically starting within 24-48 hours of order confirmation."
          }
        ]}
      />
    </div>
  );
}
