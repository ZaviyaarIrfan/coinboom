import dbConnect from "../../../lib/mongodb";
import Coin from "../../../models/Coin";
import axios from "axios";
import dayjs from "dayjs"; // For date manipulation

// Helper to fetch stats from CoinMarketCap
async function getCryptoStatsBySymbols(coinSymbols) {
    try {
        const symbols = coinSymbols.join(",");
        const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;

        const response = await axios.get(url, {
            headers: {
                "X-CMC_PRO_API_KEY": "fad3c46a-34f5-408e-b9cb-720519b3cfad", // Replace with your API key
            },
            params: { symbol: symbols, convert: "USD" },
        });

        return Object.values(response.data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// Helper to calculate coin age
function isNewCoin(createdAt) {
    const now = dayjs();
    const creationDate = dayjs(createdAt);
    return now.diff(creationDate, "day") < 30; // Returns true if less than 30 days old
}

// API Handler Logic
export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // Query for coins by 'arbitrum' and check their creation age
        const coins = await Coin.find({ blockchain: 'arbitrum' });

        const newCoins = coins.filter((coin) => isNewCoin(coin.createdAt));
        const coinSymbols = newCoins.map((coin) => coin.symbol.toUpperCase());

        if (coinSymbols.length === 0) {
            return res.status(404).json({ message: "No new coins found" });
        }

        const stats = await getCryptoStatsBySymbols(coinSymbols);

        if (stats) {
            const result = stats.map((stat) => {
                const coin = newCoins.find(
                    (c) => c.symbol.toUpperCase() === stat.symbol
                );

                return {
                    ...stat,
                    image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${stat.id}.png`,
                    age: coin
                        ? `${dayjs().diff(coin.createdAt, "day")}d`
                        : "--",
                };
            });

            return res.status(200).json(result);
        } else {
            return res
                .status(500)
                .json({ error: "Failed to fetch coin stats" });
        }
    } catch (error) {
        console.error("Error querying database:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
}
