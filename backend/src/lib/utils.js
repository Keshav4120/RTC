import jwt from "jsonwebtoken"

export const generateToken = (userId , res) => {
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }
    const token = jwt.sign({userId},JWT_SECRET , {
        expiresIn:"7d",
    });
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, //ms
        httpOnly: true, //prevent XSS attack: cross-site Scripting
        sameSite: "strict",//prevent scrf attacks
        secure: process.env.NODE_ENV === "production" ? true : false,
    });

    return token;
};