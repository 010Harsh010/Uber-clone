const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");
const captionRoutes = require("./routes/caption.routes.js");
const mapsRoutes = require("./routes/map.routes.js");
const rideRoutes = require("./routes/rides.route.js");
const paymentRoutes = require("./routes/payment.routes.js");
const reviewRouters =  require("./routes/review.routes.js");
const chatRouters = require("./routes/chat.routes.js");

(async () => {
  try {
    await connectToDb();
  } catch (err) {
    console.error(
      "Failed to start application due to DB connection error:",
      err
    );
  }
})();
const whitelist = [`http://localhost:5173`, `http://localhost:5173/register`];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(
  cookieParser({
    httpOnly: true,
    secure: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", userRoutes);
app.use("/captions", captionRoutes);
app.use('/maps', mapsRoutes);
app.use("/ride",rideRoutes);
app.use("/payment",paymentRoutes);
app.use("/review",reviewRouters);
app.use("/chats",chatRouters);

app.get("/api/key",(req,res,next)=>{
  return res.json({key:process.env.RAZORPAY_API_ID});
})

module.exports = app;
