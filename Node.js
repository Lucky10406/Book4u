const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'OPHbfeL7nthoJd', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_SECRET' // Replace with your Razorpay Secret
});

app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body; // Amount in rupees

    try {
        const options = {
            amount: amount * 100, // Amount is in paise
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 1 // Automatically capture payment
        };

        const order = await razorpay.orders.create(options);
        res.json({ id: order.id, amount: order.amount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

