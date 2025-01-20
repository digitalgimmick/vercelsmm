import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: BarChart2,
    title: 'Comprehensive Analytics',
    description: 'Get detailed insights into views, likes, comments, and engagement rates'
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Monitor video performance and growth over time'
  },
  {
    icon: Users,
    title: 'Engagement Metrics',
    description: 'Analyze viewer engagement and interaction patterns'
  }
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-outfit">
            Powerful Analytics Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-inter">
            Everything you need to analyze and understand your YouTube video performance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative group">
                <div className="h-full p-8 rounded-2xl glass-card border border-white/10
                               hover:border-red-500/20 transition-all duration-300">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-14 h-14 
                                  rounded-xl bg-red-500/10 text-red-400 mb-6
                                  group-hover:scale-110 group-hover:bg-red-500/20 
                                  transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    
                    <h3 className="font-outfit text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="font-inter text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
