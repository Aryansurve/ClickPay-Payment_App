const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");
const {authMiddleware} = require("../middleware/authMiddleware"); // Middleware to get logged-in user

// Create a transaction
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, amount, status, transactionType, transactionId } = req.body;

    const newTransaction = new Transaction({
      senderId,
      receiverId,
      amount,
      status,
      transactionType,
      transactionId
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

// Get transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
  }
});

// Update transaction status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["failed", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
});


router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Extracted from token by authMiddleware
    const wallet = await Wallet.findOne({ userId });
    console.log("✅ Balance route hit!");
  console.log("User ID:", req.user.id);

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found for this user" });
    }

    res.json({ balance: wallet.balance });
  } catch (err) {
    console.error("Error fetching wallet balance:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
