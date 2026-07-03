ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS razorpay_link_id text;
CREATE INDEX IF NOT EXISTS idx_quotations_razorpay_link_id ON public.quotations(razorpay_link_id);