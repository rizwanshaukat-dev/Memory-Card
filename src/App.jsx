import { useState, useEffect } from 'react'

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    async function getCharacters() {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results.slice(0, 8));
    }
    getCharacters()
  }, []);

  return (
    <div className="card-container">
      {
        characters.map((character) => {
          return <div className="card" key={character.id}>
            <img src={character.image} alt="character-image" />
            <strong>{character.name}</strong>
          </div>
        })
      }
    </div>

  )
}

export default App
