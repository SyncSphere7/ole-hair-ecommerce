# Ole Hair - Quick Reference

## 🎯 Project Overview
Full-stack e-commerce website for Ole Hair selling premium wigs and hair bundles in Kampala, Uganda.

## 📁 Key Files & Locations

### Configuration
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js & PWA configuration
- `tailwind.config.ts` - Colors and design tokens
- `tsconfig.json` - TypeScript configuration

### Core Data
- `src/types/index.ts` - TypeScript type definitions
- `src/data/products.ts` - Product catalog (8 products)
- `src/store/cartStore.ts` - Shopping cart state management
- `src/lib/utils.ts` - Utility functions (currency, order numbers)

### Layout Components
- `src/app/layout.tsx` - Root layout with fonts
- `src/components/Header.tsx` - Navigation with cart count
- `src/components/Footer.tsx` - Footer with social links
- `src/components/WhatsAppButton.tsx` - Floating WhatsApp button
- `src/app/globals.css` - Global styles and Tailwind

### Page Components
- `src/app/page.tsx` - Homepage
- `src/app/products/page.tsx` - Product listing with filters
- `src/app/products/[id]/page.tsx` - Product detail pages
- `src/app/cart/page.tsx` - Shopping cart
- `src/app/checkout/page.tsx` - Checkout form
- `src/app/confirmation/page.tsx` - Order confirmation
- `src/app/about/page.tsx` - About us
- `src/app/contact/page.tsx` - Contact page
- `src/app/faq/page.tsx` - FAQ
- `src/app/returns/page.tsx` - Returns policy

### Assets
- `public/olehair-big-logo.png` - Company logo
- `public/images/` - Product placeholder images
- `public/icons/` - PWA app icons (need to generate)
- `public/manifest.json` - PWA manifest

## 🎨 Design System

### Colors
```css
Gold: #FFCC00 (Primary accent)
Black: #000000 (Secondary, text)
White: #FFFFFF (Background)
Gray scales: 50-900
```

### Fonts
```css
Headings: Playfair Display (serif)
Body: Inter (sans-serif)
```

### CSS Classes (Tailwind)
```css
.btn-primary - Gold button
.btn-secondary - Black button
.btn-outline - Outlined button
.container-custom - Page container
.input-field - Form input
.section-heading - Section titles
```

## 💰 Product Prices (UGX)

| Product | Price |
|---------|-------|
| 5x5 Bob Wig | 400,000 |
| 4x4 Bob Wig | 350,000 |
| Pixie Wig | 220,000 |
| Curly Fringe Wig | 250,000 |
| 10" Bundle | 172,000 |
| 14" Bundle | 130,000 |
| 18" Bundle | 176,000 |
| 20" Bundle | 190,000 |

## 📱 Contact Information

- **WhatsApp:** +256 758 774 233
- **Email:** info@olehair.com
- **Location:** Kampala, Uganda

Update in:
- `src/components/Footer.tsx`
- `src/components/WhatsAppButton.tsx`
- `src/app/contact/page.tsx`
- `src/app/confirmation/page.tsx`

## 🚚 Delivery

- **Pickup:** Free (Kampala)
- **Delivery:** 10,000 UGX (within Kampala)

Update `DELIVERY_FEE` in `src/lib/utils.ts`

## 🔧 Common Tasks

### Add New Product
1. Open `src/data/products.ts`
2. Add object to `products` array:
```typescript
{
  id: '9',
  name: 'Product Name',
  description: 'Description',
  price: 200000,
  category: 'wig', // or 'bundle'
  type: 'Product Type',
  length: '16"', // optional
  size: '4x4', // optional
  image: '/images/product.jpg',
  inStock: true,
}
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  gold: '#FFCC00', // Change this
  // ... other colors
}
```

### Update Logo
1. Replace `public/olehair-big-logo.png`
2. Clear browser cache
3. Regenerate PWA icons

### Modify Navigation
Edit `src/components/Header.tsx` - Desktop and mobile menu sections

### Change Footer Links
Edit `src/components/Footer.tsx` - Update social media URLs

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌐 Environment Variables

Create `.env.local`:
```env
# Pesapal (Production)
NEXT_PUBLIC_PESAPAL_CONSUMER_KEY=your_key
NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET=your_secret
NEXT_PUBLIC_PESAPAL_CALLBACK_URL=https://yourdomain.com/api/pesapal/callback
PESAPAL_API_URL=https://www.pesapal.com/API/

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🐛 Debugging

### Check Browser Console
Press F12 → Console tab

### Common Issues
1. **Images not loading:** Check file paths in `/public/`
2. **Cart not working:** Clear localStorage
3. **Build fails:** Delete `.next` folder, reinstall `node_modules`
4. **Styles not applying:** Check Tailwind classes, restart dev server

### Logs Location
- Development: Browser console
- Production: Server logs

## 📦 Dependencies

### Main
- **next:** 14.2.13 - React framework
- **react:** 18.3.1 - UI library
- **zustand:** 4.5.5 - State management
- **react-icons:** 5.3.0 - Icons
- **next-pwa:** 5.6.0 - PWA support

### Dev
- **typescript:** 5.6.2
- **tailwindcss:** 3.4.12
- **eslint:** 8.57.1

## 🔐 Security Considerations

- Never commit `.env.local` to Git
- Use environment variables for API keys
- Validate all form inputs
- Sanitize user data before displaying
- Use HTTPS in production
- Enable CORS properly
- Rate limit API endpoints

## 📈 Performance Tips

- Optimize images (use WebP format)
- Enable image lazy loading (default in Next.js)
- Minimize JavaScript bundle size
- Use CDN for static assets
- Enable caching headers
- Monitor with Lighthouse

## 🚀 Deployment Checklist

- [ ] Test all features
- [ ] Add real product images
- [ ] Generate PWA icons
- [ ] Update social media links
- [ ] Add Pesapal credentials
- [ ] Set up domain
- [ ] Configure SSL/HTTPS
- [ ] Test payment flow
- [ ] Enable analytics
- [ ] Set up error tracking
- [ ] Create backups

## 📚 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Pesapal API:** https://developer.pesapal.com
- **React Icons:** https://react-icons.github.io/react-icons

## 🆘 Need Help?

1. Check `README.md` for full documentation
2. Read `SETUP-GUIDE.md` for step-by-step instructions
3. Review `PESAPAL-INTEGRATION.md` for payment setup
4. Search Next.js documentation
5. Contact: +256 758 774 233 (WhatsApp)

---

**Built with ❤️ for Ole Hair**
