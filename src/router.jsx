import { createBrowserRouter } from "react-router-dom";
import ArenaPage from "./pages/ArenaPage";
import MainPage from "./pages/mainPage";
import AppLayout from "./components/AppLayout";
import PokemonsPage from "./pages/PokemonsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/arena", element: <ArenaPage /> },
      { path: "/pokemons", element: <PokemonsPage /> },
    ],
  },
]);
