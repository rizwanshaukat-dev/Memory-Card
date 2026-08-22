import { useState, useEffect } from 'react'

function App() {
  const [characters, setCharacters] = useState([]);
  const [clickedIds,setClickedIds]=useState([])
  const [score,setScore]=useState(0);
  const [bestScore,setBestScore]=useState(0);
  useEffect(() => {
    async function getCharacters() {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results.slice(0, 8));
    }
    getCharacters()
  }, []);
  function handleClick(event){
    if(!clickedIds.includes(event.currentTarget.dataset.id)){
      setClickedIds([...clickedIds,event.currentTarget.dataset.id]);
      setScore(score=>score +1);
    }
    else{
      setBestScore(score>bestScore?score:bestScore)
      setScore(0);
      setClickedIds([]);
    }
  }
  return (
    <div className="card-container">
      {
        characters.map((character) => {
          return <div className="card" key={character.id} data-id={character.id} onClick={handleClick}>
            <img src={character.image} alt="character-image" />
            <strong>{character.name}</strong>
          </div>
        })
      }
    </div>

  )
}

export default App
