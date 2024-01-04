import Conversation from '../models/conversation.js';

const createConversation = async (req, res) => {
    try {
        const newConversation = new Conversation({
            id: req.isSeller
                ? req.userId + req.body.to
                : req.body.to + req.userId,
            sellerId: req.isSeller ? req.userId : req.body.to,
            buyerId: req.isSeller ? req.body.to : req.userId,
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        });

        const newSave = await newConversation.save();

        res.status(201).json(newSave);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find(
            req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
        )
            .populate('sellerId buyerId')
            .sort({ updatedAt: -1 });

        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getSingleConversation = async (req, res) => {
    try {
        const id = req.params.id;

        const conversation = await Conversation.findOne({ id: id }).populate(
            'sellerId buyerId'
        );

        if (!conversation) {
            return res.status(404).send('Not Found!');
        }

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const updateConversation = async (req, res) => {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate(
            {
                id: req.params.id,
            },
            {
                $set: {
                    // readBySeller: req.isSeller,
                    // readByBuyer: !req.isSeller,
                    ...(req.isSeller
                        ? { readBySeller: true }
                        : { readByBuyer: true }),
                },
            },
            {
                new: true,
            }
        );

        res.status(200).send('Updated successfully');
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

export {
    getConversations,
    createConversation,
    getSingleConversation,
    updateConversation,
};
