// ================================
// CONFIGURACIÓN SUPABASE
// ================================

const SUPABASE_URL = 'https://mnfoalfcnyfqrrreibkw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZm9hbGZjbnlmcXJycmVpYmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDY0NzEsImV4cCI6MjA5NTkyMjQ3MX0.poSsGmWGBH7NGTEUuPkzWPASlHDuGyXx9frYljlHpwo';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function getHeaders() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    const token = session ? session.access_token : SUPABASE_KEY;
    
    return {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`
    };
}