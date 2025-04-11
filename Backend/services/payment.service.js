const PaymentModel = require("../models/payment.model.js");
const mongoose= require("mongoose")
const RideModel = require("../models/ride.model.js");
const {instance} = require("../initilizePayment.js");

async function checkout(amount) {
    const options = {
        "amount": Number(amount*100),
        "currency": "INR",
        "receipt": 'receipt#123',
    }
    const order = await instance.orders.create(options);
    console.log(order);
    return order;
}
module.exports.createPayment = async (amount, rideId) => {
    try {
        if (!amount || !rideId) {
            throw new Error("All fields are required");
        }
    
        // Validate rideId
        if (!mongoose.Types.ObjectId.isValid(rideId)) {
            throw new Error("Invalid ride ID");
        }
    
        const ride = await RideModel.findById(rideId);
        if (!ride) {
            throw new Error("Ride not found");
        }
        const order = await checkout(amount);
        const payment = await PaymentModel.create({
            razorpay_order_id: order.id,
            amount,
            ride: rideId,
            status: "pending",
        });
        ride.paymentId = payment._id;
        await ride.save();
        return payment;
    } catch (error) {
        console.log(error);
    }
};

