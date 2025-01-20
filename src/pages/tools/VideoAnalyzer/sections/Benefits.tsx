import { TrendingUp, Target, Shield, Zap, BarChart2, Users, Clock, Brain, Youtube, Search, ThumbsUp, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: BarChart2,
    title: 'Comprehensive Analytics',
    description: 'Get detailed insights into views, likes, comments, and engagement rates',
    color: 'red',
    diagram: (
      <svg className="absolute bottom-4 right-4 w-24 h-24 text-red-100" viewBox="0 0 100 100">
        <path d="M10 90 L10 40 L30 60 L50 20 L70 50 L90 10" 
              className="stroke-current" 
              fill="none" 
              strokeWidth="4"
              strokeLinecap="round" />
        <circle cx="30" cy="60" r="3" className="fill-red-200" />
        <circle cx="50" cy="20" r="3" className="fill-red-200" />
        <circle cx="70" cy="50" r="3" className="fill-red-200" />
      </svg>
    )
  },
  {
    icon: Brain,
    title: 'Smart Insights',
    description: 'Get intelligent recommendations based on video performance metrics',
    color: 'blue',
    diagram: null
  },
  {
    icon: Youtube,
    title: 'Channel Growth',
    description: 'Track your channel\'s growth and performance over time',
    color: 'purple',
    diagram: null
  },
  {
    icon: Users,
    title: 'Audience Insights',
    description: 'Understand your viewer demographics and engagement patterns',
    color: 'green',
    diagram: (
      <svg className="absolute bottom-4 right-4 w-32 h-32 text-green-100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" className="fill-current opacity-20" />
        <circle cx="50" cy="50" r="35" className="fill-current opacity-30" />
        <circle cx="50" cy="50" r="30" className="fill-current opacity-40" />
        <circle cx="50" cy="50" r="25" className="fill-current opacity-50" />
        <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10"
              className="stroke-current"
              fill="none"
              strokeWidth="2"
              strokeDasharray="4 2" />
      </svg>
    )
  },
  {
    icon: Search,
    title: 'SEO Analysis',
    description: 'Optimize your video titles, descriptions, and tags for better visibility',
    color: 'orange',
    diagram: null
  },
  {
    icon: Clock,
    title: 'Real-time Data',
    description: 'Access up-to-the-minute statistics and performance metrics',
    color: 'indigo',
    diagram: null
  },
  {
    icon: MessageCircle,
    title: 'Community Insights',
    description: 'Analyze comments and community engagement patterns',
    color: 'pink',
    diagram: (
      <svg className="absolute bottom-4 right-4 w-32 h-32 text-pink-100" viewBox="0 0 100 100">
        <path d="M20 80 C20 50, 50 50, 80 50 C50 50, 50 20, 50 20"
              className="stroke-current"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round" />
        <circle cx="20" cy="80" r="4" className="fill-pink-200" />
        <circle cx="50" cy="20" r="4" className="fill-pink-200" />
        <circle cx="80" cy="50" r="4" className="fill-pink-200" />
        <path d="M30 65 C30 65, 50 65, 70 65"
              className="stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="3 3" />
      </svg>
    )
  }
];

export default function Benefits() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 mb-6">
            <Shield className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-red-600 font-medium">Why Choose Us</span>
          </div>
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            Benefits of Using Our Tool
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock powerful insights and grow your YouTube channel with our analytics tool
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`row-span-1 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-6
                         hover:shadow-lg transition-all duration-300 group
                         ${i === 3 || i === 6 ? "col-span-2" : ""}`}
            >
              {/* Card inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 via-white/25 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-full flex flex-col overflow-hidden">
                <div className={`inline-flex items-center justify-center w-12 h-12 
                                rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110
                                ${getIconBackground(benefit.color)}`}>
                  <benefit.icon className={`h-6 w-6 ${getIconColor(benefit.color)}`} />
                </div>
                
                <h3 className="font-outfit text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                
                <p className="font-inter text-sm text-gray-600 line-clamp-2">
                  {benefit.description}
                </p>
                {/* SVG Diagrams for larger cards */}
                {(i === 3 || i === 6) && benefit.diagram && (
                  <div className="absolute right-0 bottom-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    {benefit.diagram}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getIconBackground(color: string) {
  const backgrounds = {
    red: 'bg-red-50 group-hover:bg-red-100/80',
    blue: 'bg-blue-50 group-hover:bg-blue-100/80',
    green: 'bg-green-50 group-hover:bg-green-100/80',
    purple: 'bg-purple-50 group-hover:bg-purple-100/80',
    orange: 'bg-orange-50 group-hover:bg-orange-100/80',
    indigo: 'bg-indigo-50 group-hover:bg-indigo-100/80',
    pink: 'bg-pink-50 group-hover:bg-pink-100/80'
  };
  return backgrounds[color as keyof typeof backgrounds];
}

function getIconColor(color: string) {
  const colors = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    indigo: 'text-indigo-500',
    pink: 'text-pink-500'
  };
  return colors[color as keyof typeof colors];
}
