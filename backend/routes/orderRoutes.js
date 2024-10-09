const express = require("express")
const authMiddleware = require("../middleware/auth.js")
const { placeOrder,userOrder} = require("../controllers/orderControllers.js")

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/userOrder",authMiddleware,userOrder);




module.exports = orderRouter;
