-- OTP Verifications Table
-- Stores OTPs for phone verification (Supabase Auth handles email OTPs)

CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- email or phone
  otp TEXT NOT NULL,
  type TEXT NOT NULL, -- 'email' or 'phone'
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(identifier, type)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_otp_verifications_identifier ON public.otp_verifications(identifier, type);
CREATE INDEX IF NOT EXISTS idx_otp_verifications_expires_at ON public.otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Service role can manage OTP verifications
CREATE POLICY "Service role can manage otp verifications" ON public.otp_verifications
  FOR ALL USING (auth.role() = 'service_role');

-- Auto-cleanup function
CREATE OR REPLACE FUNCTION cleanup_expired_otp_verifications()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otp_verifications
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION cleanup_expired_otp_verifications() TO authenticated, anon;
