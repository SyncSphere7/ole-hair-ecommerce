#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Running Magic Link Migration...${NC}\n"

# Supabase credentials
SUPABASE_URL="https://izlvdgjugtcuezzmfuth.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHZkZ2p1Z3RjdWV6em1mdXRoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTI2MjI3MywiZXhwIjoyMDc2ODM4MjczfQ.H0TzB24KrF6-rkS0DiG5H9kF6RAiHK-Kd3-MaKW9c_o"

# Read the migration SQL
SQL=$(cat supabase/migrations/20251103000000_create_magic_link_tokens.sql)

# Execute via Supabase REST API
echo -e "${YELLOW}📝 Executing migration SQL...${NC}\n"

# Create the table
curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec" \
  -H "apikey: ${SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$SQL" | jq -Rs .)}" \
  2>/dev/null

# Alternative: Use psql if available
if command -v psql &> /dev/null; then
  echo -e "\n${YELLOW}📝 Using psql to run migration...${NC}\n"
  
  # Extract connection details from Supabase URL
  DB_HOST="db.izlvdgjugtcuezzmfuth.supabase.co"
  DB_NAME="postgres"
  DB_USER="postgres"
  
  echo "Please enter your Supabase database password:"
  psql "postgresql://${DB_USER}@${DB_HOST}:5432/${DB_NAME}" -f supabase/migrations/20251103000000_create_magic_link_tokens.sql
  
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Migration completed successfully!${NC}\n"
  else
    echo -e "\n${RED}❌ Migration failed${NC}\n"
  fi
else
  echo -e "\n${YELLOW}⚠️  Cannot verify migration via API${NC}"
  echo -e "${YELLOW}Please run the migration manually in Supabase Dashboard:${NC}\n"
  echo "1. Go to: https://supabase.com/dashboard/project/izlvdgjugtcuezzmfuth/sql/new"
  echo "2. Copy the SQL from: supabase/migrations/20251103000000_create_magic_link_tokens.sql"
  echo "3. Paste and click 'Run'"
  echo ""
fi

echo -e "${GREEN}📋 Next steps:${NC}"
echo "1. Verify table exists in Supabase Dashboard"
echo "2. Restart dev server: npm run dev"
echo "3. Test magic link authentication"
echo ""
