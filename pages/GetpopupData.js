import { useState, useEffect } from "react";
import React from "react";
import PokemonModel from "@/components/PokemonModel";
const GetpopupData = (props) => {
    console.log("inside GetpopupData",props.id);
  const url = `https://pokeapi.co/api/v2/pokemon/${props.id}/`;

  async function getPokemon() {
    const res = await fetch(url);
    const resData = await res.json();
    return (
      <PokemonModel
        key={resData.id}
        img={resData.sprites.other.dream_world.front_default}
        name={resData.forms[0].name}
        id={resData.id}
      />
    );
  }

  useEffect(() => {
    getPokemon();
  }, [props.id]);

  return <></>;
};

export default GetpopupData;
