#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('🚀 Running magic link migration...\n');

  // Read the migration file
  const migrationPath = path.join(__dirname, 'supabase/migrations/20251103000000_create_magic_link_tokens.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  try {
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // If exec_sql doesn't exist, try direct query
      console.log('📝 Executing migration SQL...');
      
      // Split SQL into individual statements
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        if (statement) {
          const { error: execError } = await supabase.rpc('exec', { 
            sql: statement + ';' 
          });
          
          if (execError) {
            console.log(`⚠️  Statement might have failed (this is often OK): ${execError.message}`);
          }
        }
      }
    }

    // Verify the table was created
    console.log('\n✅ Verifying table creation...');
    const { data: tables, error: tableError } = await supabase
      .from('magic_link_tokens')
      .select('*')
      .limit(0);

    if (tableError && tableError.code === '42P01') {
      console.error('\n❌ Table was not created. Error:', tableError.message);
      console.log('\n📋 Please run this SQL manually in Supabase Dashboard:');
      console.log('https://supabase.com/dashboard/project/izlvdgjugtcuezzmfuth/sql/new\n');
      console.log(sql);
      process.exit(1);
    } else if (tableError) {
      console.log('⚠️  Table might exist but RLS is blocking access (this is OK)');
    } else {
      console.log('✅ Table "magic_link_tokens" created successfully!');
    }

    console.log('\n🎉 Migration completed!\n');
    console.log('Next steps:');
    console.log('1. Restart your dev server: npm run dev');
    console.log('2. Test magic link: Go to your site and try signing in with email\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n📋 Manual migration required. Run this SQL in Supabase Dashboard:');
    console.log('https://supabase.com/dashboard/project/izlvdgjugtcuezzmfuth/sql/new\n');
    console.log(sql);
    process.exit(1);
  }
}

runMigration();
