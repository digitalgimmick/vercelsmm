import { BarChart2, Wand2, TrendingUp, Share2, Tag, Clock, Megaphone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const allTools = [
  {
    id: 'video-analyzer',
    icon: BarChart2,
    name: "Video Analyzer",
    description: "Get detailed analytics and insights for any YouTube video",
    path: "/tools/video-analyzer",
    color: "red"
  },
  {
    icon: Wand2,
    name: "Thumbnail Generator",
    description: "Create eye-catching thumbnails that drive more clicks",
    status: "Coming Soon",
    color: "purple"
  },
  {
    icon: TrendingUp,
    name: "Keyword Research",
    description: "Find high-performing keywords for better video visibility",
    status: "Coming Soon",
    color: "blue"
  },
  {
    icon: Share2,
    name: "Social Share Tracker",
    description: "Track your video's social media performance",
    status: "Coming Soon",
    color: "green"
  },
  {
    icon: Tag,
    name: "Tag Generator",
    description: "Generate optimized tags for better video discoverability",
    status: "Coming Soon",
    color: "orange"
  },
  {
    icon: Clock,
    name: "Upload Time Optimizer",
    description: "Find the best times to upload for maximum engagement",
    status: "Coming Soon",
    color: "indigo"
  }
];

export default function RelatedTools() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Filter out the current tool
  const otherTools = allTools.filter(tool => !tool.path || tool.path !== currentPath);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 mb-6">
            <BarChart2 className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-600 font-medium">More Tools</span>
          </div>
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            Related Tools
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our suite of YouTube growth tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherTools.map((tool, index) => (
            <div key={index} className="relative group">
              <div className="h-full p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100
                            hover:shadow-lg transition-all duration-300">
                <div className="absolute top-4 right-4">
                  {tool.path ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 
                                rounded-xl bg-${tool.color}-50 text-${tool.color}-500
                                group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-outfit text-lg font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                {tool.path ? (
                  <Link 
                    to={tool.path}
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Try Now
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ) : (
                  <button 
                    disabled
                    className="inline-flex items-center text-sm font-medium text-gray-400 cursor-not-allowed"
                  >
                    Coming Soon
                    <svg className="w-4 h-4 ml-1 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
