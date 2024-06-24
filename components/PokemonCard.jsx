const PokemonCard = (props) => {
  return (
    <>
      <div className="main-div">
          <div key={1} className="card">
            <img
              src={props.img}
              alt="pokemon-image"
              className="pokemon-image"
              height="400"
              width="250"
            ></img>
            <div className="pokemon-name">{props.name}</div>
            <div className="pokemon-number">00{props.id}</div>
          </div>
          </div>
    </>
  )
}

export default PokemonCard;
