import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Send, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const licenseTypes = [
  "Microsoft 365",
  "Adobe Creative Cloud",
  "Salesforce",
  "Autodesk",
  "Oracle",
  "SAP",
  "Atlassian",
  "Other"
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  return (
    <div id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Turn Your Unused Licenses Into Cash?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Fill out the form to get a free valuation of your software licenses. Our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Submit your license details</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Tell us what software licenses you want to sell</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Get your valuation</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">We'll respond with a competitive offer within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Close the deal</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Accept our offer and get paid within 48 hours</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Contact Us Directly</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Prefer to talk to someone directly? Our team is ready to help.
              </p>
              <div className="text-primary-600 dark:text-primary-400 font-medium">
                sales@softsell.example.com
              </div>
              <div className="text-primary-600 dark:text-primary-400 font-medium">
                +1 (555) 123-4567
              </div>
            </div>
          </div>
          
          <div className="lg:ml-auto">
            {isSubmitted ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Your information has been submitted successfully. Our team will contact you within 24 hours with a valuation for your software licenses.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 ${
                  isInView ? 'animate-slide-up' : ''
                }`}
              >
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors.name 
                          ? 'border-red-500 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700`}
                      placeholder="John Smith"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors.email 
                          ? 'border-red-500 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors.company 
                          ? 'border-red-500 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700`}
                      placeholder="Acme Inc."
                    />
                    {errors.company && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      License Type *
                    </label>
                    <select
                      id="licenseType"
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors.licenseType 
                          ? 'border-red-500 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700`}
                    >
                      <option value="">Select license type</option>
                      {licenseTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.licenseType && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.licenseType}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring focus:ring-primary-200 dark:focus:ring-primary-800 dark:bg-gray-700"
                      placeholder="Tell us more about your licenses (quantity, remaining term, etc.)"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center ${
                      isSubmitting 
                        ? 'bg-primary-400 dark:bg-primary-700 cursor-not-allowed' 
                        : 'bg-primary-600 hover:bg-primary-700'
                    } text-white px-6 py-3 rounded-md text-lg font-medium transition-colors`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Free Valuation
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;