import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://umqjxfzauvzhmwuzxldr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcWp4ZnphdXZ6aG13dXp4bGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMjIyMjIsImV4cCI6MjAwMTg5ODIyMn0.BLXzzdDl4dj3k3THIGlbfkVx2bSLDOvFct4OhrWmb5s";
const supabase = createClient(supabaseUrl, supabaseKey);

// https://umqjxfzauvzhmwuzxldr.supabase.co/rest/v1/facts
export default supabase;
