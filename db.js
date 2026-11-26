const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/trademe_phase1"
    );

    console.log("MongoDB connected");
};

module.exports = connectDB;