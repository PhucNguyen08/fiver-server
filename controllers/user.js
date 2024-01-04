import User from '../models/user.js';
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user._id.toString() !== req.userId) {
        res.status(403).json({
            message: 'You do not have permission to delete this user',
        });
    }

    await User.findByIdAndDelete(req.userId);

    res.status(200).json({ message: 'User deleted successfully' });
};

export { deleteUser };
