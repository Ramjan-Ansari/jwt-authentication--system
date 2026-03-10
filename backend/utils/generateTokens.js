import jwt from 'jsonwebtoken'

const genAccessToken = (userId) => {
    return jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    } );
};

const genRefeshToken = (userId) => {
    return jwt.sign({id : userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7D"
    })
}

export {genAccessToken, genRefeshToken}