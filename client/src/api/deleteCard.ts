import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function deleteCard(
  deckId: string,
  cardId: number
): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "DELETE",
  });
  return response.json();
}
