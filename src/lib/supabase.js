import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qjidtqrkzohguogibwnt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaWR0cXJrem9oZ3VvZ2lid250Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTEyMTAzNSwiZXhwIjoyMTAwNjk3MDM1fQ.iFbAi2XeunH1JmGkx88NdVYlkbgWIn3bm7MzvxKXpnQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
