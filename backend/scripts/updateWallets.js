const mongoose = require("mongoose");
const Wallet = require("../models/Wallet");
require("dotenv").config();

async function updateWallets() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Update all wallets: Remove frozenBalance, add transactions array
    const result = await Wallet.updateMany(
      {},
      { 
        $unset: { frozenBalance: "" },  // Remove frozenBalance field
        $set: { transactions: [] }      // Add transactions array if missing
      }
    );

    console.log(`✅ Wallets updated: ${result.modifiedCount}`);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
}

updateWallets();
