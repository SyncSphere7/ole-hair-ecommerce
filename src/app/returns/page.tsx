import Link from 'next/link'

export default function ReturnsPage() {
  return (
    <div className="py-12 bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Returns & Refund Policy</h1>
          <p className="text-xl text-gray-700">
            Your satisfaction is our priority. Please read our policy carefully.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4">Policy Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              At Ole Hair, we want you to be completely satisfied with your purchase. Due to the nature of 
              hair products and hygiene considerations, we have specific conditions for returns and exchanges.
            </p>
          </section>

          {/* Return Eligibility */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4">Return Eligibility</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="font-semibold text-lg mb-2">You CAN return if:</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>The product is defective or damaged upon arrival</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You received the wrong product</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>The product packaging is unopened and intact</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You contact us within 48 hours of delivery/pickup</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h3 className="font-semibold text-lg mb-2">You CANNOT return if:</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>The packaging has been opened or the product has been used</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>More than 48 hours have passed since delivery/pickup</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>The product has been altered, colored, or styled</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>You simply changed your mind after opening the product</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Return Process */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4">How to Return</h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-bold text-black">
                  1
                </span>
                <div>
                  <strong className="block mb-1">Contact Us Immediately</strong>
                  <span className="text-gray-700">
                    Message us on WhatsApp at +256 758 774 233 within 48 hours of receiving your order. 
                    Provide your order number and photos of the issue.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-bold text-black">
                  2
                </span>
                <div>
                  <strong className="block mb-1">Wait for Approval</strong>
                  <span className="text-gray-700">
                    Our team will review your request and photos. We'll approve or decline the return 
                    based on our policy conditions.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-bold text-black">
                  3
                </span>
                <div>
                  <strong className="block mb-1">Return the Product</strong>
                  <span className="text-gray-700">
                    If approved, return the unopened product in its original packaging. We'll provide 
                    instructions for return delivery or pickup.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center font-bold text-black">
                  4
                </span>
                <div>
                  <strong className="block mb-1">Receive Refund or Exchange</strong>
                  <span className="text-gray-700">
                    Once we receive and inspect the return, we'll process your refund or send a 
                    replacement within 5-7 business days.
                  </span>
                </div>
              </li>
            </ol>
          </section>

          {/* Refund Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4">Refund Information</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Refunds will be issued to the original payment method</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Processing time is 5-7 business days after we receive the return</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>Delivery fees are non-refundable unless we made an error</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span>
                <span>You are responsible for return shipping costs unless the product is defective</span>
              </li>
            </ul>
          </section>

          {/* Exchanges */}
          <section className="mb-10">
            <h2 className="text-2xl font-serif mb-4">Exchanges</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We're happy to exchange products of equal value if you receive the wrong item or if there's 
              a defect. The same conditions apply as returns - the product must be unopened and in original 
              packaging.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For size or style exchanges on unopened products, contact us within 48 hours to check availability.
            </p>
          </section>

          {/* Damaged or Defective */}
          <section className="mb-10 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-serif mb-4">Damaged or Defective Products</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you receive a damaged or defective product, we sincerely apologize! We'll make it right:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-gold">✓</span>
                <span>Contact us immediately with photos of the damage/defect</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span>
                <span>We'll arrange immediate pickup and replacement</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span>
                <span>Full refund or exchange at your choice</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span>
                <span>We cover all return shipping costs</span>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="text-center p-8 bg-black text-white rounded-lg">
            <h2 className="text-2xl font-serif mb-3">Questions About Returns?</h2>
            <p className="text-gray-300 mb-6">
              Our customer service team is here to help with any concerns.
            </p>
            <a
              href="https://wa.me/256758774233"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Contact Us on WhatsApp
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
