import { createPaymentOrder } from "../../binanceApi";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { orderAmount, currency, productDetails } = req.body;

    if (!orderAmount || !currency || !productDetails) {
        return res.status(400).json({
            error: "Missing required fields",
        });
    }

    const params = {
        merchantTradeNo: `order_${Date.now()}`,
        orderAmount,
        currency,
        productDetails,
        returnUrl: "https://yourwebsite.com/payment-success",
        cancelUrl: "https://yourwebsite.com/payment-cancel",
    };

    try {
        const paymentResponse = await createPaymentOrder(params);
        if (paymentResponse.status === "SUCCESS") {
            res.status(200).json({
                paymentLink: paymentResponse.data.paymentUrl,
            });
        } else {
            res.status(400).json({
                error: "Failed to create payment link",
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
