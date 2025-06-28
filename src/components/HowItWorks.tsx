import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, FileText, DollarSign, Key } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: 'Contact Us',
    description: 'Call us or fill out our form to get started. We\'ll schedule a convenient time to discuss your property.',
    color: 'text-blue-600'
  },
  {
    icon: FileText,
    title: 'Property Evaluation',
    description: 'We\'ll evaluate your property and provide you with a fair, no-obligation cash offer within 15 minutes to 2 hours.',
    color: 'text-yellow-500'
  },
  {
    icon: DollarSign,
    title: 'Accept Offer',
    description: 'If you accept our offer, we\'ll handle all the paperwork and legal details. No fees or commissions.',
    color: 'text-green-600'
  },
  {
    icon: Key,
    title: 'Close & Get Paid',
    description: 'We can close in as little as 7 days. You choose the closing date that works best for you.',
    color: 'text-purple-600'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes selling your house fast and easy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="relative group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white rounded-full p-3 shadow-lg border-2 border-gray-100">
                      <IconComponent className={`h-8 w-8 ${step.color}`} />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-center justify-center mb-4">
                      <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-3 py-1 rounded-full">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join hundreds of satisfied homeowners who chose the fast, easy way to sell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15min-2hrs</div>
                <div className="text-sm text-gray-600">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$0</div>
                <div className="text-sm text-gray-600">Fees or Commissions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">7 Days</div>
                <div className="text-sm text-gray-600">Fast Closing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;