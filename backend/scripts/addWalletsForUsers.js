const mongoose = require("mongoose");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
require("dotenv").config();

async function addWallets() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const users = await User.find(); // Get all users
    console.log(`Found ${users.length} users.`);

    for (const user of users) {
      const existingWallet = await Wallet.findOne({ userId: user._id });

      if (!existingWallet) {
        const newWallet = new Wallet({ userId: user._id, balance: 10000 });
        await newWallet.save();
        console.log(`Wallet created for user: ${user._id}`);
      } else {
        console.log(`Wallet already exists for user: ${user._id}`);
      }
    }

    console.log("✅ Wallet setup completed.");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
}

addWallets();
