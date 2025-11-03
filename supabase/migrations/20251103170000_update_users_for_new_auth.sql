-- Update users table for new authentication system
-- Adds phone number and auth method tracking

-- Add new columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS auth_method TEXT DEFAULT 'email',
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMPTZ;

-- Add check constraint for auth_method
ALTER TABLE public.users 
ADD CONSTRAINT auth_method_check 
CHECK (auth_method IN ('email', 'phone', 'both'));

-- Create index for phone lookups
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone) WHERE phone IS NOT NULL;

-- Create index for auth method
CREATE INDEX IF NOT EXISTS idx_users_auth_method ON public.users(auth_method);

-- Update RLS policies to include phone-based lookups
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (
    auth.uid() = id OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
    phone = (SELECT phone FROM auth.users WHERE id = auth.uid())
  );

-- OTP attempts tracking table
CREATE TABLE IF NOT EXISTS public.otp_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- email or phone
  attempt_type TEXT NOT NULL, -- 'email' or 'phone'
  attempts_count INTEGER DEFAULT 1,
  last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
  blocked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index for identifier + type
CREATE UNIQUE INDEX IF NOT EXISTS idx_otp_attempts_identifier 
ON public.otp_attempts(identifier, attempt_type);

-- Enable RLS on otp_attempts
ALTER TABLE public.otp_attempts ENABLE ROW LEVEL SECURITY;

-- Service role can manage OTP attempts
CREATE POLICY "Service role can manage otp attempts" ON public.otp_attempts
  FOR ALL USING (auth.role() = 'service_role');

-- Function to check and update OTP rate limiting
CREATE OR REPLACE FUNCTION check_otp_rate_limit(
  p_identifier TEXT,
  p_attempt_type TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_record RECORD;
  v_allowed BOOLEAN := TRUE;
  v_message TEXT := 'OK';
  v_retry_after INTEGER := 0;
BEGIN
  -- Get or create attempt record
  SELECT * INTO v_record
  FROM public.otp_attempts
  WHERE identifier = p_identifier AND attempt_type = p_attempt_type;

  IF v_record IS NULL THEN
    -- First attempt, create record
    INSERT INTO public.otp_attempts (identifier, attempt_type, attempts_count)
    VALUES (p_identifier, p_attempt_type, 1);
    
    RETURN jsonb_build_object(
      'allowed', TRUE,
      'message', 'OK',
      'attempts_remaining', 2
    );
  END IF;

  -- Check if blocked
  IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > NOW() THEN
    v_retry_after := EXTRACT(EPOCH FROM (v_record.blocked_until - NOW()))::INTEGER;
    RETURN jsonb_build_object(
      'allowed', FALSE,
      'message', 'Too many attempts. Please try again later.',
      'retry_after_seconds', v_retry_after
    );
  END IF;

  -- Check if within 15 minute window
  IF v_record.last_attempt_at > NOW() - INTERVAL '15 minutes' THEN
    IF v_record.attempts_count >= 3 THEN
      -- Block for 15 minutes
      UPDATE public.otp_attempts
      SET blocked_until = NOW() + INTERVAL '15 minutes'
      WHERE identifier = p_identifier AND attempt_type = p_attempt_type;
      
      RETURN jsonb_build_object(
        'allowed', FALSE,
        'message', 'Too many attempts. Please try again in 15 minutes.',
        'retry_after_seconds', 900
      );
    ELSE
      -- Increment attempts
      UPDATE public.otp_attempts
      SET 
        attempts_count = attempts_count + 1,
        last_attempt_at = NOW()
      WHERE identifier = p_identifier AND attempt_type = p_attempt_type;
      
      RETURN jsonb_build_object(
        'allowed', TRUE,
        'message', 'OK',
        'attempts_remaining', 3 - (v_record.attempts_count + 1)
      );
    END IF;
  ELSE
    -- Reset counter (outside 15 minute window)
    UPDATE public.otp_attempts
    SET 
      attempts_count = 1,
      last_attempt_at = NOW(),
      blocked_until = NULL
    WHERE identifier = p_identifier AND attempt_type = p_attempt_type;
    
    RETURN jsonb_build_object(
      'allowed', TRUE,
      'message', 'OK',
      'attempts_remaining', 2
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION check_otp_rate_limit(TEXT, TEXT) TO authenticated, anon;

-- Cleanup function for old OTP attempts
CREATE OR REPLACE FUNCTION cleanup_old_otp_attempts()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otp_attempts
  WHERE last_attempt_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment on tables and columns
COMMENT ON COLUMN public.users.phone IS 'User phone number in E.164 format (+256...)';
COMMENT ON COLUMN public.users.auth_method IS 'Primary authentication method: email, phone, or both';
COMMENT ON TABLE public.otp_attempts IS 'Tracks OTP request attempts for rate limiting';
