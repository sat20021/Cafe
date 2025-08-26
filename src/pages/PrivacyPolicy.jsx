import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                place an order, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Name and contact information</li>
                <li>Payment information</li>
                <li>Order history and preferences</li>
                <li>Communication records</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. How We Use Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve our website functionality and user experience</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Types of Cookies We Use:
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  These cookies are necessary for the website to function properly. They enable basic 
                  functions like page navigation and access to secure areas.
                </p>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Functional Cookies</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering 
                  your preferences and settings.
                </p>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Marketing Cookies</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  These cookies are used to track visitors across websites to display relevant and 
                  engaging advertisements.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Your Rights and Choices
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Request data portability</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can manage your cookie preferences through your browser settings or by contacting us directly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Data Sharing
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong> privacy@belacafe.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Phone:</strong> +91 6202606830
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Address:</strong> Bela Café, [Your Address Here]
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 