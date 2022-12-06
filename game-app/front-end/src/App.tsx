import React, { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { getGames } from "./features/games/gameSlices";
import GamesPage from "./features/games/GamesPage";
import { useAppDispatch } from "./store/store";

const App = () => {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<GamesPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
