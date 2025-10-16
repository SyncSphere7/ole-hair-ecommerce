'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    category: 'Products',
    questions: [
      {
        q: 'Are your wigs and bundles made from real hair?',
        a: 'Yes! All our products are made from 100% virgin human hair. This means the hair has never been chemically processed and retains its natural texture, shine, and quality.'
      },
      {
        q: 'How long do the wigs last?',
        a: 'With proper care, our wigs can last 1-2 years or even longer. Regular washing, conditioning, and proper storage will help extend the life of your wig.'
      },
      {
        q: 'Can I color or bleach the hair?',
        a: 'Yes! Since our hair is 100% virgin human hair, you can color, bleach, straighten, or curl it just like your natural hair. We recommend consulting with a professional stylist for best results.'
      },
      {
        q: 'What is the difference between 4x4 and 5x5 wigs?',
        a: 'The numbers refer to the size of the lace closure. A 5x5 closure has a larger parting space (5x5 inches) compared to 4x4 (4x4 inches), giving you more styling versatility.'
      },
    ]
  },
  {
    category: 'Orders & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept MTN Mobile Money, Airtel Money, and Visa/Mastercard payments through our secure Pesapal payment gateway.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely! We use Pesapal, a trusted payment gateway, to process all payments. Your payment information is encrypted and secure.'
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Yes, you can cancel or modify your order within 2 hours of placing it. Please contact us immediately via WhatsApp at +256 758 774 233.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Currently, we only accept full payment at checkout. However, contact us on WhatsApp to discuss special arrangements.'
      },
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'Do you offer free delivery?',
        a: 'We offer free pickup in Kampala. Home delivery within Kampala is available for 10,000 UGX.'
      },
      {
        q: 'How long does delivery take?',
        a: 'For pickup orders, your items will be ready within 24 hours. Home delivery typically takes 1-2 business days within Kampala.'
      },
      {
        q: 'Do you deliver outside Kampala?',
        a: 'Currently, we only offer delivery within Kampala. For orders outside Kampala, please contact us on WhatsApp to discuss shipping options.'
      },
      {
        q: 'How will I know when my order is ready?',
        a: 'We will contact you via phone or WhatsApp once your order is ready for pickup or has been dispatched for delivery.'
      },
    ]
  },
  {
    category: 'Care & Maintenance',
    questions: [
      {
        q: 'How do I wash my wig?',
        a: 'Wash your wig with lukewarm water and a sulfate-free shampoo. Gently massage the shampoo through the hair, rinse thoroughly, apply conditioner, and let air dry on a wig stand.'
      },
      {
        q: 'How often should I wash my wig?',
        a: 'It depends on how often you wear it. Generally, wash your wig every 10-14 wears or when you notice product buildup.'
      },
      {
        q: 'Can I sleep in my wig?',
        a: 'We do not recommend sleeping in your wig as it can cause tangling and reduce its lifespan. Always remove and store it properly overnight.'
      },
      {
        q: 'How do I store my wig when not wearing it?',
        a: 'Store your wig on a wig stand or mannequin head in a cool, dry place away from direct sunlight. You can also store it in a silk or satin bag.'
      },
    ]
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleQuestion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-12 bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700">
            Find answers to common questions about our products and services.
          </p>
        </div>

        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="mb-10">
            <h2 className="text-2xl font-serif mb-6 text-gold">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, qIndex) => {
                const key = `${catIndex}-${qIndex}`
                const isOpen = openIndex === key

                return (
                  <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(key)}
                      className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold pr-4">{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-serif mb-3">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            We're here to help! Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/256758774233"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
