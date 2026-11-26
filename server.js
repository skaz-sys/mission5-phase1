const express = require("express");
const connectDB = require("./db");
const Auction = require("./models/Auction");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/auctions", async (req, res) => {
    try {
        const search = req.query.search || "";

        if (typeof search !== "string") {
            return res.status(400).json({
                message: "Invalid search query"
            });
        }

        const keyword = search.replace(
            /[.*+?^${}()|[\]\\]/g, "\\$&"
        );

        const auctions = await Auction.find({
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ]
        });

        res.status(200).json(auctions);

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving auctions"
        });
    }
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error(error.message);
        process.exitCode = 1;
    });