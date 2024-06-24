import React from 'react'
import { useState ,useEffect} from 'react'
import PokemonCard from '@/components/PokemonCard';
import Navbar from '@/components/Navbar';

const Home = () => {
    const [entities, setEntities] = useState([]);
    const url = `https://pokeapi.co/api/v2/pokemon`;

    async function getPokemon() {
        const res = await fetch(url);
        const resData = await res.json();
        const pokemonArray = resData.results;

        const allPokemon = await Promise.all(pokemonArray.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const resData = await res.json();
            return (
                <PokemonCard
                    key={resData.id}
                    img={resData.sprites.other.dream_world.front_default}
                    name={resData.forms[0].name}
                    id={resData.id}
                    className="pokemon-card"
                />
            );
        }));
        
        setEntities(allPokemon);
    }

    useEffect(() => {
        getPokemon();
    }, []);
    
  return (
    <>
    <Navbar/>
      <div className='inner-div'> 
      {entities}
      </div>
      <div className='button-div'>
      <button>previce</button>
      <button>Next</button>
      </div>
    </>
  )
}

export default Home;
