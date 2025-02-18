const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const supabase = require("../connection/db"); // Import Supabase client

const router = express.Router();

// Add a new link
router.post("/links", authMiddleware, async (req, res) => {
  const { link, description } = req.body;
  if (!link || !description) {
    return res.status(400).json({ error: "Link and description are required" });
  }

  try {
    const { data, error } = await supabase
      .from("links")
      .insert([{ user_id: req.user.id, link, description }]);

    if (error) throw error;

    res.status(201).json({ success: true, message: "Link saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all links for a user
router.get("/links", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a link
router.put("/links/:id", authMiddleware, async (req, res) => {
  const { link, description } = req.body;
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("links")
      .update({ link, description })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ error: "Link not found or unauthorized" });

    res.json({ success: true, message: "Link updated", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a link
router.delete("/links/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("links")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ error: "Link not found or unauthorized" });

    res.json({ success: true, message: "Link deleted", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
