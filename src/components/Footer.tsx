import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/olehair-big-logo.jpg"
                alt="Ole Hair"
                width={100}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-gold text-sm font-semibold italic mb-2">
              Quality over Quantity
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium quality wigs and hair bundles in Kampala, Uganda. Your beauty, our passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-gold transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/256758774233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/olehairug"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/olehairug/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@olehairug"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>+256 758 774 233</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ole Hair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
