import mongoose from 'mongoose';

const CoinSchema = new mongoose.Schema({
    blockchain: String,
    contractAddress: String,
    name: String,
    symbol: String,
    description: String,
    isPresale: String,
    launchDate: String,
    presaleUrl: String,
    imageUrl: String,
});

export default mongoose.models.Coin || mongoose.model('Coin', CoinSchema);
