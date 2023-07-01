import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
  // Find the deck
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  if (!deck) {
    return res.status(404).json({ message: "Deck not found" });
  }
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}
