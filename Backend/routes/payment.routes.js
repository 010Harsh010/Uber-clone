const express = require("express");
const router = express.Router();
const { body} = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware.js");
const paymentController = require("../controller/payment.controller.js");

router.post("/createpayment",[
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('rideId').isMongoId().withMessage("Invalid Ride Id")
],
    authMiddleware.authUser,
    paymentController.createpayment)
router.post("/paymentverification",
    paymentController.verifypayment
)
module.exports = router;