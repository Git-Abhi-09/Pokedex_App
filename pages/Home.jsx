import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import PokemonModel from "@/components/PokemonModel";
import SearchIcon from '@mui/icons-material/Search';

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

const genderOptions = ["male", "female", "genderless"];

const Home = () => {
  const [entities, setEntities] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState(null);
  const [pageData, setPageData] = useState({ currPage: 0, nextPage: 18 });
  const [color, setColor] = useState([]);
 
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${pageData.currPage}&limit=${pageData.nextPage}`;

  async function getPokemon() {
    const res = await fetch(url);
    const resData = await res.json();
    const pokemonArray = resData.results;

    const allPokemon = await Promise.all(
      pokemonArray.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const resData = await res.json();

        const color = [
          resData?.types[0]?.type.name,
          resData?.types.length === 2
            ? resData?.types[1]?.type.name
            : resData?.types[0]?.type.name,
        ];

        setColor(color);

        return (
          <PokemonCard
            key={resData.id}
            img={resData.sprites.other.dream_world.front_default}
            name={resData.forms[0].name}
            id={resData.id}
            className="pokemon-card"
            closeModal={closeModal}
            color={color}
          />
        );
      })
    );

    setEntities(allPokemon);
  }

  const handleSearch = () => {
    const response = entities.filter((i) => {
      return i.props.name.includes(searchValue);
    });
    return setEntities(response);
  };

  // type search filter

  let alldata;
  const fiterdata = async (e) => {
    let categery = e.target.value;
    const url = `https://pokeapi.co/api/v2/type/${categery}`;
    const responace = await fetch(url);
    const data = await responace.json();

    alldata = await Promise.all(
      data.pokemon.map(async (res) => {

        let id = res.pokemon.url.substring(34).replace("/", "");
        
        const typeUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        const resType = await fetch(typeUrl);
        const resData = await resType.json();

        const color = [
          resData?.types[0]?.type.name,
          resData?.types.length === 2
            ? resData?.types[1]?.type.name
            : resData?.types[0]?.type.name,
        ];

        setColor(color);

        return (
          <PokemonCard
            key={resData.id}
            img={resData?.sprites?.other?.dream_world?.front_default}
            name={resData.forms[0].name}
            id={resData.id}
            className="pokemon-card"
            closeModal={closeModal}
            color={color}
          />
        );
      })
    );
    setEntities(alldata);
  };

  useEffect(() => {
    getPokemon();
  }, [searchValue, pageData]);

  const resetAll = () => {
    getPokemon();
  };

  // gender filter

  let allGenderData;
  const genderFiterData = async (e) => {
    let gender = e.target.value;
    const url = `https://pokeapi.co/api/v2/gender/${gender}/`;
    const responace = await fetch(url);
    const data = await responace.json();

    allGenderData = await Promise.all(
      data.pokemon_species_details.map(async (res, index) => {
        let id = res.pokemon_species.url.substring(42).replace("/", "");
        const typeUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        const resType = await fetch(typeUrl);
        const resData = await resType.json();

        const color = [
          resData?.types[0]?.type.name,
          resData?.types.length === 2
            ? resData?.types[1]?.type.name
            : resData?.types[0]?.type.name,
        ];

        setColor(color);

        return (
          <PokemonCard
            key={resData.id}
            img={resData.sprites.other.dream_world.front_default}
            name={resData.forms[0].name}
            id={resData.id}
            className="pokemon-card"
            closeModal={closeModal}
            color={color}
          />
        );
      })
    );
    setEntities(allGenderData);
  };

  const resetAllGender = () => {
    getPokemon();
  };

  const nextIndex = () => {
    setPageData({
      currPage: pageData.currPage + 18,
      nextPage: (pageData.nextPage = 18),
    });
  };

  const prevIndex = () => {
    setPageData({
      currPage: pageData.currPage - 18,
      nextPage: (pageData.nextPage = 18),
    });
  };

  const closeModal = (id) => {
    setId(id);
    setModal(true);
  };

  const setCloseModal = () => {
    setModal(false);
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
          
            <div><input
              type="text"
              placeholder="Name or Number"
              onChange={(e)=>{
                setSearchValue(e.target.value);
              }}
              className="search-input"
            ></input></div>
            <div><button class="search-button" onClick={handleSearch}>
              <SearchIcon/>
            </button></div>
          
          <div class="filter">
            <label for="type">Type</label>
            <select className="dropdown" onChange={fiterdata}>
              {typesOptions.map((type) => (
                <option onClick={fiterdata} value={`${type}`}>
                  {type}
                </option>
              ))}
            </select>
            <button onClick={resetAll}>Reset-All</button>
          </div>
          <div class="filter">
            <label for="gender">Gender</label>
            <select id="type" onChange={genderFiterData}>
              {genderOptions.map((type) => (
                <option onClick={genderFiterData} value={`${type}`}>
                  {type}
                </option>
              ))}
            </select>
            <button onClick={resetAllGender}>Reset-Gender</button>
          </div>
        </div>
      </div>

      {/* all pokemon */}
      <div className="inner-div">{entities}</div>

      <div className="button-div">
        <button className="btn" onClick={prevIndex}>Prev</button>
        <button className="btn" onClick={nextIndex}>Next</button>
      </div>
      {modal ? (
        <PokemonModel
          color={color}
          id={id}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
        />
      ) : null}
    </>
  );
};

export default Home;
