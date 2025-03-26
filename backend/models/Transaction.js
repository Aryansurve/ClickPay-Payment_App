// const mongoose = require("mongoose");

// const TransactionSchema = new mongoose.Schema({
//     transactionId: { type: String, unique: true, required: true },
//     senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     amount: { type: Number, required: true },
//     transactionType: { type: String, enum: ["send", "receive"], required: true },
//     status: { type: String, enum: ["completed", "failed"], default: "completed" },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Transaction", TransactionSchema);
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    transactionId: { type: String, unique: true, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ["send", "receive"], required: true },
    status: { type: String, enum: ["completed", "failed"], default: "completed" },
    location: { type: mongoose.Schema.Types.Mixed, default: {} },  // Added location field
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
