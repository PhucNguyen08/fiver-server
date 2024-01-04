import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        sellerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        buyerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        readBySeller: {
            type: Boolean,
            required: true,
        },
        readByBuyer: {
            type: Boolean,
            required: true,
        },
        lastMessage: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
