import dbConnect from "../../lib/mongodb";
import Coin from "../../models/Coin";
import axios from "axios";
import dayjs from "dayjs";

// Function to fetch coins from an external API like CoinGecko
async function fetchCoinsFromExternalApi() {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/markets`;
        const response = await axios.get(url, {
            params: {
                vs_currency: "usd",
            },
        });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching data from external API:", error);
        return [];
    }
}

// Function to check if a coin exists in the local database
function isCoinInDatabase(coin, existingCoins) {
    return existingCoins.some(
        (dbCoin) =>
            dbCoin.symbol.toLowerCase() === coin.symbol.toLowerCase() ||
            dbCoin.contractAddress?.toLowerCase() ===
                coin.contractAddress?.toLowerCase()
    );
}

// Function to calculate the age of the coin
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
            // Step 1: Fetch coins from the local database
            const existingCoins = await Coin.find({});

            // Step 2: Fetch coins from the external API
            const externalCoins = await fetchCoinsFromExternalApi();

            // Step 3: Filter out the coins already in the database
            const newCoins = externalCoins.filter(
                (coin) => !isCoinInDatabase(coin, existingCoins)
            );

            // Step 4: Merge new coins with existing data if needed or just return the new coins
            const newCoinsData = newCoins.map((coin) => ({
                symbol: coin.symbol,
                name: coin.name,
                slug: coin.id, // assuming 'id' is used as a slug here
                volume_24h: coin.total_volume,
                price: coin.current_price,
                percent_change_24h: coin.price_change_percentage_24h,
                market_cap: coin.market_cap,
                age: calculateCoinAge(
                    coin.genesis_date ||
                        dayjs().subtract(1, "year").toISOString()
                ),
                image: coin.image,
                isPromote: false, // default value
                txn: 0, // or any other logic
            }));

            const combinedCoins = [...existingCoins, ...newCoins]

            // Step 5: Return the new coins that were not in the database
            return res
                .status(200)
                .json(combinedCoins);
        } catch (error) {
            console.error("Error fetching and filtering coins:", error);
            return res
                .status(500)
                .json({ error: "Error fetching and filtering coins" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
