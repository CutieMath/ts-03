import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardOnDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const cardId = req.params.cardId;
  const deck = await Deck.findById(deckId);
  if (!deck) {
    return res.status(404).json({ message: "Deck not found." });
  }
  deck.cards.splice(parseInt(cardId), 1);
  await deck.save();
  res.json(deck);
}
