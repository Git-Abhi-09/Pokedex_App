import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";
import Navbar from "@/components/Navbar";
import PokemonModel from "@/components/PokemonModel";
import GetpopupData from "./GetpopupData";

const Home = () => {
  const [entities, setEntities] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  console.log("id:",id);
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

  useEffect(() => {
    getPokemon();
  }, [pageData]);

  const nextIndex = () => {
    setPageData({
      currPage: pageData.currPage + 20,
      nextPage: (pageData.nextPage = 20),
    });
    console.log("next:", pageData);
  };

  const prevIndex = () => {
    setPageData({
      currPage: pageData.currPage - 20,
      nextPage: (pageData.nextPage = 20),
    });
    console.log("prev:", pageData);
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
      <Navbar />
      <div className="inner-div">{entities}</div>
      <div className="button-div">
        <button onClick={prevIndex}>previce</button>
        <button onClick={nextIndex}>Next</button>
        {console.log("modal value", modal)}
      </div>
      {modal ? (
        <PokemonModel id={id} closeModal={closeModal} setCloseModal={setCloseModal} />
      ) : null}
    </>
  );
};

export default Home;
