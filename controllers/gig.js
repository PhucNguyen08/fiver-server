import Gig from '../models/gig.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const createGig = async (req, res) => {
    if (!req.isSeller)
        res.status(403).json({ message: 'Only seller can create' });

    try {
        console.log(req.files);
        const newGig = new Gig({
            userId: req.userId,
            ...req.body,
            images: req.files.map(file => file.filename),
        });

        const saveGig = await newGig.save();

        res.status(201).json(saveGig);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const deleteGig = async (req, res) => {
    try {
        const id = req.params.id;
        const gig = await Gig.findById(id);

        if (gig.userId !== req.userId) {
            res.status(403).send('You can delete only your gig');
        }

        await Gig.findByIdAndDelete(id);
        res.status(204).send('Gig deleted successfully');
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getGig = async (req, res) => {
    try {
        const id = req.params.id;

        const gig = await Gig.findById(id).populate('userId');

        if (!gig) {
            res.status(404).send('Not Found!');
        }

        res.status(200).json(gig);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getGigs = async (req, res) => {
    const query = req.query;

    const filter = {};

    if (query.userId) {
        const id = new ObjectId(query.userId);
        filter.userId = id;
    }

    if (query.category) {
        filter.category = query.category;
    }

    if (query.search) {
        filter.title = {
            $regex: query.search,
            $options: 'i',
        };
    }

    if (query.min || query.max) {
        filter.price = {
            ...(query.min && { $gte: query.min }),
            ...(query.max && { $lte: query.max }),
        };
    }

    try {
        const gigs = await Gig.find(filter)
            .populate('userId')
            .sort({ [query.sort]: -1 });

        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

export { createGig, deleteGig, getGig, getGigs };
