import express from "express";
import cors from "cors";
import { connectToDB } from "./database/db.config.js";
import routes from "./routes/index.js";
import helmet from "helmet";
import morgan from "morgan";
import ErrorHandler from "./middleware/ErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
connectToDB();


app.get('/', (req, res) => {
    return res.send('Hello World');
});


app.use("/", routes)
app.use(ErrorHandler)


