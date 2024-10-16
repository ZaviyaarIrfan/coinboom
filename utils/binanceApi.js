import axios from "axios";
import crypto from "crypto";

const BINANCE_API_KEY = process.env.BINANCE_API_KEY;
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET;

const BINANCE_API_URL = "https://bpay.binanceapi.com";

// Generate the signature required for Binance Pay
const generateSignature = (params, secret) => {
    const queryString = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&");
    return crypto
        .createHmac("sha256", secret)
        .update(queryString)
        .digest("hex");
};

// Create a Binance payment order
export const createPaymentOrder = async (params) => {
    try {
        const timestamp = Date.now();
        const nonce = crypto.randomBytes(16).toString("hex");
        
        const payloadWithTimestamp = {
            ...params,
            timestamp,
        };

        const signature = generateSignature(payloadWithTimestamp, BINANCE_API_SECRET);

        const response = await axios.post(
            `${BINANCE_API_URL}/binancepay/openapi/v2/order`,
            payloadWithTimestamp,  // Send the payload with timestamp
            {
                headers: {
                    "Content-Type": "application/json",
                    "BinancePay-Timestamp": timestamp,
                    "BinancePay-Nonce": nonce,
                    "BinancePay-Certificate-SN": BINANCE_API_KEY,
                    "BinancePay-Signature": signature,
                },
            }
        );

        if (!response.data || response.data.status !== "SUCCESS") {
            throw new Error(response.data?.message || "Failed to create payment order");
        }

        return response.data;
    } catch (error) {
        console.error("Error creating payment order:", error);
        throw error;
    }
};
