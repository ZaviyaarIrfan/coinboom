import axios from 'axios';
import cron from 'node-cron';
import FormData from 'form-data';

// Fetch recently added coins from CoinGecko
async function fetchNewCoinsFromCoinGecko() {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets', 
            {
                params: {
                    vs_currency: 'usd', 
                    order: 'market_cap_asc', // Get lower market cap coins, usually newer
                    per_page: 10, // Fetch 10 coins, adjust as needed
                    page: 1,
                    sparkline: false,
                    price_change_percentage: '24h',
                },
            }
        );

        // Filter coins that have been listed recently (less than 30 days)
        const newCoins = response.data.filter(coin => {
            const daysSinceListed = (new Date() - new Date(coin.genesis_date)) / (1000 * 60 * 60 * 24);
            return daysSinceListed < 30; // Only include coins listed in the last 30 days
        });

        return newCoins;
    } catch (error) {
        console.error('Error fetching coins from CoinGecko:', error);
        return [];
    }
}

// Function to submit a new coin to your existing API
async function submitNewCoin(coinData) {
    try {
        const { id, name, symbol, description, image } = coinData;
        const launchDate = new Date().toISOString();

        // Fetch the image as a Buffer
        const imageBuffer = await axios
            .get(image, { responseType: 'arraybuffer' })
            .then(res => Buffer.from(res.data, 'binary'));

        // Create a form-data object for the request
        const form = new FormData();
        form.append('image', imageBuffer, `${symbol}.jpg`);
        form.append('blockchain', 'Ethereum'); // Update as needed
        form.append('contractAddress', '0xExampleAddress123'); // Example address
        form.append('name', name);
        form.append('symbol', symbol);
        form.append('description', description || 'Newly added coin from CoinGecko.');
        form.append('isPresale', 'No');
        form.append('launchDate', launchDate);
        form.append('presaleUrl', `https://coingecko.com/en/coins/${id}`);

        // Submit the coin to your API
        const response = await axios.post(
            'http://localhost:3000/api/your-api-endpoint', // Update your actual endpoint
            form,
            { headers: { ...form.getHeaders() } }
        );

        console.log(`Coin submitted successfully: ${name}`);
    } catch (error) {
        console.error('Error submitting coin:', error);
    }
}

// Fetch coins and submit them every 10 days
async function fetchAndSubmitCoins() {
    console.log('Fetching new coins...');
    const coins = await fetchNewCoinsFromCoinGecko();
    console.log(`Fetched ${coins.length} new coins from CoinGecko.`);

    for (const coin of coins) {
        await submitNewCoin(coin);
    }
}

// Schedule the task to run every 10 days at 12:00 PM
cron.schedule('0 12 */10 * *', () => {
    console.log('Running scheduled coin submission task...');
    fetchAndSubmitCoins();
}, {
    timezone: 'UTC'
});

// Start the script immediately
fetchAndSubmitCoins();
