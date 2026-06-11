const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wjqkndjquacfdodcqbzy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqcWtuZGpxdWFjZmRvZGNxYnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjM1MTEsImV4cCI6MjA5NjU5OTUxMX0.DsAKfPeY29zM-ci7l9HmX0rOSqkTPphg1Q4-tsfMSlc'
);

async function check() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Product columns:', Object.keys(data[0] || {}));
  }
}
check();
