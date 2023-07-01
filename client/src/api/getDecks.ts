export type TDeck = {
    _id: string;
    title: string;
  };
  

export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch("http://localhost:3000/decks");
    return response.json();
}