const mongoose = require("mongoose");
const connectDB = require("./db");
const Auction = require("./models/Auction");
const auctions = require("./data/auctions.json");

const run = async () => {
    const command = process.argv[2];

    try {
        await connectDB();

        if (command === "seed") {

            for (const item of auctions) {
                await Auction.updateOne(
                    { title: item.title },
                    { $set: item },
                    { upsert: true }
                );
            }

            console.log("Auction data added successfully");

        } else if (command === "delete") {

            const titles = auctions.map(item => item.title);

            await Auction.deleteMany({
                title: { $in: titles }
            });

            console.log("Auction data deleted successfully");

        } else {
            console.log("Use seed or delete");
        }

    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

run();