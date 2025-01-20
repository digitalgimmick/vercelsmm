import { BarChart2, Youtube, ThumbsUp, Eye, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { VideoAnalyzerSkeleton } from '@/components/tools/skeletons/VideoAnalyzerSkeleton';
import { getVideoStats } from '@/lib/youtube';
import { Card } from '@/components/ui/card';

interface VideoStats {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  duration: string;
  tags: string[];
  category: string;
}

interface FloatingIcon {
  icon: React.ElementType;
  color: string;
  size: string;
  animation: string;
}

const floatingIcons = [
  { icon: Youtube, color: 'text-red-500/30', size: 'w-12 h-12', animation: 'animate-float' },
  { icon: ThumbsUp, color: 'text-blue-500/30', size: 'w-8 h-8', animation: 'animate-float animation-delay-2000' },
  { icon: Eye, color: 'text-green-500/30', size: 'w-10 h-10', animation: 'animate-float animation-delay-1000' },
  { icon: TrendingUp, color: 'text-orange-500/30', size: 'w-9 h-9', animation: 'animate-float animation-delay-3000' }
] as const;

function getRandomPosition(index: number) {
  const positions = [
    'top-20 left-20',
    'top-40 right-40',
    'bottom-32 left-1/4',
    'bottom-20 right-1/3'
  ];
  return positions[index] || positions[0];
}

export default function Hero() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<VideoStats | null>(null);
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
      const videoStats = await getVideoStats(videoUrl);
      setStats(videoStats);
      
      toast({
        title: "Analysis Complete",
        description: "Video statistics have been updated",
        variant: "success"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze video';
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map((FloatingIcon, index) => (
          <div
            key={index}
            className={`absolute ${getRandomPosition(index)} ${FloatingIcon.animation}`}
          >
            <FloatingIcon.icon className={`${FloatingIcon.color} ${FloatingIcon.size}`} />
          </div>
        ))}
      </div>

      <div className="relative container max-w-4xl mx-auto px-4 text-center">
        {/* Tool Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent backdrop-blur-sm border border-red-500/10 mb-8">
          <BarChart2 className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-sm text-red-600 font-medium">Free YouTube Analytics Tool</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-outfit">
          YouTube Video Statistics
          <span className="block gradient-text font-extrabold mt-2">Analyzer</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-inter">
          Get detailed analytics and insights for any YouTube video. Track views, engagement, 
          and performance metrics in real-time.
        </p>
        
        {/* Video URL Input */}
        <div className="max-w-2xl mx-auto">
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
                  {isLoading ? 'Analyzing...' : 'Analyze Video'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Text */}
        <p className="text-sm text-gray-500 mt-8">
          Trusted by over 100,000 content creators worldwide
        </p>

        {/* Results Section */}
        {isLoading && <VideoAnalyzerSkeleton />}
        {stats && (
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Video Preview Card */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-[360px] flex-shrink-0">
                  <img 
                    src={stats.thumbnailUrl} 
                    alt={stats.title}
                    className="w-full aspect-video rounded-lg object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {stats.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {stats.channelTitle} • {new Date(stats.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {stats.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stats.tags.slice(0, 5).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        #{tag}
                      </span>
                    ))}
                    {stats.tags.length > 5 && (
                      <span className="text-xs text-gray-500">
                        +{stats.tags.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-50">
                    <Eye className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Views</div>
                    <div className="text-xl font-semibold mt-0.5">
                      {stats.viewCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <ThumbsUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Likes</div>
                    <div className="text-xl font-semibold mt-0.5">
                      {stats.likeCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-50">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Comments</div>
                    <div className="text-xl font-semibold mt-0.5">
                      {stats.commentCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Stats */}
            <Card className="mt-6 p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Video Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Engagement Metrics */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 text-left">Engagement Metrics</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-medium">
                    {((stats.likeCount + stats.commentCount) / stats.viewCount * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Like/View Ratio</span>
                  <span className="font-medium">
                    {(stats.likeCount / stats.viewCount * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Comment/View Ratio</span>
                  <span className="font-medium">
                    {(stats.commentCount / stats.viewCount * 100).toFixed(2)}%
                  </span>
                </div>
                </div>
                
                {/* Video Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 text-left">Video Details</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{formatDuration(stats.duration)}</span>
                  </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Published Date</span>
                  <span className="font-medium">
                    {new Date(stats.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{getCategory(stats.category)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 'Unknown';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  return parts.join(' ');
}

function getCategory(categoryId: string) {
  const categories: { [key: string]: string } = {
    '1': 'Film & Animation',
    '2': 'Autos & Vehicles',
    '10': 'Music',
    '15': 'Pets & Animals',
    '17': 'Sports',
    '19': 'Travel & Events',
    '20': 'Gaming',
    '22': 'People & Blogs',
    '23': 'Comedy',
    '24': 'Entertainment',
    '25': 'News & Politics',
    '26': 'Howto & Style',
    '27': 'Education',
    '28': 'Science & Technology',
    '29': 'Nonprofits & Activism'
  };
  return categories[categoryId] || 'Unknown';
}
