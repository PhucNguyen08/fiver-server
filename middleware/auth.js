import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        // const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(403).send('Access Denied');
        }

        const decoded = jwt.verify(token, process.env.TOKEN);

        req.userId = decoded.id;
        req.isSeller = decoded.isSeller;

        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export { verifyToken };
