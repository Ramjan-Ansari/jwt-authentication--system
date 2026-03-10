import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

export default protect;