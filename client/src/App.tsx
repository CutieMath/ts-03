import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const deck = (await response.json()) as TDeck;
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(id: string) {
    await fetch(`http://localhost:3000/decks/${id}`, {
      method: "DELETE",
    });
    // optimistic update
    const newDecks = decks.filter((deck: TDeck) => deck._id !== id);
    setDecks(newDecks);
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:3000/decks");
      const newDecks = (await response.json()) as TDeck[];
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <div className="decks">
        {decks.map((deck: TDeck) => (
          <li key={deck._id}>
            <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
          </li>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
