// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://brdkfupgyjwlzfopmjcm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZGtmdXBneWp3bHpmb3BtamNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2OTMwMTQsImV4cCI6MjA0OTI2OTAxNH0.v18Gl6DFaLqLJsKmPn4OqAQ9Woe6h0OZb3wSUE80ooA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);