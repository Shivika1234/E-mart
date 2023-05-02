const express = require('express')
const paymentRoute = express.Router()


const { checkout, paymentVerification } = require("../controllers/paymentController")

paymentRoute.post("/checkout",checkout)
paymentRoute.post("/paymentverification",paymentVerification)

module.exports={paymentRoute}