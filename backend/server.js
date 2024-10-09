const express = require("express");
const mongoose = require("mongoose");


const bodyParser = require('body-parser');

const mongoSanitize = require('express-mongo-sanitize');

const cookieParser = require('cookie-parser');

//env file
const dotenv = require('dotenv/config');


const PORT = 8000;
const app = express();
const server = require("http").createServer(app);
let cors = require("cors");
app.use(cors());
app.use( express.static("files"));
app.use( "/", express.static("public"));
app.use(express.json({type: "application/json"}));
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());
const userRouter = require("./routes/userRoutes");
const foodRouter = require("./routes/foodRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");


//api routes
app.use("/api/user",userRouter);
app.use("/api/food",foodRouter);
app.use("/image",express.static('uploads'))
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



// Body parser, add data to the incoming body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());

// Data sanitization against NoSQL Query injection
app.use(mongoSanitize());





const DB = "mongodb://mongoadmin:mongoadmin@localhost:27017/food?authSource=admin";

mongoose.connect(DB)
.then(() => {
    console.log('DB connection successful');
    server.listen(PORT, () => {
        console.log(`Express Server listening on ${PORT}`);
    });
});


// Default route
app.get("/welcome",  async (req, res) => {
   res.json({
    message:"Welcome mtt",
    status:200,
   });
});

module.exports = app;
