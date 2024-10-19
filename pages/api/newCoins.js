import axios from 'axios';

// API route to fetch new coins
export default async function handler(req, res) {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=10&page=1&sparkline=false`;
        const response = await axios.get(url);
        const newCoins = response.data;

        // Send new coins data back as JSON
        res.status(200).json(newCoins);
    } catch (error) {
        console.error('Error fetching new coins:', error);
        res.status(500).json({ error: 'Error fetching new coins' });
    }
}
