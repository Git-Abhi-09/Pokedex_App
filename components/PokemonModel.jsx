import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Arrow from "./Arrow";
import ProgressBar from "./ProgressBar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/pokemonModel.module.css";

const PokemonModel = (props) => {
  const url_text = `https://pokeapi.co/api/v2/pokemon-species/${props.id}/`;
  const url = `https://pokeapi.co/api/v2/pokemon/${props.id}/`;

  const [pokemonData, setpokemonData] = useState();
  const [text, getText] = useState("");
  const [imgUrl, getImgUrl] = useState([]);
  const [evalId, getEvalId] = useState([]);
  const [evalName, getEvalName] = useState([]);
  const [pokemonStats, getPokemonStats] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [colorData1, setColorData1] = useState([]);
  const [modal, setModal] = useState(false);
  const [pokemonDiscription, setPokemonDiscription] = useState(" ");
  const [evalImgId, setEvalImgId] = useState([]);

  useEffect(() => {
    const stats = ["HP", "attack", "defense", "sp.Attack", "sp.Def", "speed"];

    fetch(url).then((res) => {
      res.json().then((data) => {
        setpokemonData(data);
        // stats
        data?.stats.forEach((pokeStats, index) => {
          getPokemonStats((prevStats) => {
            return [
              ...prevStats,
              <p>
                {stats[index]} <ProgressBar progress={pokeStats.base_stat} />
              </p>,
            ];
          });
        });
      });
    });

    getPokemonStats([]);

    fetch(url_text).then((res) => {
      res.json().then((data_text) => {
        getText(data_text);
        // pokemon discription
        let pokemon_discription = " ";
        data_text?.flavor_text_entries?.forEach((element) => {
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
        setPokemonDiscription(pokemon_discription);

        // Evaluation - chain
        const evaluation_url = data_text.evolution_chain?.url;

        fetch(evaluation_url).then((res) => {
          res.json().then((Evaluation_text) => {
            const evalArray = [
              Evaluation_text?.chain?.species,
              Evaluation_text?.chain?.evolves_to[0]?.species,
              Evaluation_text?.chain?.evolves_to[0]?.evolves_to[0] == undefined
                ? ""
                : Evaluation_text?.chain?.evolves_to[0]?.evolves_to[0]?.species,
            ];

            for (let index = 0; index < evalArray.length; index++) {
              const element = evalArray[index].url
                .substring(42)
                .replace("/", "");
              setEvalImgId((prev) => {
                return [...prev, element];
              });
            }
          });
        });
      });
    });
  }, [props.id]);

  useEffect(() => {
    evalImgId.forEach((id) => {
      const eval_url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
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

          setColorData1(() => {
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
  }, [evalImgId]);

  const unique_eval_url = [...new Set(imgUrl)];
  let evaluation_img_array = unique_eval_url.sort();

  const unique_evalId = [...new Set(evalId)];
  let evaluation_id_array = unique_evalId.sort();

  const unique_evalName = [...new Set(evalName)];
  const evaluation_name_array = unique_evalName.sort();

  const getModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div
        className={styles.modalWrapper}
        onClick={() => {
          props.setCloseModal();
        }}
      ></div>
      <div className={styles.modalContainer}>
        <div className={styles.container}>
          <div className="header-inside">
            <h6 style={{ textTransform: "uppercase" }}>{pokemonData?.name}</h6>
            <h6>00{pokemonData?.id}</h6>
            <div className={styles.btnDiv}>
              <button
                className={styles.closeBtn}
                onClick={() => {
                  getEvalId([]);
                  setEvalImgId([]);
                  getImgUrl([]);
                  props?.closeModal(props.id - 1);
                }}
              >
                <ArrowBackIcon className="icon"/>
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => {
                  getEvalId([]);
                  setEvalImgId([]);
                  getImgUrl([]);
                  props?.setCloseModal();
                }}
              >
                <CloseIcon />
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => {
                  getEvalId([]);
                  setEvalImgId([]);
                  getImgUrl([]);
                  props?.closeModal(props.id + 1);
                }}
              >
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
          <div className={styles.modelCard}>
            <PokemonCard
              img={pokemonData?.sprites?.other?.dream_world?.front_default}
              color={colorData1[0]}
              id={pokemonData?.id}
            />
            <p className={styles.pokemonDetail}>
              {pokemonDiscription?.substring(0, 700)}
            </p>
          </div>
          <a className="read-more" onClick={getModal}>
                ...read more
              </a>
          {modal ? (
            <div className={styles.modalText}>
              <p id="pokemonDescription">
                {pokemonDiscription?.substring(701)}
              </p>
              <botton className={styles.closeBtn1} onClick={closeModal}>
                X
              </botton>
            </div>
          ) : null}

          <div className={styles.info}>
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
              {pokemonData?.abilities.map((ele) => (
                <>
                  <span>{ele.ability?.name}</span>&nbsp;
                </>
              ))}
            </p>
            <p>
              <h3>Types:</h3>
              {pokemonData?.types.map((ele) => (
                <>
                  <button className={styles.typeBtn}>{ele.type.name}</button> &nbsp;
                </>
              ))}
            </p>
            <p>
              <h3>Weak Against:</h3> Fighting, Ground, Steel, Water, Grass
            </p>
          </div>

          <div className={styles.types}>
            <div className={styles.stats}>
              {pokemonStats}
            </div>
          </div>
          <div className="evolution-chain">
            <h2>Evolution Chain</h2>
            <div className={styles.evolution}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonModel;
