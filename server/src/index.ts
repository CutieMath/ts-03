import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(cors(
    {
        origin: '*',
    }
));
app.use(bodyParser.json());
import {config} from "dotenv";
config();

const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Cutie!');
});

// Create a new Deck
app.post("/decks", async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createDeck = await newDeck.save();
    res.json(createDeck);
});


const mongoURL = process.env.MONGO_URL;
if(!mongoURL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env');
}
mongoose.connect(mongoURL).then(()=>{
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
});


