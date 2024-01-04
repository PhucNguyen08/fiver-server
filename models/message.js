import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        conservationId: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
