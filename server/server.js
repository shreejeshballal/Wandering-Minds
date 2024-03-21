import express from "express";
import cors from "cors";
import { connectToDB } from "./configs/db.config.js";
import routes from "./routes/index.js";
import helmet from "helmet";
import morgan from "morgan";
import ErrorHandler from "./middleware/error-handler.js";
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


connectToDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('/', (req, res) => {
    return res.send('Hello World');
});


app.use("/api/", routes)
app.use(ErrorHandler)


