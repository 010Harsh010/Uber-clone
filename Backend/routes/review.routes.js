const express = require("express");
const router = express.Router();
const reviewController = require("../controller/review.controller.js");

const {authUser} = require("../middlewares/auth.middleware.js");
router.post("/createreview",
    authUser,
    reviewController.createreview
)

module.exports = router;