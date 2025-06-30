import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'free' | 'pro' | 'admin';
  subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  books_created: number;
  books_limit: number;
  api_calls_used: number;
  api_calls_limit: number;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}
