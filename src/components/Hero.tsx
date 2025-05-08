import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add animation class after a brief delay to ensure proper mounting
    const timer = setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex items-center pt-16 pb-12"
      style={{ 
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08), transparent)',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Turn Unused Software Licenses Into 
              <span className="text-primary-600 dark:text-primary-400"> Cash</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              SoftSell helps businesses recoup value from idle software assets. Get up to 70% of the remaining value of your unused enterprise licenses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 px-6 py-3 rounded-md text-lg font-medium transition-colors"
              >
                How It Works
              </a>
            </div>
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Trusted by over 500+ companies worldwide
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-xl shadow-soft transform -rotate-2"></div>
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-soft transform rotate-2"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  License Valuation
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">License Type</div>
                  <div className="font-medium">Adobe Creative Cloud Enterprise</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quantity</div>
                  <div className="font-medium">25 seats</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Remaining Term</div>
                  <div className="font-medium">9 months</div>
                </div>
                <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg border border-primary-200 dark:border-primary-700">
                  <div className="text-primary-700 dark:text-primary-300 mb-1 font-medium">Estimated Value</div>
                  <div className="font-bold text-2xl text-primary-700 dark:text-primary-300">$12,375</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;