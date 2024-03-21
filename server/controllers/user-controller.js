import { CustomError } from "../middleware/error-handler.js";
import { createNewUser, findExistingUser } from "../services/user-service.js";
import { validatePassword, generateTokens } from "../utils/utils.js";



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

        const { accessToken, refreshToken } = generateTokens(
            user._id
        );

        res.cookie("access", accessToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 30 * 1000,
        });

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 30 * 1000,
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

export const googleAuth = async (req, res, next) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true
        },
            async (req, accessToken, refreshToken, profile, done) => {
                try {
                    // Handle successful Google authentication
                    // ... (code to be implemented later)
                    // Here, you can create a JWT using user data from profile

                    const newUser = {
                        id: profile.id, // Or a custom identifier
                        email: profile.emails[0].value,
                        // Add other relevant user data
                    };

                    // Create JWT using your custom createJWT function
                    const jwt = await createJWT(newUser); // Replace with actual implementation

                    done(null, jwt); // Return the JWT as the authenticated user
                } catch (error) {
                    console.error('Error during Google authentication:', error);
                    done(error, false);
                }
            })
    );

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

export const getUploadUrl = async (req, res, next) => {




}