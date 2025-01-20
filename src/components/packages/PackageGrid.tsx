import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/lib/utils';
import { usePackageStore } from '@/stores/packageStore';
import { Check } from 'lucide-react';

interface PackageGridProps {
  type: 'worldwide' | 'geo';
  region?: string;
  showCategories?: boolean;
}

export default function PackageGrid({ type, region, showCategories = true }: PackageGridProps) {
  const navigate = useNavigate();
  const { packages } = usePackageStore();
  const [category, setCategory] = useState<'regular' | 'premium'>('regular');

  const filteredPackages = packages.filter(pkg => {
    const matchesType = pkg.type === type;
    const matchesRegion = !region || pkg.region === region;
    const matchesCategory = showCategories ? pkg.category === category : true;
    return matchesType && matchesRegion && matchesCategory;
  });

  const handleSelectPackage = (packageId: string) => {
    navigate(`/order?package=${packageId}`);
  };

  const features = [
      'High Quality Views',
      'No Password Required',
      'Instant Start',
      '24/7 Support',
      'Money Back Guarantee'
  ];

  return (
    <div>
      {showCategories ? (
        <Tabs defaultValue="regular" onValueChange={(value) => setCategory(value as 'regular' | 'premium')}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="regular" className="px-8 py-3">Regular Views</TabsTrigger>
              <TabsTrigger value="premium" className="px-8 py-3">Premium Views</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="regular">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} package={pkg} features={features} onSelect={handleSelectPackage} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="premium">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} package={pkg} features={features} onSelect={handleSelectPackage} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} package={pkg} features={features} onSelect={handleSelectPackage} />
          ))}
        </div>
      )}
    </div>
  );
}

interface PackageCardProps {
  package: Package;
  features: string[];
  onSelect: (id: string) => void;
}

function PackageCard({ package: pkg, features, onSelect }: PackageCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="text-center bg-gradient-to-b from-gray-50 to-white">
        <CardTitle className="font-outfit text-2xl">{pkg.name}</CardTitle>
        <div className="font-outfit text-4xl font-bold text-red-500 mt-4">
          {formatPrice(pkg.price)}
        </div>
        {pkg.discount && (
          <div className="text-sm text-green-600 mt-1">Save {pkg.discount}% OFF</div>
        )}
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="font-outfit text-lg mb-4">{pkg.viewCount.toLocaleString()} Views</div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center font-inter text-gray-600">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 font-inter" 
          onClick={() => onSelect(pkg.id)}
        >
          Select Package
        </Button>
      </CardFooter>
    </Card>
  );
}
