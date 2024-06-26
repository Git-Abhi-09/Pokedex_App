import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const PokemonModel = (props) => {
  const url_text = `https://pokeapi.co/api/v2/pokemon-species/${props.id}/`;
  const url = `https://pokeapi.co/api/v2/pokemon/${props.id}/`;

  const [pokemonData, setpokemonData] = useState();
  const [text, getText] = useState("");
  const [evaluationData, getEvaluationData] = useState("");
  const [imgData, getImgData] = useState([]);
  const [imgUrl, getImgUrl] = useState([]);
  const [evalId, getEvalId] = useState([]);
  const [evalName, getEvalName] = useState([]);
  const [pokemonStats , getPokemonStats] = useState([]);

  useEffect(() => {
    fetch(url).then((res) => {
      res.json().then((data) => {
        setpokemonData(data);
      });
    });
  }, [props.id]);

  useEffect(() => {
    fetch(url_text).then((res) => {
      res.json().then((data_text) => {
        getText(data_text);
      });
    });
  }, [props.id]);

  // stats

  useEffect(()=>{
    pokemonData?.stats.forEach((pokeStats) => {
      console.log("stats.......",pokeStats.base_stat);
      getPokemonStats((prevStats)=>{
        return [...prevStats,pokeStats.base_stat];
      })
    });
  },[pokemonData])

  // Evaluation - chain

  const evaluation_url = text.evolution_chain?.url;

  useEffect(() => {
    fetch(evaluation_url).then((res) => {
      res.json().then((Evaluation_text) => {
        getEvaluationData(Evaluation_text);
      });
    });
  }, [text]);

  let EvolutionArray = [];
  EvolutionArray.push(evaluationData?.chain?.species);
  EvolutionArray.push(evaluationData?.chain?.evolves_to[0]?.species);
  let eval3 =
    evaluationData?.chain?.evolves_to[0]?.evolves_to[0] == undefined
      ? ""
      : evaluationData?.chain?.evolves_to[0]?.evolves_to[0]?.species;
  if (eval3 != "") {
    EvolutionArray.push(eval3);
  }

  // console.log("EvolutionArray :",EvolutionArray);

  // get evaluation img

  useEffect(() => {
    EvolutionArray.forEach((obj) => {
      fetch(obj?.url).then((res) => {
        res.json().then((img_data) => {
          getImgData((previous) => {
            return [...previous, img_data.id];
          });

          // const imgData = [img_data.id]
          console.log("img_id :", img_data.id);
        });
      });
    });
  }, [evaluationData]);

  console.log("main_img_id :", imgData);

  useEffect(() => {
    imgData.forEach((getEval_img_id) => {
      const eval_url = `https://pokeapi.co/api/v2/pokemon/${getEval_img_id}/`;
      fetch(eval_url).then((res) => {
        res.json().then((eval_img_url) => {
          // get img
          getImgUrl((pre_eval_img) => {
            return [
              ...pre_eval_img,
              eval_img_url?.sprites?.other?.dream_world?.front_default,
            ];
          });
          // get id
          getEvalId((pre_id) => {
            return [...pre_id, eval_img_url.id];
          });
          // get name
          getEvalName((pre_name) => {
            return [...pre_name, eval_img_url.name];
          });
        });
      });
    });
  }, [imgData]);

  const unique_eval_url = [...new Set(imgUrl)];
  const evaluation_img_array = unique_eval_url.sort();

  const unique_evalId = [...new Set(evalId)];
  const evaluation_id_array = unique_evalId.sort();

  const unique_evalName = [...new Set(evalName)];
  const evaluation_name_array = unique_evalName.sort();

  console.log("evalId", evalId);
  console.log("evalName", evalName);

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
            <PokemonCard img={pokemonData?.sprites?.other?.dream_world?.front_default}/>
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
                {text.egg_groups?.map((data) => {
                  return (
                    <button style={{ cursor: "auto" }}>{data.name}</button>
                  );
                })}
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
                {pokemonData?.types[0] ? pokemonData?.types[0]?.type.name : ""}
                <strong> , </strong>
                {pokemonData?.types[1] ? pokemonData?.types[1]?.type.name : ""}
              </p>
              <p>
                <strong>Weak Against:</strong> Fighting, Ground, Steel, Water,
                Grass</p>
                <strong>stats:</strong>
                <>
                  <p>hp :<progress id="file" value={pokemonStats[0]} max="100"></progress></p>
                  <p>attack :<progress id="file" value={pokemonStats[1]} max="100"></progress></p>
                  <p>defense :<progress id="file" value={pokemonStats[2]} max="100"></progress></p>
                  <p>special-attack :<progress id="file" value={pokemonStats[3]} max="100"></progress></p>
                  <p>special-defense :<progress id="file" value={pokemonStats[4]} max="100"></progress></p>
                  <p>speed :<progress id="file" value={pokemonStats[5]} max="100"></progress></p>
                  </>
                
            </div>
          </div>
          <div className="evolution-chain">
            <h2>Evolution Chain</h2>
            <div className="evolution">
              {evaluation_id_array.map((singlePok, index) => {
                return (
                  <PokemonCard
                    id={singlePok}
                    name={evaluation_name_array[index]}
                    img={evaluation_img_array[index]}
                  />
                );
              })}

              <div>
                <button className="close-btn" 
                  onClick={() => {
                    props?.setCloseModal();
                  }}
                >
                 X
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
