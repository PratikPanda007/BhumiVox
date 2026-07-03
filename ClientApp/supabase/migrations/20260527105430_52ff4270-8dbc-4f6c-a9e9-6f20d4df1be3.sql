
-- Quotations table
CREATE TABLE public.quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.journey_requests(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  payment_link text,
  link_source text NOT NULL DEFAULT 'manual',
  document_url text,
  document_name text,
  document_mime text,
  notes text,
  email_status text NOT NULL DEFAULT 'pending',
  email_payload jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.quotations TO authenticated;
GRANT ALL ON public.quotations TO service_role;

ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view quotations" ON public.quotations
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert quotations" ON public.quotations
  FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update quotations" ON public.quotations
  FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));

CREATE INDEX idx_quotations_request_id ON public.quotations(request_id);

-- Add latest-quotation pointer on journey_requests
ALTER TABLE public.journey_requests ADD COLUMN quotation_id uuid REFERENCES public.quotations(id) ON DELETE SET NULL;

-- Storage bucket for quotation documents
INSERT INTO storage.buckets (id, name, public) VALUES ('quotation-docs', 'quotation-docs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Quotation docs are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'quotation-docs');

CREATE POLICY "Admins can upload quotation docs"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'quotation-docs' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update quotation docs"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'quotation-docs' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete quotation docs"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'quotation-docs' AND public.is_admin(auth.uid()));
