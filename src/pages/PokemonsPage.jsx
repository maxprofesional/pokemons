import React, { use, useEffect, useState } from "react";
import { usePokemons } from "../store/pokemons";
import Card from "../components/Card";
import Cart from "../components/Cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
const PokemonsPage = () => {
  const [showCart, setShowCart] = useState(false);

  const togleCart = () => {
    setShowCart((prev) => !prev);
  };

  const {
    pokemons,
    getPokemons,
    loading,
    total,
    offset,
    setPokemonsForCollection,
    collection,
  } = usePokemons();

  useEffect(() => {
    getPokemons();
  }, []);

  function isBottomReached() {
    return (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 80
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isBottomReached() && !loading) {
        getPokemons();
        console.log("render");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getPokemons, loading]);

  return (
    <div className="pokemonsPage">
      {pokemons.map((pokemon) => {
        return (
          <Card
            choosePokemon={setPokemonsForCollection}
            key={pokemon.url}
            name={pokemon.name}
            url={pokemon.url}
          />
        );
      })}
      {showCart ? <Cart /> : null}
      <div
        style={{
          position: "fixed",
          bottom: "25px",
          left: "25px",
        }}
      >
        <ShoppingCartOutlined
          style={{
            fontSize: "3rem",
          }}
          onClick={togleCart}
        />
        <span style={{ fontSize: "1.5rem" }}>{collection.length}</span>
      </div>
    </div>
  );
};

export default PokemonsPage;
