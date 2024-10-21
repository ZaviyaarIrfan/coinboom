import dbConnect from "../../lib/mongodb"; 
import Coin from "../../models/Coin"; 
import axios from "axios";
import dayjs from "dayjs"; // Use dayjs for date manipulation

// Function to get CoinMarketCap data
async function getCryptoStatsBySymbols(coinSymbols) {
    try {
        // Join the coin symbols into a single comma-separated string
        const symbols = coinSymbols.join(",");

        // CoinMarketCap API URL for fetching multiple coins' data
        const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;

        // Make the request to CoinMarketCap
        const response = await axios.get(url, {
            headers: {
                'X-CMC_PRO_API_KEY': 'fad3c46a-34f5-408e-b9cb-720519b3cfad', // Replace with your actual API key
            },
            params: {
                symbol: symbols, // Query coins by their symbols
                convert: 'USD'   // Convert to USD
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

    // Convert age to a more readable format
    if (ageInDays < 30) {
        return `${ageInDays}d`; // Days
    } else if (ageInDays < 365) {
        const months = Math.floor(ageInDays / 30);
        return `${months}mo`; // Months
    } else {
        const years = Math.floor(ageInDays / 365);
        return `${years}y`; // Years
    }
}

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        try {
            // Query the database for coins and select the required fields
            const coins = await Coin.find({});

            const coinSymbols = coins.map((coin) => coin.symbol.toUpperCase());

            if (coinSymbols.length === 0) {
                return res
                    .status(404)
                    .json({
                        message: "No coins found in the database",
                    });
            }

            // Call the function to get crypto stats from CoinMarketCap
            const stats = await getCryptoStatsBySymbols(coinSymbols);

            if (stats) {
                // Map through the stats to add the age of each coin
                const statsWithAge = stats.map((stat) => {
                    const coin = coins.find((c) => c.symbol.toUpperCase() === stat.symbol);

                    return {
                        ...stat,
                        isPromote: coin.isPromote,
                        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${stat.id}.png`,
                        age: coin ? calculateCoinAge(coin.createdAt) : "--",
                    };
                });

                return res.status(200).json(statsWithAge);
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
