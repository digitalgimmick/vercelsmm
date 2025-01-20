import ToolHowToUse from '@/components/tools/sections/ToolHowToUse';
import { Link, Image, Download, Eye } from 'lucide-react';

export default function HowToUse() {
  return (
    <ToolHowToUse
      title="How It Works"
      description="Download YouTube thumbnails in just a few simple steps"
      steps={[
        {
          icon: Link,
          title: "Enter Video URL",
          description: "Paste your YouTube video URL into the input field"
        },
        {
          icon: Image,
          title: "Get Thumbnails",
          description: "View thumbnails in different resolutions"
        },
        {
          icon: Eye,
          title: "Preview Quality",
          description: "Preview each thumbnail quality before downloading"
        },
        {
          icon: Download,
          title: "Download",
          description: "Choose your preferred quality and download"
        }
      ]}
    />
  );
}
