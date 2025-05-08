import React, { useRef, useEffect } from 'react';
import { Upload, DollarSign, CreditCard } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Upload License Details",
    description: "Provide information about your unused software licenses, including type, quantity, and remaining term."
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Get Instant Valuation",
    description: "Our proprietary algorithm provides a fair market valuation based on current demand and license details."
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Get Paid Quickly",
    description: "Accept our offer and receive payment within 48 hours via your preferred payment method."
  }
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <div id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our process is simple, transparent, and designed to get you the maximum value for your software licenses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${
                isInView ? 'animate-slide-up' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-block p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
              <div className="mt-6 flex justify-between items-center">
                <div className="h-1 w-16 bg-primary-200 dark:bg-primary-700 rounded-full"></div>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-600 text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;