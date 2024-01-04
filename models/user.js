import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email invalid');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
        },
        image: {
            type: String,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        isSeller: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
