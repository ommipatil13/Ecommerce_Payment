const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const stripe = require("stripe")(process.env.SECRET_KET)

const path = require('path')

app.use(express.json())
app.use(cors())

app.post('/api/create-checkout-session', async (req, res) => {
    const { products } = req.body;
    // console.log(products)

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.dish
            },
            unit_amount: product.price * 100
        },
        quantity: product.qnty
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://ecommerce-payment.onrender.com',
        cancel_url: 'https://ecommerce-payment.onrender.com'
    })

    res.json({ id: session.id })

})


app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(7000, () => {
    console.log('server running 7000')
})