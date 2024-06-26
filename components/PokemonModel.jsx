import { useEffect, useState } from "react";

const PokemonModel = (props) => {
  const url_text = `https://pokeapi.co/api/v2/pokemon-species/${props.id}/`;
  const url = `https://pokeapi.co/api/v2/pokemon/${props.id}/`;


  const [pokemonData, setpokemonData] = useState();
  const [text, getText] = useState("");
  const [evaluationData , getEvaluationData] = useState("");
  const [imgData , getImgData] = useState([]);
  const [imgUrl , getImgUrl] = useState([]);
  const [evalId , getEvalId] = useState([]);
  const [evalName , getEvalName] = useState([]);


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

    useEffect(()=>{
      EvolutionArray.forEach((obj)=>{
        fetch(obj?.url).then((res) => {
          res.json().then((img_data) => {
            getImgData((previous)=>{
              return [...previous,img_data.id]
            });

            // const imgData = [img_data.id]
            console.log("img_id :",img_data.id);
          });
        });
    })

    },[evaluationData]);

    console.log("main_img_id :",imgData);

    useEffect(()=>{
      imgData.forEach((getEval_img_id)=>{
        const eval_url = `https://pokeapi.co/api/v2/pokemon/${getEval_img_id}/`
        fetch(eval_url).then((res) => {
          res.json().then((eval_img_url) => {
            console.log("eval_img_url",eval_img_url?.sprites?.other?.dream_world?.front_default);
            // get img
            getImgUrl((pre_eval_img)=>{
              return[...pre_eval_img ,eval_img_url?.sprites?.other?.dream_world?.front_default]
            })
            // get id
            getEvalId((pre_id)=>{
              return[...pre_id ,eval_img_url.id]
            })
            // get name
            getEvalName((pre_name)=>{
              return[...pre_name,eval_img_url.name]
            })
          });
        });
      })
    },[imgData])

    const unique_eval_url = [...new Set(imgUrl)];
    const evaluation_img_array =unique_eval_url.sort();

    const unique_evalId = [...new Set(evalId)];
    const evaluation_id_array =unique_evalId.sort();

    const unique_evalName = [...new Set(evalName)];
    const evaluation_name_array =unique_evalName.sort();
    
    console.log("evalId",evalId);
    console.log("evalName",evalName);

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
                  src={evaluation_img_array[0]?evaluation_img_array[0]:" "}
                  alt="Charmander"
                ></img>
                <p>{evaluation_name_array[0]?evaluation_name_array[0]:""}</p>
                <span>00{evaluation_id_array[0]?evaluation_id_array[0]:""}</span>
              </div>
              <span>&rarr;</span>
              <div className="evo-stage">
                <img
                  src={evaluation_img_array[1]?evaluation_img_array[1]:""}
                  alt="Charmeleon"
                ></img>
                <p>{evaluation_name_array[1]?evaluation_name_array[1]:""}</p>
                <span>00{evaluation_id_array[1]?evaluation_id_array[1]:""}</span>
              </div>
              <span>&rarr;</span>
              <div className="evo-stage">
                <img
                  src={evaluation_img_array[2]?evaluation_img_array[2]:""}
                  alt="Charizard"
                ></img>
                <p>{evaluation_name_array[2]?evaluation_name_array[2]:""}</p>
                <span>00{evaluation_id_array[2]?evaluation_id_array[2]:""}</span>
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
