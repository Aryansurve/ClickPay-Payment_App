const express = require("express");
const Business = require("../models/Business");

const router = express.Router();

// 📌 Create a new business (Store image as Base64 in MongoDB)
router.post("/", async (req, res) => {
    try {
        const { name, image } = req.body; // Image should be Base64-encoded
        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }
        const newBusiness = new Business({ name, image }); // Store Base64 string
        await newBusiness.save();
        res.status(201).json(newBusiness);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create business" });
    }
});


// 📌 Get all businesses (Returns Base64 images)
router.get("/", async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch businesses" });
    }
});

module.exports = router;
