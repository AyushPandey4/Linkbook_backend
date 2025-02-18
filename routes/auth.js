const express = require("express");
const supabase = require("../connection/db"); 
require("dotenv").config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // Store extra user details
        emailRedirectTo: "", // Prevents email confirmation
      },
    });

    if (error) throw error;

    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: data.user,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({
      success: true,
      token: data.session.access_token,
      user: data.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
