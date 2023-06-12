import express, {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Deck from "./models/Deck";
const app = express();
dotenv.config();

const PORT = 3000;


app.get('/', (req: Request, res: Response) => {
    res.send('Cutie!');
});


const mongoURL = process.env.MONGO_URL;
if(!mongoURL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env');
}
mongoose.connect(mongoURL).then(()=>{
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
});


