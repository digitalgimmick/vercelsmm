import ToolBenefits from '@/components/tools/sections/ToolBenefits';
import { Image, Download, Zap, Shield, Layout, Palette, Clock } from 'lucide-react';

export default function Benefits() {
  return (
    <ToolBenefits
      title="Benefits of Our Thumbnail Downloader"
      description="Why choose our tool for downloading YouTube thumbnails"
      benefits={[
        {
          icon: Image,
          title: 'High Quality Downloads',
          description: 'Get thumbnails in their original high resolution quality',
          color: 'red',
          diagram: (
            <svg className="absolute bottom-4 right-4 w-24 h-24 text-red-100" viewBox="0 0 100 100">
              <rect x="10" y="10" width="80" height="60" className="stroke-current" fill="none" strokeWidth="4" rx="4" />
              <line x1="10" y1="30" x2="90" y2="30" className="stroke-current" strokeWidth="4" />
            </svg>
          )
        },
        {
          icon: Download,
          title: 'Multiple Resolutions',
          description: 'Choose from various thumbnail sizes and qualities',
          color: 'blue'
        },
        {
          icon: Zap,
          title: 'Instant Results',
          description: 'Get your thumbnails immediately without waiting',
          color: 'green'
        },
        {
          icon: Shield,
          title: 'Safe & Secure',
          description: 'No registration or personal information required',
          color: 'orange',
          diagram: (
            <svg className="absolute bottom-4 right-4 w-32 h-32 text-orange-100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="fill-current opacity-20" />
              <circle cx="50" cy="50" r="35" className="fill-current opacity-30" />
              <circle cx="50" cy="50" r="30" className="fill-current opacity-40" />
            </svg>
          )
        },
        {
          icon: Layout,
          title: 'Clean Interface',
          description: 'User-friendly design for easy thumbnail downloads',
          color: 'purple'
        },
        {
          icon: Palette,
          title: 'Preview Available',
          description: 'Preview thumbnails before downloading them',
          color: 'indigo'
        },
        {
          icon: Clock,
          title: 'Always Available',
          description: '24/7 availability for unlimited downloads',
          color: 'pink',
          diagram: (
            <svg className="absolute bottom-4 right-4 w-32 h-32 text-pink-100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-current" fill="none" strokeWidth="3" />
              <line x1="50" y1="50" x2="50" y2="25" className="stroke-current" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="50" x2="75" y2="50" className="stroke-current" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="50" r="3" className="fill-current" />
            </svg>
          )
        }
      ]}
    />
  );
}
