import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-black dark:text-white transition-colors">Contact Us</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 transition-colors">
            We'd love to hear from you. Reach out with any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif mb-6 text-black dark:text-white transition-colors">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <FaWhatsapp className="w-6 h-6 text-green-600 dark:text-green-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-black dark:text-white transition-colors">WhatsApp</h3>
                  <a 
                    href="https://wa.me/256758774233" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                  >
                    +256 758 774 233
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">Fastest way to reach us! Available 9 AM - 8 PM</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <FaPhone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-black dark:text-white transition-colors">Phone</h3>
                  <a 
                    href="tel:+256758774233"
                    className="text-gold hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                  >
                    +256 758 774 233
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">Call us during business hours</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <FaEnvelope className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-black dark:text-white transition-colors">Email</h3>
                  <a 
                    href="mailto:info@olehair.com"
                    className="text-gold hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                  >
                    info@olehair.com
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <FaMapMarkerAlt className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-black dark:text-white transition-colors">Location</h3>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors">At Nailclip Near Acacia Mall</p>
                  <p className="text-gray-700 dark:text-gray-300 transition-colors">Bukoto Street, Opposite Asiatic Sport</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
              <h3 className="font-semibold mb-3 text-black dark:text-white transition-colors">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 transition-colors">Monday - Friday</span>
                  <span className="font-medium text-black dark:text-white transition-colors">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 transition-colors">Saturday</span>
                  <span className="font-medium text-black dark:text-white transition-colors">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 transition-colors">Sunday</span>
                  <span className="font-medium text-black dark:text-white transition-colors">12:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6 text-black dark:text-white transition-colors">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-white transition-colors">Your Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-white transition-colors">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-white transition-colors">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                  placeholder="+256 700 000 000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-white transition-colors">Subject *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-white transition-colors">Message *</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>

              <p className="text-sm text-gray-600 dark:text-gray-400 text-center transition-colors">
                Or message us directly on{' '}
                <a 
                  href="https://wa.me/256758774233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 font-semibold transition-colors"
                >
                  WhatsApp
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
          <h3 className="text-xl font-serif mb-2 text-black dark:text-white transition-colors">Looking for Answers?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">Check out our frequently asked questions page for quick answers.</p>
          <a href="/faq" className="btn-outline inline-block">
            Visit FAQ
          </a>
        </div>
      </div>
    </div>
  )
}
