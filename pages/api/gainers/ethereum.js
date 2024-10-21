import dbConnect from "../../../lib/mongodb";
import Coin from "../../../models/Coin";
import axios from "axios";
import dayjs from "dayjs"; // Use dayjs for date manipulation

// Function to get CoinMarketCap data
async function getCryptoStatsBySymbols(coinSymbols) {
    try {
        const symbols = coinSymbols.join(",");

        const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;

        const response = await axios.get(url, {
            headers: {
                "X-CMC_PRO_API_KEY": "fad3c46a-34f5-408e-b9cb-720519b3cfad",
            },
            params: {
                symbol: symbols,
                convert: "USD",
            },
        });

        const data = response.data.data;

        // Process the response to extract key stats for each coin
        const statsArray = Object.keys(data).map((key) => ({
            ...data[key],
        }));

        return statsArray;
    } catch (error) {
        console.error("Error fetching crypto data from CoinMarketCap:", error);
        return null;
    }
}

// Function to calculate the coin's age
function calculateCoinAge(createdAt) {
    const now = dayjs();
    const creationDate = dayjs(createdAt);
    const ageInDays = now.diff(creationDate, "day");

    if (ageInDays < 30) {
        return `${ageInDays}d`;
    } else if (ageInDays < 365) {
        const months = Math.floor(ageInDays / 30);
        return `${months}mo`;
    } else {
        const years = Math.floor(ageInDays / 365);
        return `${years}y`;
    }
}

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        try {
            const coins = await Coin.find({ blockchain: "ETH" });
            const coinSymbols = coins.map((coin) => coin.symbol.toUpperCase());

            if (coinSymbols.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No coins found in the database" });
            }

            const stats = await getCryptoStatsBySymbols(coinSymbols);

            if (stats) {
                // Sort coins by 24-hour percentage change in descending order
                const dailyGainers = stats
                    .map((stat) => ({
                        ...stat,
                        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${stat.id}.png`,
                    }))
                    .sort(
                        (a, b) =>
                            b.quote.USD.percent_change_24h -
                            a.quote.USD.percent_change_24h
                    );

                return res.status(200).json(dailyGainers);
            } else {
                return res
                    .status(500)
                    .json({ error: "Error fetching stats from CoinMarketCap" });
            }
        } catch (error) {
            console.error("Error querying database:", error);
            return res.status(500).json({ error: "Error querying database" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
