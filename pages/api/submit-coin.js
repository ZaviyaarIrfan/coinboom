import dbConnect from '../../lib/mongodb';
import Coin from '../../models/Coin';
import { storage } from '../../firebaseConfig';
import multer from 'multer';

// Middleware for handling multipart form data
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, we'll handle it with multer
    },
};

const handler = async (req, res) => {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { blockchain, contractAddress, name, symbol, description, isPresale, launchDate, presaleUrl } = req.body;
            const file = req.file;

            // Upload the image to Firebase Storage
            const storageRef = storage.ref(`/images/${file.originalname}`);
            await storageRef.put(file.buffer);
            const imageUrl = await storageRef.getDownloadURL();

            // Save data in MongoDB
            const newCoin = new Coin({
                blockchain,
                contractAddress,
                name,
                symbol,
                description,
                isPresale,
                launchDate,
                presaleUrl,
                imageUrl,
            });
            await newCoin.save();

            res.status(200).json({ message: 'Coin submitted successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Error submitting data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default upload.single('image')(handler);
