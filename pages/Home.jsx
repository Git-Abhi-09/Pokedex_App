import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import PokemonModel from "@/components/PokemonModel";

const typesOptions = [
  "fire",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "grass",
  "water",
];

const genderOptions = [
  "male",
  "female",
  "genderless",
];

const Home = () => {
  const [entities, setEntities] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState(null);
  const [pageData, setPageData] = useState({ currPage: null, nextPage: null });

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${pageData.currPage}&limit=${pageData.nextPage}`;

  async function getPokemon() {
    const res = await fetch(url);
    const resData = await res.json();
    const pokemonArray = resData.results;

    const allPokemon = await Promise.all(
      pokemonArray.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const resData = await res.json();

        return (
          <PokemonCard
            key={resData.id}
            img={resData.sprites.other.dream_world.front_default}
            name={resData.forms[0].name}
            id={resData.id}
            className="pokemon-card"
            closeModal={closeModal}
          />
        );
      })
    );

    setEntities(allPokemon);
  }

  // search filter

  const handleSearch = (e) => {
    const value = e.target.value;
    const response = entities.filter((i) => {
      return i.props.name == searchValue;
    });
    return setEntities(response);
  };

  // type search filter

  let alldata;
  const fiterdata = async (e) => {
    let categery = e.target.value;
      const url = `https://pokeapi.co/api/v2/type/${categery}/`;
      const responace = await fetch(url);
      const data = await responace.json();

      alldata = await Promise.all (data.pokemon.map(async(res, index) => {
        let id = res.pokemon.url.substring(34).replace("/", "");
        const typeUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`
        const resType = await fetch(typeUrl);
        const resData = await resType.json();
        return  <PokemonCard
        key={resData.id}
        img={resData.sprites.other.dream_world.front_default}
        name={resData.forms[0].name}
        id={resData.id}
        className="pokemon-card"
        closeModal={closeModal}
      />
      }));
      setEntities(alldata);
  }

  useEffect(() => {
    getPokemon();
  }, [searchValue, pageData]);

  const resetAll = ()=>{
    getPokemon();
  }

// gender filter


let allGenderData;
const genderFiterData = async (e) => {
  let gender = e.target.value;
    const url = `https://pokeapi.co/api/v2/gender/${gender}/`
    const responace = await fetch(url);
    const data = await responace.json();

    allGenderData = await Promise.all (data.pokemon_species_details.map(async(res, index) => {
      let id = res.pokemon_species.url.substring(42).replace("/", "");
      const typeUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`
      const resType = await fetch(typeUrl);
      const resData = await resType.json();
      return  <PokemonCard
      key={resData.id}
      img={resData.sprites.other.dream_world.front_default}
      name={resData.forms[0].name}
      id={resData.id}
      className="pokemon-card"
      closeModal={closeModal}
    />
    }));
    setEntities(allGenderData);
}

 
const resetAllGender = ()=>{
  getPokemon();
}

  const nextIndex = () => {
    setPageData({
      currPage: pageData.currPage + 20,
      nextPage: (pageData.nextPage = 20),
    });
  };

  const prevIndex = () => {
    setPageData({
      currPage: pageData.currPage - 20,
      nextPage: (pageData.nextPage = 20),
    });
  };

  const closeModal = (id) => {
    setId(id);
    setModal(true);
  };

  const setCloseModal = () => {
    setModal(false);
  };

  const serchFilter = (e) => {
    console.log("value.....", e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div class="pokedex-container">
        <div class="header">
          <h1>Pokédex</h1>
          <h1 style={{ marginLeft: "20px" }}>|</h1>
          <p style={{ marginLeft: "20px" }}>
            Search for any Pokémon that exists on the planet
          </p>
        </div>
        <div class="filters">
          <div class="search-container">
            <input
              type="text"
              placeholder="Name or Number"
              onChange={serchFilter}
              class="search-input"
            ></input>
            <button class="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div class="filter">
            <label for="type">Type</label>
            <select
              id="type"
              onChange={fiterdata}
            >
              {typesOptions.map((type) => (
                <option onClick={fiterdata} value={`${type}`}>{type}</option>
              ))}
            </select>
            <button onClick={resetAll}>Reset-All</button>
          </div>
          <div class="filter">
            <label for="gender">Gender</label>
            <select
              id="type"
              onChange={genderFiterData}
            >
              {genderOptions.map((type) => (
                <option onClick={genderFiterData} value={`${type}`}>{type}</option>
              ))}
            </select>
            <button onClick={resetAllGender}>Reset-Gender</button>
          </div>
        </div>
      </div>
      <div className="inner-div">{entities}</div>
      <div className="button-div">
        <button onClick={prevIndex}>Prev</button>
        <button onClick={nextIndex}>Next</button>
        {console.log("modal value", modal)}
      </div>
      {modal ? (
        <PokemonModel
          id={id}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
        />
      ) : null}
    </>
  );
};

export default Home;
