const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, default: 10000 }, // User's current balance
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }] // Link transactions
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", WalletSchema);

