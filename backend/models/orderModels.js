const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // Changed "require" to "required"
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false }  // Fixed typo: "fales" to "false"
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

module.exports = orderModel;
