import Message from '../models/message.js';
import Conservation from '../models/conversation.js';

const createMessage = async (req, res) => {
    try {
        const newMessage = new Message({
            conservationId: req.body.conservationId,
            userId: req.userId,
            content: req.body.content,
        });

        const savedMessage = await newMessage.save();
        await Conservation.findOneAndUpdate(
            { id: req.body.conservationId },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.content,
                },
            },
            { new: true }
        );

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const getMessages = async (req, res) => {
    try {
        const id = req.params.id;

        const messages = await Message.find({ conservationId: id }).populate(
            'userId'
        );
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

export { createMessage, getMessages };
