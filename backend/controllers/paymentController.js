const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

const processPayment = async (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;

        if (!senderId || !receiverId || !amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid payment request" });
        }

        if (req.user.id !== senderId) {
            return res.status(403).json({ error: "Unauthorized transaction" });
        }

        // Fetch sender and receiver wallets
        const senderWallet = await Wallet.findOne({ userId: senderId });
        const receiverWallet = await Wallet.findOne({ userId: receiverId });

        if (!senderWallet || !receiverWallet) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        if (senderWallet.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        // Deduct from sender, add to receiver
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;

        // Generate unique transaction ID
        const transactionId = uuidv4();

        // Create transaction object
        const newTransaction = new Transaction({
            transactionId,
            senderId,
            receiverId,
            amount,
            transactionType: "send",
            status: "completed",
        });

        // Save transaction and update wallets
        await newTransaction.save();
        senderWallet.transactions.push(newTransaction._id);
        receiverWallet.transactions.push(newTransaction._id);
        await senderWallet.save();
        await receiverWallet.save();

        return res.status(200).json({
            message: "Payment successful",
            transactionId,
            transaction: newTransaction
        });

    } catch (error) {
        console.error("Payment Processing Error:", error);
        return res.status(500).json({ error: error.message || "Payment failed" });
    }
};

module.exports = { processPayment };
