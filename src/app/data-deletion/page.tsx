import Link from 'next/link'

export default function DataDeletionPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-black dark:text-white transition-colors">
            Data Deletion Policy
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 transition-colors">
            How we handle your data deletion requests
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4 text-black dark:text-white transition-colors">
              Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
              At Ole Hair, we respect your privacy and your right to control your personal data. 
              This policy explains how users can request deletion of their data that was collected 
              through Facebook Login integration.
            </p>
          </section>

          {/* What Data We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4 text-black dark:text-white transition-colors">
              What Data We Collect via Facebook Login
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors">
              When you sign in to Ole Hair using Facebook Login, we collect the following information:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors">
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Your name (first and last name)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Your email address</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Your Facebook profile picture (optional)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Your Facebook User ID (for authentication purposes)</span>
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors">
              We do not collect or store any other Facebook data, and we do not post anything to 
              your Facebook account without your explicit permission.
            </p>
          </section>

          {/* How to Request Data Deletion */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4 text-black dark:text-white transition-colors">
              How to Request Data Deletion
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 transition-colors">
              You can request deletion of your data in three ways:
            </p>

            <div className="space-y-6">
              {/* Method 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-colors">
                <h3 className="font-semibold text-lg mb-3 text-black dark:text-white transition-colors">
                  Method 1: Through Your Account
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="font-semibold">1.</span>
                    <span>Log in to your Ole Hair account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">2.</span>
                    <span>Go to Profile Settings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">3.</span>
                    <span>Click "Delete My Account"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">4.</span>
                    <span>Confirm your deletion request</span>
                  </li>
                </ol>
              </div>

              {/* Method 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-colors">
                <h3 className="font-semibold text-lg mb-3 text-black dark:text-white transition-colors">
                  Method 2: Via Email
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Send an email to:{' '}
                  <a 
                    href="mailto:privacy@olehair.com" 
                    className="text-gold hover:underline"
                  >
                    privacy@olehair.com
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Include in your email:
                </p>
                <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>Subject: "Data Deletion Request"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>Your registered email address</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>Confirmation that you want all your data deleted</span>
                  </li>
                </ul>
              </div>

              {/* Method 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-colors">
                <h3 className="font-semibold text-lg mb-3 text-black dark:text-white transition-colors">
                  Method 3: Via WhatsApp
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Message us on WhatsApp:{' '}
                  <a 
                    href="https://wa.me/256758774233" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    +256 758 774 233
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Send a message with:
                </p>
                <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>"I want to delete my Ole Hair account"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>Your registered email address</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What Gets Deleted */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4 text-black dark:text-white transition-colors">
              What Gets Deleted
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors">
              When you request data deletion, we will permanently remove:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors">
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-400">✓</span>
                <span>Your account profile information (name, email, profile picture)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-400">✓</span>
                <span>Your Facebook User ID and authentication data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-400">✓</span>
                <span>Your saved addresses and preferences</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-400">✓</span>
                <span>Your wishlist and compare list data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 dark:text-red-400">✓</span>
                <span>Any personal information stored in our database</span>
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4 text-black dark:text-white transition-colors">
              Important Notes
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-6 transition-colors">
              <ul className="space-y-3 text-gray-800 dark:text-gray-200">
                <li className="flex gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <span>
                    <strong>Order History:</strong> If you have placed orders, we may need to retain 
                    certain transaction data (order ID, purchase amount) for legal and accounting purposes. 
                    However, we will anonymize this data by removing all personally identifiable information.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <span>
                    <strong>Processing Time:</strong> Data deletion requests are processed within 30 days 
                    of receiving your request.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <span>
                    <strong>Irreversible:</strong> Once your data is deleted, it cannot be recovered. 
                    You will need to create a new account if you wish to use our services again.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <span>
                    <strong>Confirmation:</strong> You will receive a confirmation email once your data 
                    has been successfully deleted.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Facebook Platform */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4 text-black dark:text-white transition-colors">
              Removing Ole Hair from Facebook
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors">
              To revoke Ole Hair's access to your Facebook data:
            </p>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                <span>Go to your Facebook Settings & Privacy</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                <span>Click on "Settings"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                <span>Click on "Apps and Websites"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">4.</span>
                <span>Find "Ole Hair" in the list</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">5.</span>
                <span>Click "Remove" to revoke access</span>
              </li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors">
              Note: Removing Ole Hair from Facebook only revokes our access to your Facebook data. 
              To delete your data from our servers, you must also follow the data deletion process above.
            </p>
          </section>

          {/* Contact Section */}
          <section className="text-center p-8 bg-black dark:bg-gray-800 text-white rounded-lg transition-colors">
            <h2 className="text-2xl font-serif mb-3">Questions About Data Deletion?</h2>
            <p className="text-gray-300 dark:text-gray-400 mb-6 transition-colors">
              We're here to help with any privacy concerns or questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@olehair.com"
                className="inline-block bg-gold text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/256758774233"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white dark:bg-gray-700 text-black dark:text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </section>

          {/* Related Policies */}
          <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors">
            <h3 className="text-xl font-serif mb-4 text-center text-black dark:text-white transition-colors">
              Related Policies
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/privacy-policy" 
                className="text-gold hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                href="/returns" 
                className="text-gold hover:underline"
              >
                Returns Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link 
                href="/contact" 
                className="text-gold hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
