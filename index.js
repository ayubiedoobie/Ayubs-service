// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET /posts - return all posts
app.get("/posts", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, content, user_id, created_at");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
  
});

const PORT = process.env.PORT || 5001;//update
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});