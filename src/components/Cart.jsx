import React, { useEffect, useState } from "react";
import { usePokemons } from "../store/pokemons";
import style from "./Cart.module.css";
const Cart = () => {
  const { collection, DeletePokemonsForCollection } = usePokemons();

  return (
    <div className={style.cart}>
      <ul className={style.list}>
        {collection?.map((pokemon) => {
          return (
            <li
              key={pokemon.id}
              onClick={() => DeletePokemonsForCollection(pokemon.id)}
            >
              {pokemon?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
