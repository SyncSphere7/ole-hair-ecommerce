-- Fix users table conflict between old migration (auth.users reference) and NextAuth requirements
-- This migration ensures the users table works with both Supabase Auth and NextAuth

-- First, drop the foreign key constraint if it exists (from old migration)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'users_id_fkey' 
        AND table_name = 'users'
    ) THEN
        ALTER TABLE public.users DROP CONSTRAINT users_id_fkey;
    END IF;
END $$;

-- Ensure users table has all required NextAuth columns
-- Add email_verified if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'email_verified'
    ) THEN
        ALTER TABLE public.users ADD COLUMN email_verified TIMESTAMPTZ;
    END IF;
END $$;

-- Fix the primary key constraint if needed
-- Remove the reference to auth.users and make it standalone
DO $$ 
BEGIN
    -- Check if the users table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') THEN
        -- Ensure id column can generate its own UUIDs
        ALTER TABLE public.users ALTER COLUMN id SET DEFAULT gen_random_uuid();
    END IF;
END $$;

-- Update RLS policies to work with service_role
-- Drop old policies and recreate with correct permissions
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
DROP POLICY IF EXISTS "Service role has full access" ON public.users;

-- Critical: Service role must be able to do EVERYTHING (NextAuth needs this)
CREATE POLICY "Service role has full access" ON public.users
  FOR ALL 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Recreate user policies
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Fix foreign key constraints in accounts and sessions tables
-- Make sure they cascade properly
ALTER TABLE public.accounts DROP CONSTRAINT IF EXISTS fk_user;
ALTER TABLE public.accounts ADD CONSTRAINT fk_user 
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE public.sessions DROP CONSTRAINT IF EXISTS fk_user;
ALTER TABLE public.sessions ADD CONSTRAINT fk_user 
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update RLS policies on accounts to ensure service_role access
DROP POLICY IF EXISTS "Service role can manage all accounts" ON public.accounts;
CREATE POLICY "Service role has full access to accounts" ON public.accounts
  FOR ALL 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Update RLS policies on sessions to ensure service_role access
DROP POLICY IF EXISTS "Service role can manage all sessions" ON public.sessions;
CREATE POLICY "Service role has full access to sessions" ON public.sessions
  FOR ALL 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Update RLS policies on verification_tokens to ensure service_role access
DROP POLICY IF EXISTS "Service role can manage all verification tokens" ON public.verification_tokens;
CREATE POLICY "Service role has full access to verification_tokens" ON public.verification_tokens
  FOR ALL 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
