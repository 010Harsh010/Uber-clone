const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controller/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least"),
    body('fullname.firstname').isLength({min:3}).withMessage("Name Must Be Atleast 3 character")
],userController.registerUser);
router.post("/login",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least")
]
,
userController.loginUser
)
router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.post("/logout",authMiddleware.authUser,userController.logout);
router.get("/getdetails",authMiddleware.authUser,userController.getdata);

module.exports = router;