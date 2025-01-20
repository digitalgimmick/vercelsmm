import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface GeoFAQProps {
  country: string;
  faqs: FAQ[];
}

export default function GeoFAQ({ country, faqs }: GeoFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            Common Questions About {country} Views
          </h2>
          <p className="font-inter text-xl text-gray-600">
            Everything you need to know about our {country} targeted views
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group relative rounded-xl transition-all duration-300
                         backdrop-blur-[12px] border border-white
                         shadow-[0_0_1px_1px_rgba(0,0,0,0.05)]
                         hover:shadow-[0_0_40px_-15px_rgba(239,68,68,0.2)]
                         ${openIndex === index 
                           ? 'bg-white/80' 
                           : 'bg-white/40 hover:bg-white/60'}`}
            >
              {/* Card inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <button
                className="relative w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-outfit text-lg font-medium text-left text-gray-900 group-hover:text-gray-800">
                  {faq.question}
                </span>
                <div className={`ml-4 flex-shrink-0 transition-colors duration-200
                                ${openIndex === index 
                                  ? 'text-red-500' 
                                  : 'text-gray-400 group-hover:text-red-400'}`}>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="relative px-6 pb-5">
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
