import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
export function Card({url, handleClick}) {
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(true)
    let imgSrc
    if(!loading) {
        imgSrc = pokemon.sprites["front_default"]
    }
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const response = await fetch(url)
            const newPokemon = await response.json()
            setPokemon(newPokemon)
            setLoading(false)
        }
        fetchData()
    }, [url])
    return (
        <>
            { loading && <div></div> }
            { !loading && <div className="card" onClick={() => handleClick(pokemon.name)}>
                                <img src={imgSrc} />
                                <p>{pokemon.name}</p>
                        </div>
            }
            
        </>
    )
}
Card.propTypes = {
    url: PropTypes.string, 
    handleClick: PropTypes.func,
}