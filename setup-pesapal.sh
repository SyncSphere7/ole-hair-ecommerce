#!/bin/bash

# Ole Hair - Pesapal Integration Setup Script
# This script helps you set up the Pesapal payment integration

echo "🎨 Ole Hair - Pesapal Integration Setup"
echo "======================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created .env.local${NC}"
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

echo ""
echo "📝 IMPORTANT SETUP STEPS:"
echo ""
echo "1. Add your Pesapal credentials to .env.local:"
echo "   PESAPAL_CONSUMER_KEY=AgSKwORd2uhV2GqKoMjgjtt1KUrAl6xv"
echo "   PESAPAL_CONSUMER_SECRET=VtCPOTOTrr8mOTXRd+vLQmQ9tmg="
echo ""
echo "2. Set the environment:"
echo "   NEXT_PUBLIC_PESAPAL_ENVIRONMENT=sandbox (for testing)"
echo "   NEXT_PUBLIC_PESAPAL_ENVIRONMENT=production (when ready)"
echo ""
echo "3. Set your base URL:"
echo "   NEXT_PUBLIC_BASE_URL=http://localhost:3000 (local)"
echo "   NEXT_PUBLIC_BASE_URL=https://www.olehair.com (production)"
echo ""
echo -e "${YELLOW}4. Apply database migration:${NC}"
echo "   Run: supabase db push"
echo "   Or manually apply: supabase/migrations/20251104000000_create_orders_table.sql"
echo ""
echo -e "${YELLOW}5. Start development server:${NC}"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}6. Register IPN with Pesapal:${NC}"
echo "   curl -X POST http://localhost:3000/api/pesapal/register-ipn"
echo "   Copy the returned IPN ID and add it to .env.local as PESAPAL_IPN_ID"
echo ""
echo -e "${GREEN}7. Test the payment flow:${NC}"
echo "   - Add items to cart"
echo "   - Go to checkout"
echo "   - Fill in details and click Pay Now"
echo "   - Complete payment on Pesapal sandbox"
echo "   - Verify order status in confirmation page"
echo ""
echo "======================================="
echo -e "${GREEN}Setup guide complete!${NC}"
echo "For detailed instructions, see: PESAPAL-SETUP-COMPLETE.md"
