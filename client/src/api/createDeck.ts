export async function createDeck(title: string) {
    const response = await fetch("http://localhost:3000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  }
