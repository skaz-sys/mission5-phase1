
const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_price: {
        type: Number,
        required: true
    },
    reserve_price: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Auction", auctionSchema);
