import axios from 'axios';

// API route to fetch top gainers
export default async function handler(req, res) {
    try {
        // Fetch top coins sorted by 24h percentage gain
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=10&page=1&sparkline=false`;
        const response = await axios.get(url);
        const topGainers = response.data;

        // Send the top gainers data as JSON
        res.status(200).json(topGainers);
    } catch (error) {
        console.error('Error fetching top gainers:', error);
        res.status(500).json({ error: 'Error fetching top gainers' });
    }
}
