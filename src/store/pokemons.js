import { create } from "zustand";
import { pokemonApi } from "../api/pokemonsApi";

export const usePokemons = create((set, get) => ({
  pokemons: [],
  loading: false,
  error: null,
  total: 0,
  limit: 20,
  offset: 0,
  collection: [],
  setPokemonsForCollection: (pokemon) => {
    if (!get().collection.some((pok) => pok.id === pokemon.id)) {
      set({ collection: [...get().collection, pokemon] });
    }

    console.log(get().collection);
  },
  DeletePokemonsForCollection: (id) => {
    set({ collection: get().collection.filter((pok) => pok.id !== id) });
  },
  getPokemons: async () => {
    const { offset, limit, pokemons } = get();
    set({ loading: true });
    try {
      const res = await pokemonApi(offset, limit);
      set({
        pokemons: [...pokemons, ...res.data.results],
        offset: offset + limit,
        total: res.data.count,
        loading: false,
      });
    } catch (e) {
      set({ error: e, loading: false });
      console.log(e);
    }
  },
}));
