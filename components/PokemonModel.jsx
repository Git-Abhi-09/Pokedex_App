import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Arrow from "./Arrow";
import ProgressBar from "./ProgressBar";

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
  const [pokemonStats, getPokemonStats] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [colorData1, setColorData1] = useState([]);
  const [modal, setModal] = useState(false);

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

  // color

  // stats

  useEffect(() => {
    pokemonData?.stats.forEach((pokeStats) => {
      getPokemonStats((prevStats) => {
        return [...prevStats, pokeStats.base_stat];
      });
    });
  }, [pokemonData]);

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

  useEffect(() => {
    EvolutionArray.forEach((obj) => {
      fetch(obj?.url).then((res) => {
        res.json().then((img_data) => {
          getImgData((previous) => {
            return [...previous, img_data.id];
          });
        });
      });
    });
  }, [evaluationData]);

  useEffect(() => {
    EvolutionArray.forEach((singlPok) => {});
    imgData.forEach((getEval_img_id) => {
      const eval_url = `https://pokeapi.co/api/v2/pokemon/${getEval_img_id}/`;
      fetch(eval_url).then((res) => {
        res.json().then((eval_img_url) => {
          // get color

          const color = [
            eval_img_url?.types[0]?.type.name,
            eval_img_url?.types.length === 2
              ? eval_img_url?.types[1]?.type.name
              : eval_img_url?.types[0]?.type.name,
          ];

          setColorData((prev) => {
            return [...prev, color];
          });

          setColorData1((prev) => {
            return [color];
          });

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
  let evaluation_id_array = unique_evalId.sort();

  const unique_evalName = [...new Set(evalName)];
  const evaluation_name_array = unique_evalName.sort();

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

  const getModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

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
          <div className="header-inside">
            <h1>{pokemonData?.name}</h1>
            <h1>00{pokemonData?.id}</h1>
          </div>
          <div className="model-card">
            <PokemonCard
              img={pokemonData?.sprites?.other?.dream_world?.front_default}
              color={colorData1[0]}
              id={pokemonData?.id}
            />
            <p className="pokemon-detail">
              {pokemon_discription?.substring(0, 700)}
              <a className="read-more" onClick={getModal}>
                ...read more
              </a>
            </p>
          </div>
          {modal ? (
            <div className="modal-text">
              <p id="pokemonDescription">
                {pokemon_discription?.substring(701)}
              </p>
              <botton className="close-btn1" onClick={closeModal}>
                X
              </botton>
            </div>
          ) : null}

          <div className="info">
            <p>
              <h3>Height:</h3> {pokemonData?.height}
            </p>
            <p>
              <h3>Weight:</h3>
              {pokemonData?.weight}
            </p>
            <p>
              <h3>Gender(s):</h3> Male, Female
            </p>
            <p>
              <h3>Egg Groups:</h3>
              {text.egg_groups?.map((data) => {
                return <span>{data.name} ,</span>;
              })}
            </p>
            <p>
              <h3>Ability :</h3>
              {pokemonData?.abilities
                ? pokemonData?.abilities[0].ability?.name
                : ""}
            </p>
            <p>
              <h3>Types:</h3>
              <button className="type-btn">
                {pokemonData?.types[0] ? pokemonData?.types[0]?.type.name : ""}
              </button>
              <button className="type-btn">
                {pokemonData?.types[1] ? pokemonData?.types[1]?.type.name : ""}
              </button>
            </p>
            <p>
              <h3>Weak Against:</h3> Fighting, Ground, Steel, Water, Grass
            </p>
          </div>

          <div className="types">
            <div className="stats">
              <p>
                HP <ProgressBar progress={pokemonStats[0]} />
              </p>
              <p>
                attack <ProgressBar progress={pokemonStats[1]} />
              </p>
              <p>
                defense <ProgressBar progress={pokemonStats[2]} />
              </p>
              <p>
                sp.Attack
                <ProgressBar progress={pokemonStats[3]} />
              </p>
              <p>
                sp.Def
                <ProgressBar progress={pokemonStats[4]} />
              </p>
              <p>
                speed
                <ProgressBar progress={pokemonStats[5]} />
              </p>
            </div>
          </div>
          <div className="evolution-chain">
            <h2>Evolution Chain</h2>
            <div className="evolution">
              {evaluation_id_array.map((singlePok, index) => {
                return (
                  <>
                    <PokemonCard
                      id={singlePok}
                      name={evaluation_name_array[index]}
                      img={evaluation_img_array[index]}
                      color={colorData[index]}
                    /> 
                    {evaluation_id_array.length === index + 1 ? "" : <Arrow />}
                  </>
                );
              })}

              <div>
                <button
                  onClick={() => {
                    props?.closeModal(props.id - 1);
                  }}
                >
                  prev
                </button>
                <button
                  className="close-btn"
                  onClick={() => {
                    getEvalId([]);
                    props?.setCloseModal();
                  }}
                >
                  X
                </button>
                <button
                  onClick={() => {
                    getEvalId([]);
                    props?.closeModal(props.id + 1);
                  }}
                >
                  next
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
