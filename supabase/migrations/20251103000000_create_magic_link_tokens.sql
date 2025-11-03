-- Magic Link Tokens Table
-- Stores temporary tokens for passwordless email authentication

CREATE TABLE IF NOT EXISTS public.magic_link_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_magic_link_tokens_token ON public.magic_link_tokens(token);
CREATE INDEX IF NOT EXISTS idx_magic_link_tokens_email ON public.magic_link_tokens(email);
CREATE INDEX IF NOT EXISTS idx_magic_link_tokens_expires_at ON public.magic_link_tokens(expires_at);

-- Enable Row Level Security
ALTER TABLE public.magic_link_tokens ENABLE ROW LEVEL SECURITY;

-- Only allow service role to manage tokens (API endpoints will use service role)
CREATE POLICY "Service role can manage tokens" ON public.magic_link_tokens
  FOR ALL USING (auth.role() = 'service_role');

-- Function to clean up expired tokens (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_magic_link_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM public.magic_link_tokens
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION cleanup_expired_magic_link_tokens() TO authenticated;
