import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card'
async function getCollection() {
    const offset = Math.floor(Math.random()*629) + 1
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`)
    const object = await response.json()
    return object.results
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function App() {
  const [loading, setLoading] = useState(true) //signal the finish of fetching
  const [collection, setCollection] = useState({}) 
  const [restart, setRestart] = useState(true) //signal fetching new collection
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [selectedNames, setSelectedNames] = useState([])
  let pokemonNames
  if(Object.keys(collection).length > 0) {
    pokemonNames = collection.map((pok) => pok.name)

  }
  useEffect(() => {
    async function fetchData() {
      if(restart) {
        setLoading(true)
        const newCollection = await getCollection()
        setCollection(newCollection)
        setLoading(false)
        setRestart(false)
      } 
    }
    fetchData()
  }, [restart])


  function handleClick(name) {
    if(pokemonNames.includes(name) && !selectedNames.includes(name)) {
      setSelectedNames(selectedNames.concat(name))
      if(score+1 > bestScore) {
        setBestScore(score+1)
      }
      setScore(score+1)
      setCollection(shuffle(collection))
    } else {
      setSelectedNames([])
      setScore(0)
      setRestart(true)
    }
  }
  return (
    <>
      <h1>Pokémon Memory Game</h1>
      <h3>Get points by clicking each card exactly once!</h3>
      <div id="score" >
        <h3>Score: {score}</h3>
        <h3>Best score: {bestScore}</h3>
      </div>
      {loading  &&  <div>...Loading</div>}
      {!loading && Object.keys(collection).length > 0 && <div className='cards'>
        {collection.map((pok) => <Card handleClick={handleClick} url={pok.url} key={pok.name}/> )}
      </div>}
    </>
  )
}

export default App
