// Libraries
const router = require('express').Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const axios = require("axios"); // For making HTTP requests
const { createHash } = require('crypto');
require("dotenv").config(); // Load environment variables

router.post("/create-payment", authenticate, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.userId });
    const customerMail = userData.email;
    const customerName = userData.name;
    const customerMobile = userData.number;
    const netAmount = req.body.netAmount;
    const merchantCode = "AMZ123";
    const paymentMethod = "Just-pay";
    const SecretKey = process.env.Just_SECRET_KEY;

    if (!customerMobile || !customerMail || !netAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const concatenatedData = (
      merchantCode +
      customerName +
      customerMail +
      netAmount +
      paymentMethod +
      SecretKey
    );

    const hash = createHash('sha256');
    hash.update(concatenatedData);
    const expectedSignature = hash.digest('hex');
    res.status(200).json({ signature: expectedSignature });


    const gatewayUrl = "https://your-payment-gateway.com/api/pay"; // Replace with actual URL
    const TIMEOUT = 15000; // 15 seconds timeout

    const response = await axios.post(gatewayUrl, {
      merchantCode,
      customerName,
      customerMail,
      customerMobile,
      netAmount,
      paymentMethod,
      signature: expectedSignature,
    }, { timeout: TIMEOUT });

    res.status(200).json({ message: "Payment processed successfully", response: response.data });

  } catch (error) {
    console.error("Payment error:", error.message);
    res.status(500).json({ message: "Payment processing failed", error: error.message });
  }
});

module.exports = router;


