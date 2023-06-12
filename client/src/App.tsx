import {useEffect, useState} from "react";
import './App.css'

function App() {
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:3000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title}),
    })
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      fetch("http://localhost:3000/decks");
    } 
    fetchDecks();
  }, [])

  return <div className="App">
    <form onSubmit={handleCreateDeck}>
      <label htmlFor="deck-title">Deck Title</label>
      <input 
        id="deck-title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  {
          setTitle(e.target.value)
        }}
      />
      <button>Create Deck</button>
    </form>
  </div>
}

export default App
