const express = require("express");
const Transaction = require("../models/Transaction");
const { processPayment } = require("../controllers/paymentController");
const { authenticateUser } = require("../middleware/authMiddleware"); // Ensure correct import
const { authMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

console.log("processPayment function loaded:", !!processPayment); // Debugging log

// ✅ Payment Route
router.post("/pay", authenticateUser, processPayment);

// ✅ Transaction History Route
router.get("/history/:userId", authenticateUser, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || userId.length !== 24) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const transactions = await Transaction.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        })
        .sort({ createdAt: -1 })
        .populate("senderId", "name email") // Fetch sender details
        .populate("receiverId", "name email"); // Fetch receiver details

        res.json(transactions || []); // Always return an array
    } catch (error) {
        console.error("Transaction history error:", error);
        res.status(500).json({ error: "Error fetching transaction history", details: error.message });
    }
});

router.post("/send", authMiddleware, async (req, res) => {
    try {
      const { senderId, receiverId, amount } = req.body;
  
      if (!senderId || !receiverId || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const sender = await User.findById(senderId);
      const receiver = await User.findById(receiverId);
  
      if (!sender || !receiver) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (sender.wallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      // Deduct from sender, add to receiver
      sender.wallet.balance -= amount;
      receiver.wallet.balance += amount;
  
      await sender.save();
      await receiver.save();
  
      res.status(200).json({ message: "Payment successful", newBalance: sender.wallet.balance });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  

module.exports = router;
