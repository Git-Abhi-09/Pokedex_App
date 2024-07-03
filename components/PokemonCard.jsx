import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PokemonCard = (props) => {
  const route = useRouter();
  // const [bgcolor, setColor] = useState([]);

  const color = {
    normal: "#DDCBD0",
    fighting: "#FCC1B0 ",
    flying: " #B2D2EB",
    poison: "#CFB7ED",
    ground: "#F4D1A6",
    rock: "#C5AEA8",
    bug: "#C1E0C8",
    ghost: "#D7C2D7",
    steel: "#C2D4CE",
    fire: "#EDC2C4",
    water: "#CBD5ED",
    grass: "#C0D4C8",
    electric: "#E2E2A0",
    psychic: "#DDC0CF",
    ice: "#C7D7DF",
    dragon: "#CADCDF",
    dark: "#C6c5E3",
    fairy: "#E4C0CF",
    unknown: "#C0DFDD",
    shadow: "#CACACA",
  };

  return (
    <>
      <div className="main-div">
        <div
          key={1}
          className="card"
          onClick={() => {
            props.closeModal(props?.id);
          }}
          style={{
            background: `linear-gradient(to bottom,${
              color?.[props?.color ? props?.color[0] : ""]
            },${color?.[props?.color ? props?.color[1] : ""]})`,
          }}
        >
          <img
            src={props.img}
            alt="pokemon-image"
            className="pokemon-image"
            height="400"
            width="250"
          />
          <div className="pokemon-name">{props.name}</div>
          <div className="pokemon-number">00{props.id}</div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
