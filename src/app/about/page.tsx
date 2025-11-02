import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container-custom max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-black dark:text-white transition-colors">About Ole Hair</h1>
          <p className="text-xl md:text-2xl text-gold font-semibold mb-4 italic">
            Quality over Quantity
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
            Your trusted source for premium wigs and hair bundles in Kampala, Uganda.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-6 text-black dark:text-white transition-colors">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors">
              Ole Hair was founded with a simple mission: to provide women in Uganda with access to 
              high-quality, affordable wigs and hair bundles that enhance their natural beauty and boost 
              their confidence.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors">
              We understand that your hair is an important part of your identity and self-expression. 
              That&apos;s why we&apos;ve dedicated ourselves to sourcing only the finest 100% virgin hair products 
              that look natural, feel comfortable, and last.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
              Today, we&apos;re proud to serve customers across Kampala and beyond, offering a carefully 
              curated selection of wigs and bundles in various styles, lengths, and textures.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 transition-colors">
          <h2 className="text-3xl font-serif mb-6 text-center text-black dark:text-white transition-colors">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-black dark:text-white transition-colors">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">We never compromise on quality. Every product is carefully selected and inspected.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-black dark:text-white transition-colors">Customer Care</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">Your satisfaction is our priority. We&apos;re here to support you every step of the way.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-black dark:text-white transition-colors">Fair Pricing</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">Premium quality doesn&apos;t have to break the bank. We offer competitive prices.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif mb-6 text-black dark:text-white transition-colors">Why Choose Ole Hair?</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong className="block mb-1 text-black dark:text-white transition-colors">100% Virgin Hair</strong>
                <span className="text-gray-600 dark:text-gray-400 transition-colors">All our products are made from genuine virgin hair with natural texture and shine.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong className="block mb-1 text-black dark:text-white transition-colors">Variety of Styles</strong>
                <span className="text-gray-600 dark:text-gray-400 transition-colors">From bob wigs to long bundles, pixie cuts to curly styles - we have something for everyone.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong className="block mb-1 text-black dark:text-white transition-colors">Convenient Shopping</strong>
                <span className="text-gray-600 dark:text-gray-400 transition-colors">Shop online with secure payment options and choose between pickup or delivery.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong className="block mb-1 text-black dark:text-white transition-colors">Expert Support</strong>
                <span className="text-gray-600 dark:text-gray-400 transition-colors">Need help choosing? Our team is available on WhatsApp to guide you.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center bg-black dark:bg-gray-800 text-white rounded-lg p-8 transition-colors">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Ready to Transform Your Look?</h2>
          <p className="text-gray-300 dark:text-gray-400 mb-6 transition-colors">Browse our collection and find your perfect style today.</p>
          <Link href="/products" className="inline-block bg-gold text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
