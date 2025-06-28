import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface HeroProps {
  onGetCashOffer?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetCashOffer }) => {
  const handleGetCashOffer = () => {
    if (onGetCashOffer) {
      onGetCashOffer();
    } else {
      // Scroll to property form section
      const propertyForm = document.getElementById('property-form');
      if (propertyForm) {
        propertyForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLearnMore = () => {
    // Scroll to How It Works section
    const howItWorks = document.getElementById('how-it-works');
    if (howItWorks) {
      howItWorks.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Sell Your Property
                <span className="text-blue-600 block">Fast & Easy</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We buy houses in any condition. No repairs, no fees, no hassle. 
                Get a fair cash offer in 15 minutes to 2 hours.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                onClick={handleGetCashOffer}
              >
                Get Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center pt-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">15min-2hrs</div>
                  <div className="text-sm text-gray-600">Average Response</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2">
              <img 
                src="/placeholder.svg" 
                alt="Modern house" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;