import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://vjihnwrbvijqibaccxke.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaWhud3JidmlqcWliYWNjeGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDU5NjksImV4cCI6MjA2MzU4MTk2OX0.dWftGBZdkvj549CYoEA1z6xHbJ_uZOGUeuoYFo6sLvk';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };