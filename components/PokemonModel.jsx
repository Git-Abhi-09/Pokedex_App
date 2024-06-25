const PokemonModel = (props) => {
  return (
    <>
      <div
        className="modal-wrapper"
        onClick={() => {
          props.setCloseModal();
        }}
      >
        <div className="modal-container">
          <div className="container">
            <div className="header">
              <h1>{props.name}</h1>
              <span className="number">00{props.id}</span>
            </div>
            <div className="description">
              <img src={props.img} alt="Charizard"></img>
              <p>
                Spits fire that is hot enough to melt boulders. Known to cause
                forest fires unintentionally. When expelling a blast of super
                hot fire, the red flame at the tip of its tail burns more
                intensely. If CHARIZARD becomes furious, the flame at the tip of
                its tail flares up in a whitish-blue color. Breathing intense,
                hot flames, it can melt almost anything. Its breath inflicts
                terrible pain on enemies...
              </p>
            </div>
            <div className="details">
              <div className="info">
                <p>
                  <strong>Height:</strong> 5'7"
                </p>
                <p>
                  <strong>Weight:</strong> 90.5 Kg
                </p>
                <p>
                  <strong>Gender(s):</strong> Male, Female
                </p>
                <p>
                  <strong>Egg Groups:</strong> Monster, Dragon
                </p>
                <p>
                  <strong>Abilities:</strong> Blaze, Solar-Power
                </p>
              </div>
              <div className="types">
                <p>
                  <strong>Types:</strong> Fire, Flying
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
      </div>
    </>
  );
};

export default PokemonModel;
