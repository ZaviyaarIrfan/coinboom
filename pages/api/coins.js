import dbConnect from "../../lib/mongodb";
import Coin from "../../models/Coin";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        try {
            const coins = await Coin.find({});

            return res.status(200).json(coins); // Return the found coin
        } catch (error) {
            console.error("Error querying database:", error);
            return res.status(500).json({ error: "Error querying database" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
