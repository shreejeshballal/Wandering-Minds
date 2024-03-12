
import jwt from "jsonwebtoken";
import { isNullOrUndefined } from "../utils/utils.js";
import { generateTokens, isTokenExpired, isUserValid } from "../utils/AuthUtils.js";

export const authMiddleware = (req, res, next) => {

    try {
        const accessToken = req.cookies.access;

        console.log("Access token", accessToken);

        if (isNullOrUndefined(accessToken)) {
            return res.status(401).json({
                status: "Error",
                message: "No token provided",
            });
        } else {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { complete: true, ignoreExpiration: true });

            if (!isUserValid(decoded.payload.id)) {
                return res.status(401).json({
                    status: "Error",
                    message: "Invalid user",
                });
            }

            if (isTokenExpired(decoded.payload.exp)) {
                const refreshToken = req.cookies.refresh;
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        console.log("Refresh token invalid", err.message);

                        return res.status(401).json({
                            status: "Error",
                            message: "Invalid refresh token",
                        });
                    }
                    const { newAccessToken, newRefreshToken } = generateTokens(user.id);
                    res.cookie("access", newAccessToken, {
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                        maxAge: 24 * 60 * 60 * 30,
                    });
                    res.cookie("refresh", newRefreshToken, {
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                        maxAge: 24 * 60 * 60 * 30,
                    });
                    next();
                });
            } else {
                next();
            }
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: "Error",
            message: "Failed to authenticate token",
        });


    };
}
