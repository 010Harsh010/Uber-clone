const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const chatController = require("../controller/chat.controller.js");

router.post("/captain/sendchat",
    authMiddleware.authCaption,
    chatController.sendchat
)
router.post("/user/sendchat",
    authMiddleware.authUser,
    chatController.sendchat
)
router.post("/user/createchat",
    authMiddleware.authUser,
    chatController.createChat
)
router.post("/captain/createchat",
    authMiddleware.authUser,
    chatController.createChat
)

module.exports = router;