import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        gigId: {
            type: mongoose.Types.ObjectId,
            ref: 'Gig',
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        star: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
