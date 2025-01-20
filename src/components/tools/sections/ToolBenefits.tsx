import { LucideIcon, Shield } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  diagram?: React.ReactNode;
}

interface ToolBenefitsProps {
  title: string;
  description: string;
  benefits: Benefit[];
}

export default function ToolBenefits({ title, description, benefits }: ToolBenefitsProps) {
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
            {title}
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
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
