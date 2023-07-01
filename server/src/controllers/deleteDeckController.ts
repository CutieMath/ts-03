import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
  const deckId = req.params.id;
  const deck = await Deck.findByIdAndRemove(deckId);
  res.json(deck);
}