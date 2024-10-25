import dbConnect from "../../lib/mongodb";
import Coin from "../../models/Coin";
import axios from "axios";
import dayjs from "dayjs"; // Use dayjs for date manipulation

// Function to get data from CoinGecko
async function getCoinsFromCoinGecko() {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 50, // You can adjust this number to get more coins
                    page: 1,
                    sparkline: false,
                },
            }
        );
        return response.data || [];
    } catch (error) {
        console.error("Error fetching coins from CoinGecko:", error);
        return [];
    }
}

// Function to fetch data from Dexscreener for given contract addresses
async function getCryptoStatsByAddresses(coinAddresses) {
    try {
        const promises = coinAddresses.map(async (address) => {
            const url = `https://api.dexscreener.com/latest/dex/search?q=${address}`;
            const response = await axios.get(url);
            return response.data.pairs.length > 0
                ? response.data.pairs[0]
                : null;
        });

        const statsArray = await Promise.all(promises);
        return statsArray.filter((stat) => stat !== null); // Filter out any null results
    } catch (error) {
        console.error("Error fetching crypto data from Dexscreener:", error);
        return null;
    }
}

// Calculate the age of a coin
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
            // Fetch coins from your database
            const coins = await Coin.find({});
            const coinAddresses = coins.map((coin) => coin.contractAddress.toLowerCase());

            // Fetch external coins from CoinGecko
            const externalCoins = await getCoinsFromCoinGecko();

            // Get contract addresses from CoinGecko coins for Dexscreener querying
            const externalCoinAddresses = externalCoins
                .map((coin) => coin.contract_address?.toLowerCase())
                .filter(Boolean); // Filter out any null or undefined values

            // Fetch Dexscreener data for all coins (both from DB and CoinGecko)
            const allCoinAddresses = [...coinAddresses, ...externalCoinAddresses];
            const stats = await getCryptoStatsByAddresses(allCoinAddresses);

            // Create a dictionary for quick lookup
            const dexData = stats
                ? Object.fromEntries(
                      stats.map((stat) => [
                          stat.baseToken.address.toLowerCase(),
                          stat,
                      ])
                  )
                : {};

            // Merge database coins and external CoinGecko coins
            const coinsData = coins.map((coin) => {
                const coinDataFromDex =
                    dexData[coin.contractAddress.toLowerCase()];

                return {
                    symbol: coin.symbol,
                    name: coin.name,
                    slug: coin.slug,
                    volume_24h: coinDataFromDex?.volume?.h24 || 0,
                    price: coinDataFromDex?.priceUsd || "N/A",
                    percent_change_1h: coinDataFromDex?.priceChange?.h1 || 0,
                    percent_change_6h: coinDataFromDex?.priceChange?.h6 || 0,
                    percent_change_24h: coinDataFromDex?.priceChange?.h24 || 0,
                    market_cap: coinDataFromDex?.marketCap || 0,
                    age: calculateCoinAge(coinDataFromDex?.pairCreatedAt),
                    lp: coinDataFromDex?.liquidity?.usd || 0,
                    isPromote: coin.isPromote,
                    votes: coin.votes || 0,
                    txn:
                        (coinDataFromDex?.txns?.h24?.buys || 0) +
                        (coinDataFromDex?.txns?.h24?.sells || 0),
                    image: coinDataFromDex?.info?.imageUrl || coin.imageUrl,
                    isExternal: false, // Database coin
                };
            });

            // Add external CoinGecko coins that are not in the database
            externalCoins.forEach((extCoin) => {
                const coinAddress = extCoin.contract_address?.toLowerCase();
                if (coinAddress && !coinAddresses.includes(coinAddress)) {
                    const coinDataFromDex = dexData[coinAddress];

                    coinsData.push({
                        symbol: extCoin.symbol,
                        name: extCoin.name,
                        slug: extCoin.id,
                        volume_24h: coinDataFromDex?.volume?.h24 || 0,
                        price: extCoin.current_price || "N/A",
                        percent_change_1h: coinDataFromDex?.priceChange?.h1 || 0,
                        percent_change_6h: coinDataFromDex?.priceChange?.h6 || 0,
                        percent_change_24h: coinDataFromDex?.priceChange?.h24 || 0,
                        market_cap: extCoin.market_cap || 0,
                        age: coinDataFromDex?.pairCreatedAt
                            ? calculateCoinAge(coinDataFromDex.pairCreatedAt)
                            : "N/A",
                        lp: coinDataFromDex?.liquidity?.usd || "N/A",
                        isPromote: false, // Default value for external coins
                        votes: 0, // Default value for external coins
                        txn:
                            (coinDataFromDex?.txns?.h24?.buys || 0) +
                            (coinDataFromDex?.txns?.h24?.sells || 0),
                        image: extCoin.image || "",
                        isExternal: true, // Mark as external coin
                    });
                }
            });

            return res.status(200).json(coinsData);
        } catch (error) {
            console.error("Error querying database:", error);
            return res.status(500).json({ error: "Error querying database" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
