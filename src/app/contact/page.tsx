import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div className="py-12 bg-white">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700">
            We'd love to hear from you. Reach out with any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <a 
                    href="https://wa.me/256758774233" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-yellow-600 transition-colors"
                  >
                    +256 758 774 233
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Fastest way to reach us! Available 9 AM - 8 PM</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a 
                    href="tel:+256758774233"
                    className="text-gold hover:text-yellow-600 transition-colors"
                  >
                    +256 758 774 233
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Call us during business hours</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:info@olehair.com"
                    className="text-gold hover:text-yellow-600 transition-colors"
                  >
                    info@olehair.com
                  </a>
                  <p className="text-sm text-gray-600 mt-1">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-gray-700">At Nailclip Near Acacia Mall</p>
                  <p className="text-gray-700">Bukoto Street, Opposite Asiatic Sport</p>
                  <p className="text-sm text-gray-600 mt-1">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">12:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+256 700 000 000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  className="input-field"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>

              <p className="text-sm text-gray-600 text-center">
                Or message us directly on{' '}
                <a 
                  href="https://wa.me/256758774233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  WhatsApp
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-serif mb-2">Looking for Answers?</h3>
          <p className="text-gray-600 mb-4">Check out our frequently asked questions page for quick answers.</p>
          <a href="/faq" className="btn-outline inline-block">
            Visit FAQ
          </a>
        </div>
      </div>
    </div>
  )
}
