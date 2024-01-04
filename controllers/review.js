import Review from '../models/review.js';
import Gig from '../models/gig.js';

const createReview = async (req, res) => {
    try {
        if (req.isSeller) {
            return res.status(403).send('Seller cannot be created review');
        }

        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });

        if (review) {
            return res.status(403).send('You have already created a review');
        }

        const gig = await Gig.findById(req.body.gigId);

        console.log(gig);

        const newReview = new Review({ userId: req.userId, ...req.body });

        const reviewSave = await newReview.save();

        await Gig.findByIdAndUpdate(req.body.gigId, {
            $inc: {
                totalRating: 1,
                totalStar: req.body.star,
            },
            $set: {
                starNumber: Math.floor(
                    (gig.totalStar + req.body.star) / (gig.totalRating + 1)
                ),
            },
        });

        res.status(201).json(reviewSave);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ gigId: req.params.gigId }).populate(
            'userId'
        );

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const deleteReview = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

export { createReview, getReviews, deleteReview };
