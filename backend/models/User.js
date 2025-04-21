const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Expecting hashed password from routes
    userUPIId: { type: String, unique: true },
    qrCode: { type: String }, // Stores the QR code file path
    image: { type: String }, // Stores the profile image file path
    isAdmin: { type: Boolean, default: false }, // Admin role stored in DB
  },
  { timestamps: true }
);

// Pre-save hook to generate UPI ID and QR Code
userSchema.pre("save", async function (next) {
  // Generate Unique UPI ID if not already set
  if (!this.userUPIId) {
    this.userUPIId = `user${Date.now()}@xpay`;
  }

  // Generate QR Code
  await this.generateQRCode();

  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, phoneNumber: this.phoneNumber, isAdmin: this.isAdmin }, // Admin status from DB
    process.env.JWT_SECRET || "defauslt_secret",
    { expiresIn: "7d" }
  );
};

// Generate QR Code for UPI ID and save as a file
userSchema.methods.generateQRCode = async function () {
  try {
    const qrData = `upi://pay?pa=${this.userUPIId}&pn=${this.name}`;
    const uploadDir = path.join(__dirname, "../uploads");

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const qrPath = path.join(uploadDir, `${this._id}_qrcode.png`);
    await QRCode.toFile(qrPath, qrData);
    this.qrCode = `/uploads/${this._id}_qrcode.png`;
  } catch (error) {
    console.error("QR Code generation failed:", error);
  }
};

// Set User Profile Image
userSchema.methods.setProfileImage = function (filePath) {
  this.image = filePath;
};

// Check if user is admin
userSchema.methods.checkIfAdmin = function () {
  return this.isAdmin;
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;























// global data
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const QRCode = require("qrcode");
// const path = require("path");
// const fs = require("fs");
// const { GridFSBucket } = require("mongodb");

// // Set up GridFS storage
// const connection = mongoose.connection;
// let bucket;

// // Initialize GridFSBucket when the connection is open
// connection.once("open", () => {
//   bucket = new GridFSBucket(connection.db, {
//     bucketName: "userFiles", // Name of the bucket for storing files
//   });
// });

// // Define User Schema
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }, // Expecting hashed password from routes
//     userUPIId: { type: String, unique: true },
//     qrCode: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" }, // Store QR Code file ID from GridFS
//     image: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" }, // Store Profile Image file ID from GridFS
//     isAdmin: { type: Boolean, default: false }, // Admin role stored in DB
//   },
//   { timestamps: true }
// );

// // Pre-save hook to generate UPI ID and QR Code
// userSchema.pre("save", async function (next) {
//   // Generate Unique UPI ID if not already set
//   if (!this.userUPIId) {
//     this.userUPIId = `user${Date.now()}@xpay`;
//   }

//   // Generate QR Code and upload it to GridFS
//   await this.generateQRCode();

//   next();
// });

// // Generate JWT token
// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign(
//     { id: this._id, phoneNumber: this.phoneNumber, isAdmin: this.isAdmin }, // Admin status from DB
//     process.env.JWT_SECRET || "default_secret",
//     { expiresIn: "7d" }
//   );
// };

// // Generate QR Code for UPI ID and save it to GridFS
// userSchema.methods.generateQRCode = async function () {
//   try {
//     const qrData = `upi://pay?pa=${this.userUPIId}&pn=${this.name}`;
//     const qrImage = await QRCode.toBuffer(qrData); // Generate QR code as a buffer

//     // Upload QR code buffer to GridFS
//     const uploadStream = bucket.openUploadStream(`qrCode_${this._id}.png`);
//     uploadStream.end(qrImage);

//     // Store the ObjectId of the uploaded QR code in the user document
//     uploadStream.on("finish", () => {
//       this.qrCode = uploadStream.id; // Save the ObjectId of the uploaded file
//     });
//   } catch (error) {
//     console.error("QR Code generation failed:", error);
//   }
// };

// // Set User Profile Image and upload to GridFS
// userSchema.methods.setProfileImage = async function (filePath) {
//   try {
//     const fileStream = fs.createReadStream(filePath); // Read the image file
//     const uploadStream = bucket.openUploadStream(`profile_${this._id}.jpg`);

//     // Pipe the image file into GridFS
//     fileStream.pipe(uploadStream);

//     uploadStream.on("finish", () => {
//       this.image = uploadStream.id; // Store the file's ObjectId in the user document
//     });
//   } catch (error) {
//     console.error("Profile Image upload to GridFS failed:", error);
//   }
// };

// // Check if user is admin
// userSchema.methods.checkIfAdmin = function () {
//   return this.isAdmin;
// };

// const User = mongoose.model("User", userSchema, "users");

// module.exports = User;
