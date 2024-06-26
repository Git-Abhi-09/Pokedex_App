import { useEffect, useState } from "react";

const PokemonModel = (props) => {
  console.log("Pokemon Id:", props.id);
  const url_text = `https://pokeapi.co/api/v2/pokemon-species/${props.id}/`;
  const url = `https://pokeapi.co/api/v2/pokemon/${props.id}/`;

  console.log("url", url);

  const [pokemonData, setpokemonData] = useState();
  const [text, getText] = useState("");

  useEffect(() => {
    fetch(url).then((res) => {
      res.json().then((data) => {
        console.log("data:", data);
        setpokemonData(data);
      });
    });
  }, [props.id]);

  useEffect(() => {
    fetch(url_text).then((res) => {
      res.json().then((data_text) => {
        console.log("data_text:", data_text);
        getText(data_text);
      });
    });
  }, [props.id]);

  // Evaluation - chain

  const Evaluation_url = text.evolution_chain.url;

  useEffect(() => {
    fetch(Evaluation_url).then((res) => {
      res.json().then((Evaluation_text) => {
        console.log("data_text:", data_text);
        getText(data_text);
      });
    });
  }, [props.id]);


  let pokemon_discription = "";

  text?.flavor_text_entries?.forEach((element) => {
    if (element?.language?.name === "en") {
      if (
        !pokemon_discription?.includes(
          element?.flavor_text.replace("\n", "").replace("", "")
        )
      ) {
        pokemon_discription += element?.flavor_text
          .replace("\n", "")
          .replace("", "");
      }
    }
  });

  let eggArray_len = text.egg_groups?.length;

  return (
    <>
      <div
        className="modal-wrapper"
        onClick={() => {
          props.setCloseModal();
        }}
      ></div>
      <div className="modal-container">
        <div className="container">
          <div className="header">
            <h1>{pokemonData?.name}</h1>
            <span className="number">00{pokemonData?.id}</span>
          </div>
          <div className="model-card">
            <img
              className="pokemon-image"
              src={pokemonData?.sprites?.other?.dream_world?.front_default}
              alt="Charizard"
            ></img>
            <p>{pokemon_discription?.substring(0, 500) + "..."}</p>
          </div>
          <div className="details">
            <div className="info">
              <p>
                <strong>Height:</strong> {pokemonData?.height}
              </p>
              <p>
                <strong>Weight:</strong>
                {pokemonData?.weight}
              </p>
              <p>
                <strong>Gender(s):</strong> Male, Female
              </p>
              <p>
                <strong>Egg Groups:</strong>
                {/* if ({eggArray_len.length} === 2) { */}
                {text.egg_groups ? text.egg_groups[0].name : ""} ,
                {text.egg_groups ? text.egg_groups[1].name : ""}
                {/* } */}
                {console.log("egg-length:", text.egg_groups?.length)}
              </p>
              <p>
                <strong>
                  {pokemonData?.abilities
                    ? pokemonData?.abilities[0].ability?.name
                    : ""}
                </strong>
                Blaze, Solar-Power
              </p>
            </div>
            <div className="types">
              <p>
                <strong>Types:</strong>
                {pokemonData?.types[0]
                 ? pokemonData?.types[0]?.type.name
                  : ""}
                <strong> , </strong>
                {pokemonData?.types[1]
                 ? pokemonData?.types[1]?.type.name
                  : ""}
              </p>
              <p>
                <strong>Weak Against:</strong> Fighting, Ground, Steel, Water,
                Grass
              </p>
            </div>
          </div>
          <div className="evolution-chain">
            <h2>Evolution Chain</h2>
            <div className="evolution">
              <div className="evo-stage">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                  alt="Charmander"
                ></img>
                <p>Charmander</p>
                <span>004</span>
              </div>
              <span>&rarr;</span>
              <div className="evo-stage">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                  alt="Charmeleon"
                ></img>
                <p>Charmeleon</p>
                <span>005</span>
              </div>
              <span>&rarr;</span>
              <div className="evo-stage">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                  alt="Charizard"
                ></img>
                <p>Charizard</p>
                <span>006</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    props.setCloseModal();
                  }}
                >
                  closeModal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonModel;
