import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const partners = [
  {
    name: 'Stewart Title',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453795949_35ad8ec4.jpg',
    url: '#'
  },
  {
    name: 'Horne & Associates',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453796414_6a577146.jpg',
    url: '#'
  },
  {
    name: 'Fowler St. Clair',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453796640_9a7977f7.jpg',
    url: '#'
  },
  {
    name: 'Capital Title',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453796905_5042bc6a.jpg',
    url: '#'
  },
  {
    name: 'SubTo',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453797184_b0bcc498.jpg',
    url: '#'
  },
  {
    name: 'PJ Morzy',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453797399_4989b7ac.jpg',
    url: '#'
  },
  {
    name: 'Asset Protection Consulting',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453797605_2f4a681b.jpg',
    url: '#'
  },
  {
    name: 'Creative Title & Escrow',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453797875_8716650d.jpg',
    url: '#'
  },
  {
    name: 'Kimberly H. Schultz P.A.',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453798136_19b7b3ce.jpg',
    url: '#'
  },
  {
    name: 'SubTo Fund',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453798382_25e3a748.jpg',
    url: '#'
  },
  {
    name: 'SubTo Peace',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453798649_5610092b.jpg',
    url: '#'
  },
  {
    name: 'ReverseFlip',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453798865_42dad52f.jpg',
    url: '#'
  },
  {
    name: 'Top Tier TC',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453799090_72348e8c.jpg',
    url: '#'
  },
  {
    name: 'WestStar Mortgage',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453799573_18ebd5a3.jpg',
    url: '#'
  },
  {
    name: 'WestStar',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453799803_96dd6e58.jpg',
    url: '#'
  },
  {
    name: 'Capital Verified',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453800373_7fb8d94f.jpg',
    url: '#'
  },
  {
    name: 'My Virtual Notary',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453800601_3daac3ed.jpg',
    url: '#'
  },
  {
    name: 'MyInvestorLoan',
    logo: 'https://d64gsuwffb70l.cloudfront.net/683069aab50f38d9253bb47a_1748453800812_1abcff45.jpg',
    url: '#'
  }
];

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We work with trusted partners to deliver the best service and customized solutions based on your unique needs. 
            From Experienced Attorneys, Private Lenders, Reputable Title Companies or our Extensive Network of Investors, 
            We leverage proven real estate strategies to offer you a wide range of options.
          </p>
        </div>

        {/* Horizontally Scrolling Logo Carousel */}
        <div className="mb-16">
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll space-x-8">
              {[...partners, ...partners].map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  className="flex-shrink-0 group cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-40 h-24 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm border">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-h-16 max-w-32 w-auto h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Why Trust BESD ACQUISITION?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">Free Consultation & Real Advice</h4>
              <p className="text-blue-100 text-sm">
                Whether or not you close a transaction with us, we're here to guide you. 
                We provide honest, personalized advice to help you make the best decision — with peace of mind, not pressure. 
                We believe in offering real solutions that go beyond a one-time deal.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">Tailored & Creative Solutions</h4>
              <p className="text-blue-100 text-sm">
                Real estate isn't one-size-fits-all. Your situation is unique — and so is our approach. 
                Whether you're facing financial stress, legal issues, or life events, we tap into our network of lawyers, 
                private lenders, title experts, and investors to design the right strategy for your property. 
                We treat each case as a custom project.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">Sell with Confidence</h4>
              <p className="text-blue-100 text-sm">
                If selling is the right move for you, we make it as easy and fast as possible. 
                We'll even show you how we create equity through smart investing or selling — so you learn and benefit, not just sell. 
                We transform tough situations into opportunities.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">Investor Strategies That Protect You</h4>
              <p className="text-blue-100 text-sm">
                Unlike traditional agents focused on commission, we focus on solutions. 
                As investors, we build win-win outcomes through creative, legal approaches that protect your property, 
                your credit, and your peace of mind. We can even help families in tough spots become investors themselves — 
                turning stress into strength.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;