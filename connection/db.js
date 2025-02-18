const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
// Test connection
(async () => {
  const { data, error } = await supabase.from("users").select("*").limit(1);
  if (error) {
    console.error("Supabase connection error:", error.message);
  } else {
    console.log("Supabase connected successfully!");
  }
})();

module.exports = supabase;
