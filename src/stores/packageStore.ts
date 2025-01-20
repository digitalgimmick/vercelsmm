import { create } from 'zustand';
import type { Package } from '@/types';
import { allPackages } from '@/data/packages';

interface PackageStore {
  packages: Package[];
  getPackageById: (id: string) => Package | null;
  updatePackage: (id: string, updates: Partial<Package>) => void;
  bulkUpdatePrices: (categoryId: string, priceMultiplier: number) => void;
  bulkUpdateDiscounts: (categoryId: string, discount: number) => void;
}

export const usePackageStore = create<PackageStore>((set, get) => ({
  packages: allPackages,
  
  getPackageById: (id: string) => {
    return get().packages.find(pkg => pkg.id === id) ?? null;
  },

  updatePackage: (id: string, updates: Partial<Package>) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.id === id ? { ...pkg, ...updates } : pkg
    )
  })),

  bulkUpdatePrices: (categoryId: string, multiplier: number) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.category === categoryId 
        ? { ...pkg, price: pkg.price * multiplier }
        : pkg
    )
  })),

  bulkUpdateDiscounts: (categoryId: string, discount: number) => set((state) => ({
    packages: state.packages.map((pkg) => 
      pkg.category === categoryId 
        ? { ...pkg, discount }
        : pkg
    )
  }))
}));
