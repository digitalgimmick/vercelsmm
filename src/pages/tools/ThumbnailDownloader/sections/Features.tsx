import ToolFeatures from '@/components/tools/sections/ToolFeatures';
import { Image, Download, Zap } from 'lucide-react';

export default function Features() {
  return (
    <ToolFeatures
      title="Powerful Thumbnail Features"
      description="Everything you need to download and save YouTube video thumbnails"
      features={[
        {
          icon: Image,
          title: 'Multiple Resolutions',
          description: 'Download thumbnails in various qualities from default to max resolution'
        },
        {
          icon: Download,
          title: 'Instant Download',
          description: 'Get your thumbnails immediately with one-click download'
        },
        {
          icon: Zap,
          title: 'Fast & Free',
          description: 'No registration required, completely free to use'
        }
      ]}
    />
  );
}
