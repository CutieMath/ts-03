import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { getDecksController } from "./controllers/getDecksController";
import { getDeckController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
config();

const PORT = 3000;
app.get("/decks", getDecksController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:cardId", deleteCardOnDeckController);

const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env"
  );
}
mongoose.connect(mongoURL).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
