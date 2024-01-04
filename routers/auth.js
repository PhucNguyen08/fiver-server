import express from 'express';
import { register, login, logout } from '../controllers/auth.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/register', upload.single('picture'), register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/upload', upload.single('image'), async (req, res) => {
    const filename = req.file.filename;

    // Thực hiện các thao tác khác với tên tệp tin

    // Trả về phản hồi thành công
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: filename,
    });
});

export default router;
