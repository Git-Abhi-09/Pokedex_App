import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import PokemonModel from "@/components/PokemonModel";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/navbar.module.css";
import Pagination from "@/components/Pagination";

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
  const [searchEntities, setSearchEntities] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState(null);
  const [pageData, setPageData] = useState({ currPage: 0, nextPage: 18 });
  const [pageDatafortype, setPageDatafortype] = useState({
    currPage: 0,
    nextPage: 18,
  });
  const [pageDataforgender, setPageDataforgender] = useState({
    currPage: 0,
    nextPage: 18,
  });
  const [color, setColor] = useState([]);
  const [typefilter, setTypeFilter] = useState();
  const [genderFiter , setGenderFilter] = useState();

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
    setSearchEntities(allPokemon);
  }

  const handleSearch = () => {
    const response = searchEntities.filter((i) => {
      return i.props.name.includes(searchValue);
    });

    setEntities(response);
  };

  useEffect(() => {
    const response = searchEntities.filter((i) => {
      return i.props.name.includes(searchValue);
    });

    setEntities(response);
  }, [searchValue]);

  // type search filter

  let alldata;
  const fiterdata = async () => {
    const url = `https://pokeapi.co/api/v2/type/${typefilter}`;
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

    setEntities(
      alldata.splice(pageDatafortype.currPage, pageDatafortype.nextPage)
    );
  };

  useEffect(() => {
    fiterdata();
  }, [typefilter, pageDatafortype]);

  useEffect(() => {
    getPokemon();
  }, [pageData]);

  const resetAll = () => {
    setTypeFilter(null);
    setGenderFilter(null);
    setEntities(null);
    setPageData({
      currPage: (pageData.currPage = 0),
      nextPage: (pageData.nextPage = 18),
    });
    setPageDatafortype({
      currPage: (pageData.currPage = 0),
      nextPage: (pageData.nextPage = 18),
    });
    setPageDataforgender({
      currPage: (pageData.currPage = 0),
      nextPage: (pageData.nextPage = 18),
    })
    getPokemon();
  };

  // gender filter

  let allGenderData;
  const genderFiterData = async () => {
    const url = `https://pokeapi.co/api/v2/gender/${genderFiter}/`;
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
    setEntities(
      allGenderData.splice(pageDataforgender.currPage , pageDataforgender.nextPage)
    );
  };

  useEffect(() => {
    genderFiterData();
  }, [genderFiter, pageDataforgender]);

  const closeModal = (id) => {
    setId(id);
    setModal(true);
  };

  const setCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className={styles.pokedexContainer}>
        <div className={styles.title}>
          <h1>Pokédex</h1>
          <h1 style={{ marginLeft: "10px" }}>|</h1>
          <p className={styles.titlepara}>
            Search for any Pokémon that exists on the planet
          </p>
        </div>
        <p>Search by</p>
        <div className={styles.filds}>
          <div className={styles.searchContent}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name or Number"
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch();
              }}
            ></input>
            <button className={styles.searchBtn} onClick={handleSearch}>
              <SearchIcon />
            </button>
          </div>
          <div className={styles.filterContent}>
            <div className="type-content">
              <p>Type</p>
              <select
                className="dropdown"
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                }}
              >
                {typesOptions.map((type) => (
                  <option value={`${type}`}>{type}</option>
                ))}
              </select>
              <button onClick={resetAll}>Reset-All</button>
            </div>
            <div className="gender-content">
              <p>gender</p>
              <select onChange={(e)=>{
                setGenderFilter(e.target.value);
              }}>
                {genderOptions.map((type) => (
                  <option value={`${type}`}>
                    {type}
                  </option>
                ))}
              </select>
              <button onClick={resetAll}>Reset-Gender</button>
            </div>
          </div>
        </div>
      </div>

      {/* all pokemon */}
      <div className="inner-div">{entities}</div>

      {((!typefilter && !genderFiter )?<Pagination setPageData={setPageData} pageData={pageData} />  : null )}

      {(typefilter ? <Pagination
            setPageData={setPageDatafortype}
            pageData={pageDatafortype}
          /> : null )}

      {(genderFiter ? <Pagination
            setPageData={setPageDataforgender}
            pageData={pageDataforgender}
          /> :null )}

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
