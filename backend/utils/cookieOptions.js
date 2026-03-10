
const accessTokenOptions = {
    httpOnly : true,
    secure : false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 //15m
}

const refreshTokenOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge : 7 * 24 * 60 * 60 * 1000, //7D
}

export {accessTokenOptions, refreshTokenOptions};