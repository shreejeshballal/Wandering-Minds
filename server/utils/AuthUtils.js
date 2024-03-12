import { findExistingUser } from "../services/UserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateTokens = async (userId) => {
    const accessToken = jwt.sign(
        {
            id: userId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10m",
        }
    );
    const refreshToken = jwt.sign(
        {
            id: userId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10d" }
    );

    return { accessToken, refreshToken };
}


export const isTokenExpired = (exp) => {
    return Date.now() / 1000 > exp;
}

export const isUserValid = (userId) => {
    return findExistingUser("id", userId);
}

