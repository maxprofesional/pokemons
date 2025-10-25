import React, { useEffect, useState } from "react";
import { usePokemons } from "../store/pokemons";
import styles from "./ArenaPage.module.css";

const ArenaPage = () => {
  const { collection } = usePokemons();
  const [leftOponent, setLeftOponent] = useState(collection[0]?.id || "");
  const [rightOponent, setRightOponent] = useState(collection[1]?.id || "");
  const [winner, setWinner] = useState(null); // left/right/draw
  function findObjForId(id) {
    return collection.find((pok) => pok.id === +id);
  }
  const score = (pokemon) => {
    return pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);
  };

  const drawRight = () => {
    return findObjForId(+rightOponent)?.sprites.front_shiny;
  };
  const drawLeft = () => {
    return findObjForId(+leftOponent)?.sprites.front_shiny;
  };

  useEffect(() => {
    setWinner(null);
  }, [leftOponent, rightOponent]);

  const onFight = () => {
    const leftObj = findObjForId(+leftOponent);
    const rightObj = findObjForId(+rightOponent);

    const leftScore = score(leftObj);
    const rightScore = score(rightObj);

    if (leftScore > rightScore) setWinner("left");
    else if (leftScore < rightScore) setWinner("right");
    else setWinner("draw");
  };

  return (
    <div className={styles.container}>
      {!(winner === "right") ? (
        <div
          style={{
            width: "40%",
            height: "90%",
            backgroundColor: "red",
            borderRadius: "100px",
          }}
        >
          <img className={styles.sprites} src={drawLeft()} alt="" />
        </div>
      ) : (
        <h1>Проиграл</h1>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {winner === "draw" ? <h2>ничья</h2> : ""}
        <button className={styles.btn} onClick={onFight}>
          В бой!
        </button>
      </div>

      {!(winner === "left") ? (
        <div
          style={{
            width: "40%",
            height: "90%",
            backgroundColor: "blue",
            borderRadius: "100px",
          }}
        >
          <img className={styles.sprites} src={drawRight()} alt="" />
        </div>
      ) : (
        <h1>Проиграл</h1>
      )}

      <div className={`${styles.selectWrapper} ${styles.left}`}>
        <select
          className={styles.selectBox}
          onChange={(e) => setLeftOponent(e.target.value)}
          value={leftOponent}
        >
          {collection.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`${styles.selectWrapper} ${styles.right}`}>
        <select
          className={styles.selectBox}
          onChange={(e) => setRightOponent(e.target.value)}
          value={rightOponent}
        >
          {collection.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ArenaPage;
