
import jwt from "jsonwebtoken";
import { isNullOrUndefined } from "../utils/utils.js";
import { generateTokens, isTokenExpired } from "../utils/utils.js";
import { findExistingUser } from "../services/user-service.js";

export const authMiddleware = (req, res, next) => {
    console.log("Auth middleware");

    try {
        const accessToken = req.cookies.access;

        if (isNullOrUndefined(accessToken)) {
            res.status(401).json({
                status: "Error",
                message: "No token provided",
            });
        } else {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
            if (!findExistingUser("id", decoded.id)) {
                return res.status(401).json({
                    status: "Error",
                    message: "Invalid user",
                });
            }

            if (isTokenExpired(decoded.exp)) {

                const refreshToken = req.cookies.refresh;

                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        console.log("Refresh token invalid", err.message);
                        return res.status(401).json({
                            status: "Error",
                            message: "Invalid refresh token",
                        });
                    } else {
                        const tokens = generateTokens(user.id);
                        console.log("New access token", tokens.accessToken);
                        console.log("New refresh token", tokens.refreshToken);
                        res.cookie("access", tokens.accessToken, {
                            httpOnly: true,
                            sameSite: "None",
                            secure: true,
                            maxAge: 24 * 60 * 60 * 30 * 1000,
                        });
                        res.cookie("refresh", tokens.refreshToken, {
                            httpOnly: true,
                            sameSite: "None",
                            secure: true,
                            maxAge: 24 * 60 * 60 * 30 * 1000,
                        });

                    }

                });
            }

            req.user = decoded.id;
            next();
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: "Error",
            message: "Failed to authenticate token",
        });


    };
}
