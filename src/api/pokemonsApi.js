import { createJSONStorage } from "zustand/middleware";
import { api } from "./api";

export const pokemonApi = async (offset = 0, limit = 20) => {
  const res = await api.get(`/pokemon/?offset=${offset}&limit=${limit}`);
  return res;
};

export const pokemonApiById = async (url) => {
  const id = url.split("/").filter(Boolean).pop();
  const res = await api.get(`/pokemon/${id}`);
  return res.data;
};
