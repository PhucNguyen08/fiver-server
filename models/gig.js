import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        deliveryTime: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        totalRating: {
            type: Number,
            default: 0,
        },
        totalStar: {
            type: Number,
            default: 0,
        },
        starNumber: {
            type: Number,
            default: 0,
        },
        cover: {
            type: String,
            required: false,
        },
        images: {
            type: [String],
            required: false,
        },
        sales: {
            type: Number,
            default: 0,
        },
        features: {
            type: [String],
            require: false,
        },
    },
    { timestamps: true }
);

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
