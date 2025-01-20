import { useState } from 'react';
import { Image, Youtube, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import ToolHero from '@/components/tools/sections/ToolHero';
import { getVideoThumbnails } from '@/lib/youtube';

interface ThumbnailResult {
  default: string;
  medium: string;
  high: string;
  standard: string;
  maxres: string;
}

const floatingIcons = [
  { icon: Image, color: 'text-red-500/30', size: 'w-12 h-12', animation: 'animate-float' },
  { icon: Download, color: 'text-blue-500/30', size: 'w-8 h-8', animation: 'animate-float animation-delay-2000' },
  { icon: Youtube, color: 'text-green-500/30', size: 'w-10 h-10', animation: 'animate-float animation-delay-1000' }
];

export default function Hero() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube video URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await getVideoThumbnails(videoUrl);
      setThumbnails(result);
      
      toast({
        title: "Success",
        description: "Thumbnails retrieved successfully",
        variant: "success"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get thumbnails';
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: string, quality: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `thumbnail-${quality}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolHero
      icon={Image}
      badge="Free YouTube Thumbnail Downloader"
      title="YouTube Thumbnail"
      titleGradient="Downloader"
      description="Download high-quality thumbnails from any YouTube video in multiple resolutions"
      floatingIcons={floatingIcons}
    >
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Youtube className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="url"
            placeholder="Enter YouTube video URL..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full h-14 pl-12 pr-36 bg-white/80 backdrop-blur-sm border-gray-200 
                      focus:border-red-500 focus:ring-red-500 text-base rounded-xl"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !videoUrl.trim()}
              className="h-11 px-6 bg-red-500 hover:bg-red-600 text-white font-medium text-base rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Get Thumbnails'
              )}
            </Button>
          </div>
        </div>
      </div>

      {thumbnails && (
        <div className="mt-12">
          <div className="space-y-4">
            {Object.entries(thumbnails).map(([quality, url]) => (
              <div 
                key={quality}
                className="relative group rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100
                          hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/25 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center gap-6 p-4">
                  <div className="w-[280px] aspect-video rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={url} 
                      alt={`${quality} quality thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-outfit text-lg font-semibold capitalize">
                        {quality.replace('res', '-res')} Quality
                      </h3>
                      <Button
                        onClick={() => handleDownload(url, quality)}
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        {quality === 'maxres' ? '1280x720' :
                         quality === 'standard' ? '640x480' :
                         quality === 'high' ? '480x360' :
                         quality === 'medium' ? '320x180' :
                         '120x90'}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                        ${quality === 'maxres' ? 'bg-green-50 text-green-700' :
                          quality === 'standard' ? 'bg-blue-50 text-blue-700' :
                          quality === 'high' ? 'bg-purple-50 text-purple-700' :
                          quality === 'medium' ? 'bg-orange-50 text-orange-700' :
                          'bg-gray-50 text-gray-700'}`}
                      >
                        {quality === 'maxres' ? 'HD Quality' :
                         quality === 'standard' ? 'Standard Quality' :
                         quality === 'high' ? 'High Quality' :
                         quality === 'medium' ? 'Medium Quality' :
                         'Preview Quality'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 text-left">
                      {quality === 'maxres' ? 'Best quality available, perfect for editing and high-resolution displays' :
                       quality === 'standard' ? 'Good balance between quality and file size' :
                       quality === 'high' ? 'Suitable for most uses' :
                       quality === 'medium' ? 'Optimized for faster loading' :
                       'Preview thumbnail, smallest file size'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolHero>
  );
}
