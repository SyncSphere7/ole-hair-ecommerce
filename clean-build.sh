#!/bin/bash

# Ole Hair - Clean Build Verification Script

echo "🧹 Cleaning Ole Hair Project..."
echo ""

# Step 1: Remove build artifacts and dependencies
echo "1. Removing .next and node_modules..."
rm -rf .next node_modules .turbo

# Step 2: Clean npm cache (optional but helpful)
echo "2. Cleaning npm cache..."
npm cache clean --force

# Step 3: Reinstall dependencies
echo "3. Installing fresh dependencies..."
npm install

# Step 4: Run build
echo "4. Building project..."
npm run build

# Step 5: Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "Next steps:"
    echo "1. Commit changes: git add . && git commit -m 'Your message'"
    echo "2. Push to GitHub: git push origin main"
    echo "3. Vercel will auto-deploy!"
    echo ""
else
    echo ""
    echo "❌ Build failed. Check errors above."
    echo ""
fi
