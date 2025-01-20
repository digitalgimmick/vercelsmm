import { LucideIcon } from 'lucide-react';

interface ToolHeroProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  titleGradient: string;
  description: string;
  children: React.ReactNode;
  floatingIcons?: Array<{
    icon: LucideIcon;
    color: string;
    size: string;
    animation: string;
  }>;
}

function getRandomPosition(index: number) {
  const positions = [
    'top-20 left-20',
    'top-40 right-40',
    'bottom-32 left-1/4',
    'bottom-20 right-1/3'
  ];
  return positions[index] || positions[0];
}

export default function ToolHero({
  icon: Icon,
  badge,
  title,
  titleGradient,
  description,
  children,
  floatingIcons = []
}: ToolHeroProps) {
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
          <Icon className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-sm text-red-600 font-medium">{badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-outfit">
          {title}
          <span className="block gradient-text font-extrabold mt-2">{titleGradient}</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-inter">
          {description}
        </p>
        
        {/* Tool-specific content (input, form, etc) */}
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
