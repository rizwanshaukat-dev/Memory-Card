import { useState, useEffect } from 'react'
import "./app.css";
function App() {
  const [characters, setCharacters] = useState([]);
  const [clickedIds, setClickedIds] = useState([])
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  useEffect(() => {
    async function getCharacters() {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results.slice(0, 10));
    }
    getCharacters()
  }, []);
  function handleClick(event) {
    if (!clickedIds.includes(event.currentTarget.dataset.id)) {
      setClickedIds([...clickedIds, event.currentTarget.dataset.id]);
      setScore(score => score + 1);
      shuffleCards();
    }
    else {
      shuffleCards(characters)
      setBestScore(score > bestScore ? score : bestScore)
      setScore(0);
      setClickedIds([]);
    }
  }
  function shuffleCards() {
    const shuffledCharacters = [...characters];
    for (let i = shuffledCharacters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCharacters[i], shuffledCharacters[j]] = [shuffledCharacters[j], shuffledCharacters[i]];
    }
    setCharacters(shuffledCharacters);
  }
  return (
    <div className="app-content">
      <div className="header">
        <h1 className="game-title">Memory Card</h1>
        <div className="score-wrapper">
          <h3>Score: {score}</h3>
          <h3>Best Score: {bestScore}</h3>
        </div>
      </div>
      <div className="card-container">
        {
          characters.map((character) => {
            return <div className="card" key={character.id} data-id={character.id} onClick={handleClick}>
              <img src={character.image} alt="character-image" />
              <h3 className="name">{character.name}</h3>
            </div>
          })
        }
      </div>
    </div>

  )
}

export default App
