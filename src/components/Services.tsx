import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Gavel, Home, Heart, Wrench, Users } from 'lucide-react';

const conditionsCategories = [
  {
    icon: DollarSign,
    title: 'Financial Hardships',
    conditions: ['Retiring', 'Job Loss', 'Missed Payments', 'Back Taxes', 'Low Equity', 'Bankruptcy', 'High Liens']
  },
  {
    icon: Gavel,
    title: 'Legal Complications',
    conditions: ['Judgments', 'Probate', 'Code Violations', 'Title Issues', 'Deed Fraud', 'Liens', 'Problem Tenants', 'Pre-Foreclosure', 'Inherited Property', 'Squatters']
  },
  {
    icon: Wrench,
    title: 'Property Condition',
    conditions: ['Structural Damage', 'Fire Damage', 'Condemned Properties', 'Large Repairs']
  },
  {
    icon: Heart,
    title: 'Personal & Life Events',
    conditions: ['Relocations', 'Divorces', 'Illness', 'Disability', 'Hoarders']
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">We Handle Houses in Any Conditions or Situations!</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We, along with our extensive network of professionals and investors, work together to find the right solution — 
            bringing peace of mind to every family we help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {conditionsCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {category.conditions.map((condition, conditionIndex) => (
                      <div key={conditionIndex} className="flex items-center text-sm text-gray-700 py-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span>{condition}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">No Matter Your Situation</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're dealing with financial stress, legal complications, property damage, or life changes — 
            we have the experience and network to help you find the best solution.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <Home className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">Any Condition</div>
                <div className="text-blue-100 text-sm">We buy as-is</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">Expert Network</div>
                <div className="text-blue-100 text-sm">Professional solutions</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Heart className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">Peace of Mind</div>
                <div className="text-blue-100 text-sm">Stress-free process</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;