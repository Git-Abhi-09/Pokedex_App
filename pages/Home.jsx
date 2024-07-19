import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import PokemonModel from "@/components/PokemonModel";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/navbar.module.css";
import Pagination from "@/components/Pagination";
import Dropdown from "@/components/Dropdown";
import TuneIcon from '@mui/icons-material/Tune';
import Mobilemodal from "@/components/Mobilemodal";

const Options = [
  { id: 1, value: "fire", label: "fire" },
  { id: 2, value: "fighting", label: "fighting" },
  { id: 3, value: "flying", label: "flying" },
  { id: 4, value: "poison", label: "poison" },
  { id: 5, value: "ground", label: "ground" },
  { id: 6, value: "rock", label: "rock" },
  { id: 7, value: "bug", label: "bug" },
  { id: 8, value: "grass", label: "grass" },
  { id: 9, value: "water", label: "water" },
];

const genderOptions = [
  { id: 1, value: "male", label: "male" },
  { id: 2, value: "female", label: "female" },
  { id: 3, value: "genderless", label: "genderless" },
];

const Home = () => {
  const [entities, setEntities] = useState([]);
  const [searchEntities, setSearchEntities] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pkid, setId] = useState(null);
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
  const [typeOptions, setTypeOptions] = useState([]);
  const [genderOption, setGenderOption] = useState([]);
  const [mobileModal, setMobileModal] = useState(false);

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
      return i.props.name.includes(searchValue.toLowerCase());
    });

    setEntities(response);
  }, [searchValue]);

  let alldata;
  const fiterTypedata = async () => {
    if (
      (typeOptions && typeOptions?.length == 0 && !genderOption) ||
      (!typeOptions && !genderOption) ||
      (genderOption && genderOption?.length == 0 && !typeOptions)
    ) {
      getPokemon();
    }
    setGenderOption(null);

    const typedPokemons = [];
    for (let i = 0; i < typeOptions?.length; i++) {
      const each = typeOptions[i];
      const url = `https://pokeapi.co/api/v2/type/${each}`;
      const responace = await fetch(url);
      const data = await responace.json();
      typedPokemons.push(...data.pokemon.map((pk) => pk.pokemon.url));
    }
    const filteredTypedPokemons = new Set(typedPokemons);

    const fetchPromises = [...filteredTypedPokemons].map((url) =>
      fetch(url).then((res) => res.json())
    );

    const responses = await Promise.all(fetchPromises);

    alldata = responses?.map((res) => {
      const color = [
        res?.types[0]?.type.name,
        res?.types.length === 2
          ? res?.types[1]?.type.name
          : res?.types[0]?.type.name,
      ];

      setColor(color);

      return (
        <PokemonCard
          key={res.id}
          img={res?.sprites?.other?.dream_world?.front_default}
          name={res.forms[0].name}
          id={res.id}
          className="pokemon-card"
          closeModal={closeModal}
          color={color}
        />
      );
    });
    setEntities(
      alldata?.splice(pageDatafortype.currPage, pageDatafortype.nextPage)
    );
  };

  useEffect(() => {
    fiterTypedata();
  }, [pageDatafortype, typeOptions?.length]); // change 1

  useEffect(() => {
    getPokemon();
  }, [pageData]);

  // gender filter

  const genderFiterData = async () => {
    if (
      (typeOptions && typeOptions?.length == 0 && !genderOption) ||
      (!typeOptions && !genderOption) ||
      (genderOption && genderOption?.length == 0 && !typeOptions)
    ) {
      getPokemon();
    }
    setTypeOptions(null);
    const pokeIds = [];
    for (let i = 0; i < genderOption?.length; i++) {
      const each = genderOption[i];
      const url = `https://pokeapi.co/api/v2/gender/${each}`;
      const responace = await fetch(url);
      const data = await responace.json();
      pokeIds.push(
        ...data.pokemon_species_details?.map((pk) =>
          pk.pokemon_species.url.substring(42).replace("/", "")
        )
      );
    }

    const filteredTypedPokemonsIds = new Set(pokeIds);

    const fetchPromises = [...filteredTypedPokemonsIds].map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) =>
        res.json()
      )
    );

    const responses = await Promise.all(fetchPromises);

    alldata = responses?.map((res) => {
      const color = [
        res?.types[0]?.type.name,
        res?.types.length === 2
          ? res?.types[1]?.type.name
          : res?.types[0]?.type.name,
      ];

      setColor(color);

      return (
        <PokemonCard
          key={res.id}
          img={res?.sprites?.other?.dream_world?.front_default}
          name={res.forms[0].name}
          id={res.id}
          className="pokemon-card"
          closeModal={closeModal}
          color={color}
        />
      );
    });
    setEntities(
      alldata?.splice(pageDataforgender.currPage, pageDataforgender.nextPage)
    );
  };

  useEffect(() => {
    genderFiterData();
  }, [pageDataforgender, genderOption?.length]);

  const closeModal = (id) => {
    setId(id);
    setModal(true);
  };

  const setCloseModal = () => {
    setModal(false);
  };

  const getMobileModal = () =>{
    setMobileModal(true);
  }

  return (
    <>
      <div className={styles.pokedexContainer}>
        <div className={styles.title}>
          <h1 className={styles.titleName}>Pokédex</h1>
          <h1 className={styles.symbol}>|</h1>
          <div className={styles.line}></div>
          <p className={styles.titlepara}>
            Search for any Pokémon that exists on the planet
          </p>
        </div>
        <p className={styles.search}>Search by</p>
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
            <button className={styles.searchFilter} onClick={getMobileModal}>
              <TuneIcon/>
            </button>
            
          </div>
          <div className={styles.filterContent}>
            <div className={styles.typeContent}>
              <Dropdown
                setOptions={setTypeOptions}
                fiterdata={fiterTypedata}
                Options={Options}
                style={{ marginLeft: "350px" }}
                optionName="Types"
              />
            </div>
            <div className={styles.genderContent}>
              <Dropdown
                setOptions={setGenderOption}
                fiterdata={genderFiterData}
                Options={genderOptions}
                optionName="Gender"
              />
            </div>
          </div>
        </div>
      </div>

      {/* all pokemon */}
      <div className="inner-div">{entities}</div>

      {!typeOptions && !genderOption && (
        <Pagination setPageData={setPageData} pageData={pageData} />
      )}

      {typeOptions && !genderOption && (
        <Pagination
          setPageData={setPageDatafortype}
          pageData={pageDatafortype}
        />
      )}

      {genderOption && !typeOptions && (
        <Pagination
          setPageData={setPageDataforgender}
          pageData={pageDataforgender}
        />
      )}

      {modal ? (
        <PokemonModel
          color={color}
          id={pkid}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
        />
      ) : null}
      {console.log(mobileModal)}
      {mobileModal ? (
        <Mobilemodal
        closeMobileModal={()=>{
          setMobileModal(false);
        }}
        setOptions={setTypeOptions}
        fiterdata={fiterTypedata}
        Options={Options}
        optionName = "Types"

        setOptionsG={setGenderOption}
        fiterdataG={genderFiterData}
        OptionsG={genderOptions}
        optionNameG = "Gender"


        />
      ) : null}
    </>
  );
};

export default Home;
