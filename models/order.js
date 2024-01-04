import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        gigId: {
            type: mongoose.Types.ObjectId,
            ref: 'Gig',
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        buyerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sellerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        payment_intent: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
