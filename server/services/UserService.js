import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../database/models/User.js';


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

