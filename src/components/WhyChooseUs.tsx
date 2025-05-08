import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { ShieldCheck, Clock, PiggyBank, Briefcase } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Secure & Compliant",
    description: "All transactions follow software vendor compliance guidelines. We handle the legal transfer process."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Fast Turnaround",
    description: "From valuation to payment in as little as 48 hours. No lengthy negotiation process."
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: "Maximum Value",
    description: "Get up to 70% of the original purchase price, significantly higher than competitors."
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Enterprise Focus",
    description: "Specializing in high-value enterprise software licenses with dedicated account managers."
  }
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <div id="why-choose-us" className="py-24 bg-white dark:bg-gray-900">
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose SoftSell
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We've helped hundreds of companies recover millions in software spending. Here's why they choose us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-500 ${
                isInView ? 'animate-slide-up opacity-100' : 'opacity-0'
              } hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-soft`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">$14M+</div>
              <div className="text-gray-700 dark:text-gray-300">Paid to clients</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">500+</div>
              <div className="text-gray-700 dark:text-gray-300">Satisfied customers</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">48hrs</div>
              <div className="text-gray-700 dark:text-gray-300">Average turnaround time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;