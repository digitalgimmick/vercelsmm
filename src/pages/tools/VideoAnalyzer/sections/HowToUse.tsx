import { Package, Link, CreditCard, BarChart2 } from 'lucide-react';

const steps = [
  {
    icon: Link,
    title: "Copy Video URL",
    description: "Copy any public YouTube video URL that you want to analyze"
  },
  {
    icon: Package,
    title: "Paste URL",
    description: "Enter the video URL into the analyzer - no login needed"
  },
  {
    icon: CreditCard,
    title: "Click Analyze",
    description: "Start the analysis process with a single click"
  },
  {
    icon: BarChart2,
    title: "View Results",
    description: "See detailed video analytics and performance metrics"
  }
];

export default function HowToUse() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with our video analyzer in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecting lines */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-[60%] w-full h-px bg-gradient-to-r from-red-200/60 to-transparent"></div>
              )}
              
              {/* Step card */}
              <div className="relative flex flex-col items-center">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md
                              flex items-center justify-center font-outfit font-bold text-red-500 z-10">
                  {index + 1}
                </div>

                {/* Card with glass effect */}
                <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg
                              group-hover:bg-white/80 transition-all duration-500 p-6">
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Gradient background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 opacity-20 
                                  group-hover:opacity-30 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <step.icon className="h-12 w-12 text-red-500 mb-4 relative z-10 
                                      transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="font-outfit text-lg font-semibold text-gray-900 text-center mb-2 relative z-10">
                      {step.title}
                    </h3>
                    <p className="font-inter text-sm text-gray-600 text-center relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
