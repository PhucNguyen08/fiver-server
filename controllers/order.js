import Order from '../models/order.js';
import Gig from '../models/gig.js';

const paymentIntent = async (req, res) => {};

const createOrder = async (req, res) => {
    try {
        const gig = await Gig.findById(req.body.gigId);

        const newOrder = new Order({
            gigId: gig._id,
            price: gig.price,
            title: gig.title,
            img: gig.images[0],
            buyerId: req.userId,
            sellerId: gig.userId,
            payment_intent: 'temporary',
        });

        const saveOrder = await newOrder.save();

        res.status(201).json(saveOrder);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller
                ? { sellerId: req.userId }
                : { buyerId: req.userId }),
            isCompleted: true,
        }).populate('sellerId buyerId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

export { createOrder, getOrders, paymentIntent };
