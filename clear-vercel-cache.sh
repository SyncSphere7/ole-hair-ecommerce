#!/bin/bash
# Clear Vercel build cache script

echo "Clearing Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "Clearing build artifacts..."
rm -rf out
rm -rf dist

echo "Cache cleared! Now run: npm run build"