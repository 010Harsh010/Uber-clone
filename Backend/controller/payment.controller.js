const { validationResult } = require("express-validator");
const paymentService = require("../services/payment.service.js");
const mongoose = require("mongoose");
const PaymentModel = require("../models/payment.model.js");
const crypto = require("crypto");
module.exports.createpayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        errors: errors.array(),
      });
    }
    const { amount, rideId } = req.body;
    const isValidId = mongoose.Types.ObjectId.isValid(rideId);
    if (!isValidId) {
      throw new Error("Invalid ride ID");
    }
    const response = await paymentService.createPayment(amount, rideId);
    if (response) {
      return res.status(200).json({
        message: "Payment initiated successfully",
        data: response,
      });
    } else {
      return res.status(404).json({
        message: "Payment failed",
        data: null,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};
module.exports.verifypayment = async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const payment = await PaymentModel.findOne({
    razorpay_order_id: razorpay_order_id,
  });
  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
    const authenticate = expectedSignature === razorpay_signature;

    if (authenticate) {
      console.log("payment", payment);
      await PaymentModel.findByIdAndUpdate(
        {
          _id: payment._id,
        },
        {
          status: "success",
          razorpay_payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
        }
      );
      res.redirect(`http://localhost:5173/home`);
    } else {
      throw new Error("Signature Failed");
    }
  } catch (err) {
    await PaymentModel.findByIdAndDelete({
      _id: payment._id,
    });
    res.redirect(req.get('Referer') || 'http://localhost:5173/home'); 
  }
};
