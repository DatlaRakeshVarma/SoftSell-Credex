import React, { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    content: "SoftSell helped us recover over $50,000 from unused Adobe and Microsoft licenses after a company downsizing. The process was straightforward and their valuation was higher than we expected.",
    author: "Sarah Johnson",
    role: "IT Procurement Manager",
    company: "TechFlow Solutions"
  },
  {
    content: "We had 200+ unused Salesforce licenses after a merger. SoftSell not only found buyers quickly but handled all the compliance paperwork. The entire process took less than a week.",
    author: "Michael Chen",
    role: "CFO",
    company: "GrowthSpan Enterprises"
  },
  {
    content: "As a fast-growing startup, we often over-purchased software licenses. SoftSell has become our go-to solution for recovering costs on enterprise software we no longer need.",
    author: "Rachel Williams",
    role: "Operations Director",
    company: "Nimble Innovations"
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Don't just take our word for it. Hear from businesses that have successfully recovered value from unused software.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 md:p-10">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {testimonial.author}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-8 rounded-full transition-colors ${
                  activeIndex === index 
                    ? 'bg-primary-600 dark:bg-primary-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full p-2 rounded-full bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full p-2 rounded-full bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;