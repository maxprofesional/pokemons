import React, { useState } from "react";
import styles from "./Card.module.css";
import { pokemonApiById } from "../api/pokemonsApi";
import { useEffect } from "react";

const Card = ({ name, url, choosePokemon }) => {
  const [pokemon, setPokemon] = useState([]);
  const fetchPokemon = async () => {
    try {
      const data = await pokemonApiById(url);
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className={styles.card} onClick={() => choosePokemon(pokemon)}>
      <div className={styles.imageContainer}>
        <img
          src={pokemon.sprites?.front_default}
          alt={name}
          className={styles.image}
        />
      </div>
      <h3 className={styles.name}>{name}</h3>
    </div>
  );
};

export default Card;
