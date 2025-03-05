const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Store Base64 string
});

module.exports = mongoose.model("Business", BusinessSchema);
