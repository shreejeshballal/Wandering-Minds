import mongoose from 'mongoose';


export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.DATABASE_URL) return console.log("MONGODB_URL not found");

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            autoIndex: true,
        });
        console.log("Connected to DB");
    } catch (error) {

        console.log(error);
        process.exit(1);
    }
};