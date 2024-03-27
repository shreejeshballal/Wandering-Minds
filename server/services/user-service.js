import bcrypt from 'bcrypt';
import User from '../models/User.js';


export const findExistingUser = async (property, value) => {
    return await User.findOne({
        [`personal_info.${property}`]: value
    });

}

export const createNewUser = async (data) => {
    const { email, password, fullname } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    let username = email.split('@')[0];
    return await User.create({
        personal_info: {
            email: email.toLowerCase(),
            password: hashedPassword,
            username: username.toLowerCase(),
            fullname: fullname.toLowerCase(),

        }
    }
    );
}

export const findUsers = async (query) => {
    const users = await User.find({ "personal_info.username": { $regex: query, $options: "i" } })
        .select("personal_info.username personal_info.profile_img personal_info.fullname ")
        .sort({ "activity_info.total_reads": -1 })
        .limit(50);

    return users;
}


