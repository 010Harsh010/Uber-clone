const express = require("express");
const { body,query } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware.js");
const rideController = require("../controller/ride.controller.js");

const router = express.Router();

router.post(
    "/create",
    [
        body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Address"),
        body("destination").isString().isLength({ min: 3 }).withMessage("Invalid Address"),
        body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("Invalid Vehicle")
    ],
    authMiddleware.authUser,
    rideController.createRide
);
router.post("/getfare",
    [
        body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid"),
        body("destination").isString().isLength({ min: 3 }).withMessage("Invalid")
    ],
    authMiddleware.authUser,
    rideController.getFare
)
router.post("/confirmride",
    [
        body("rideId").isString().isLength({ min: 3 }).withMessage("Invalid")
    ],
    authMiddleware.authCaption,
    rideController.confirmRide
)

router.post("/startride",
    authMiddleware.authCaption,
    [
        body("otp").isString().isLength({min:6}).withMessage("Invalid OTP"),
        body("rideId").isMongoId().isString().isLength({ min: 3 }).withMessage("InvalidId"),
    ],
    rideController.startride
);
router.post('/end-ride',
    [
        body("rideId").isMongoId().isString().withMessage("Invalid MongoId")
    ],
    authMiddleware.authCaption,
    rideController.endride
)

module.exports = router;
