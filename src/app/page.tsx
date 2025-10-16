import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/data/products'
import { formatCurrency } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const featuredProducts = getFeaturedProducts(4)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif mb-4 text-black leading-tight">
              Premium Wigs & Hair Bundles
            </h1>
            <p className="text-xl md:text-2xl text-gold font-semibold mb-6 italic">
              Quality over Quantity
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Discover our collection of high-quality wigs and virgin hair bundles. 
              Elevate your style with elegance and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary text-center">
                Shop Now
              </Link>
              <Link href="/about" className="btn-outline text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-heading">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-heading">Why Choose Ole Hair</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3">Premium Quality</h3>
              <p className="text-gray-600">100% virgin hair with natural texture and shine</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3">Secure Payment</h3>
              <p className="text-gray-600">MTN, Airtel Mobile Money & Visa/Mastercard accepted</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Free pickup or quick delivery within Kampala</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect wig or hair bundle for your style.
            Chat with us on WhatsApp for personalized recommendations.
          </p>
          <a
            href="https://wa.me/256758774233?text=Hi%20Ole%20Hair,%20I%20need%20help%20choosing%20a%20product"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-black font-semibold px-8 py-4 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
