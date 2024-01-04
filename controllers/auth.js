import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const {
            isSeller,
            description,
            username,
            email,
            country,
            password,
            phoneNumber,
        } = req.body;

        // const user = await User.findOne({ username: data.username });

        const filename = req.file.filename;

        const salt = bcrypt.genSaltSync(10);

        const passwordHash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            isSeller,
            description,
            username,
            email,
            country,
            password,
            phoneNumber,
            password: passwordHash,
            image: filename,
        });

        await newUser.save();
        res.status(201).send('You have successfully registered');
    } catch (err) {
        res.status(500).send('Something went wrong!');
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isPassword = bcrypt.compareSync(password, user.password);

        if (!isPassword) {
            return res.status(400).json({ message: 'Wrong password or email' });
        }

        const token = jwt.sign(
            { id: user._id, isSeller: user.isSeller },
            process.env.TOKEN
        );

        const userInfo = user.toObject();
        delete userInfo.password;

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })
            .status(200)
            .send({ user: userInfo, token });
    } catch (error) {
        res.status(500).send('Something went wrong!');
    }
};

const logout = async (req, res) => {
    res.clearCookie('accessToken', {
        sameSite: 'none',
        secure: true,
    })
        .status(200)
        .send('You have been logged out');
};

export { register, login, logout };
