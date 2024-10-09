const orderModel = require("../models/orderModels.js");
const userModel = require("../models/userModel.js");
const Stripe =  require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:3000";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address // Fixed typo here
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Fixed the pricing calculation
            },
            quantity: item.quantity
        }));

        // Adding delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 20 * 100 // Adjust delivery fee if needed
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};



//user order for frontend api
const userOrder = async (req,res) => {
    try {
        const order = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:order})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}



module.exports = { placeOrder,userOrder};
