interface Feature {
  title: string;
  description: string;
}

interface GeoFeaturesProps {
  country: string;
  features: Feature[];
}

export default function GeoFeatures({ country, features }: GeoFeaturesProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our {country} Views?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Get authentic engagement from the {country} market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative rounded-2xl p-6 transition-all duration-300
                                      backdrop-blur-[12px] bg-white/40 border border-white
                                      hover:shadow-[0_0_40px_-15px_rgba(239,68,68,0.3)]
                                      hover:bg-white/60">
              <div className="relative">
                <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
