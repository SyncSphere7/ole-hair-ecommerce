# Ole Hair - Premium Wigs & Hair Bundles E-Commerce

A modern, responsive e-commerce website for Ole Hair, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ Modern, clean UI with gold/black/white color scheme
- 📱 Fully responsive (mobile-first design)
- 🛒 Shopping cart with persistent state
- 💳 Pesapal payment integration (MTN, Airtel, Visa/Mastercard)
- 🚚 Delivery options (pickup or delivery)
- 💬 WhatsApp integration for customer support
- 🔍 Product filtering by category, price, and length
- 📦 PWA support (installable as app)
- ⚡ Fast performance with Next.js
- 🎨 Custom fonts (Playfair Display + Inter)

## 📋 Pages

- **Home** - Hero section, featured products, why choose us
- **Products** - Catalog with filtering
- **Product Detail** - Individual product pages
- **Cart** - Shopping cart management
- **Checkout** - Order form with delivery and payment options
- **Confirmation** - Order confirmation with WhatsApp support
- **About** - Company information
- **Contact** - Contact form and info
- **FAQ** - Frequently asked questions
- **Returns** - Returns and refund policy

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** React Icons
- **PWA:** next-pwa

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- Primary: `#FFCC00` (gold)
- Secondary: `#000000` (black)
- Background: `#FFFFFF` (white)

### Products
Update product data in `src/data/products.ts`

### Contact Info
- WhatsApp: +256 758 774 233
- Update in multiple files (search for phone number)

### Logo
- Main logo: `public/olehair-big-logo.jpg`
- PWA icons: `public/icons/` (generate from logo)

## 🔧 Pesapal Integration

The checkout page is ready for Pesapal integration. To complete:

1. Get Pesapal API credentials from [pesapal.com](https://www.pesapal.com)
2. Add environment variables:
   ```
   NEXT_PUBLIC_PESAPAL_CONSUMER_KEY=your_key
   NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET=your_secret
   ```
3. Implement Pesapal API calls in `/src/app/checkout/page.tsx`

## 📱 PWA Icons

Generate PWA icons from your logo:
1. Use a tool like [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload your logo
3. Download icons and place in `public/icons/`

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Other Platforms
- Build: `npm run build`
- Output: `.next` folder
- Follow platform-specific Next.js deployment guides

## 📝 To-Do

- [ ] Add Pesapal API integration
- [ ] Generate PWA icons from logo
- [ ] Add real product images
- [ ] Set up email notifications
- [ ] Add Google Analytics
- [ ] Add social media links
- [ ] Implement product search
- [ ] Add customer reviews

## 🤝 Support

For questions or support, contact:
- WhatsApp: +256 758 774 233
- Email: info@olehair.com

## 📄 License

Copyright © 2025 Ole Hair. All rights reserved.
