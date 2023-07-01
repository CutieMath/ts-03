export async function deleteDeck(deckId: string) {
    await fetch(`http://localhost:3000/decks/${deckId}`, {
        method: "DELETE",
    });
}