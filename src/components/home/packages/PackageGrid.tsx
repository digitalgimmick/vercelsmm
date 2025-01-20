import { useState } from 'react';
import PackageCard from './PackageCard';
import PackageDialog from './PackageDialog';
import { usePackageStore } from '@/stores/packageStore';
import { useNavigate } from 'react-router-dom';

interface PackageGridProps {
  type: 'worldwide' | 'geo';
  category: 'regular' | 'premium';
  region?: string;
}

export default function PackageGrid({ type, category, region }: PackageGridProps) {
  const navigate = useNavigate();
  const { packages } = usePackageStore();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPackages = packages.filter(pkg => {
    const matchesType = pkg.type === type;
    const matchesRegion = !region || pkg.region === region;
    const matchesCategory = pkg.category === category;
    return matchesType && matchesRegion && matchesCategory;
  });

  const handleSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            package={pkg}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <PackageDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedPackage(null);
        }}
        packageId={selectedPackage}
      />
    </>
  );
}
