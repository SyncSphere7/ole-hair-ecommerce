-- This migration adds Pesapal integration columns to existing orders table
-- Safe to re-run multiple times

-- Add pesapal_tracking_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'orders' 
                   AND column_name = 'pesapal_tracking_id') THEN
        ALTER TABLE orders ADD COLUMN pesapal_tracking_id TEXT;
        CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_pesapal_tracking_unique ON orders(pesapal_tracking_id) WHERE pesapal_tracking_id IS NOT NULL;
    END IF;
END $$;

-- Add payment_status_description column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'orders' 
                   AND column_name = 'payment_status_description') THEN
        ALTER TABLE orders ADD COLUMN payment_status_description TEXT;
    END IF;
END $$;

-- Add payment_account column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'orders' 
                   AND column_name = 'payment_account') THEN
        ALTER TABLE orders ADD COLUMN payment_account TEXT;
    END IF;
END $$;

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'orders' 
                   AND column_name = 'updated_at') THEN
        ALTER TABLE orders ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create helpful indexes
CREATE INDEX IF NOT EXISTS idx_orders_pesapal_tracking_id ON orders(pesapal_tracking_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Add helpful comments
COMMENT ON COLUMN orders.pesapal_tracking_id IS 'Unique tracking ID from Pesapal for payment verification';
COMMENT ON COLUMN orders.payment_status_description IS 'Human-readable payment status from Pesapal';
COMMENT ON COLUMN orders.payment_account IS 'Payment account/phone number used';
