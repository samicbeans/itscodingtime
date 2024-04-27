import { createClient } from '@supabase/supabase-js'
const URL = 'https://xsjqcmwjqqfeuwyqkuds.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzanFjbXdqcXFmZXV3eXFrdWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NzgyMjcsImV4cCI6MjAyOTU1NDIyN30.35MXZhUJg7nvazrX96Vi6UFV8fTGsseDllLVaL8Gk1M';
export const supabase = createClient(URL, API_KEY);