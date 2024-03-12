import { CustomError } from "../middleware/ErrorHandler.js";
import { createNewUser, findExistingUser } from "../services/UserService.js";
import { validatePassword, generateTokens } from "../utils/AuthUtils.js";



export const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!password) {
            throw new CustomError("Password is required", 400);
        }

        const user = await findExistingUser("email", email);

        if (user)
            throw new CustomError("User already exists", 409);

        req.data = await createNewUser(req.body);
        loginUser(req, res, next);

    } catch (err) {
        next(err);
    }
}

export const loginUser = async (req, res, next) => {

    const { email, password } = req.body;
    try {

        if (!password) {
            throw new CustomError("Password is required", 400);
        }
        const user = await findExistingUser("email", email);
        if (!user)
            throw new CustomError("User not found", 404);

        const isPasswordValid = await validatePassword(password, user.personal_info.password);
        if (!isPasswordValid)
            throw new CustomError("Invalid password", 400);

        const { accessToken, refreshToken } = await generateTokens(
            user._id
        );

        res.cookie("access", accessToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 30,
        });

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 30,
        });

        return res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            result: {
                user: {
                    id: user._id,
                    username: user.personal_info.username,
                    fullname: user.personal_info.fullname,
                    profile_img: user.personal_info.profile_img,
                },
            },
        });

    } catch (err) {
        next(err);
    }

}


export const validateUser = async (req, res, next) => {
    try {
        const id = req.params;
        const user = await findExistingUser("_id", req.id);
        if (!user)
            throw new CustomError("User not found", 401);

        return res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            result: {
                user: {
                    id: user._id,
                    username: user.personal_info.username,
                    fullname: user.personal_info.fullname,
                    profile_img: user.personal_info.profile_img,
                },
            },
        });

    } catch (err) {
        next(err);
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("access");
        res.clearCookie("refresh");
        return res.status(200).json({
            status: "Success",
            message: "User logged out successfully",
        });

    } catch (err) {
        next(err);
    }
}