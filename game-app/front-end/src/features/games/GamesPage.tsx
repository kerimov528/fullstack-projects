import { Container, Grid } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/store";

const GamesPage = () => {
  const { games } = useAppSelector((state) => state.games);
  return (
    <Container>
      <h2>Game Page</h2>
      <Grid container sx={{}}>
        {games &&
          games.map((game) => (
            <Grid xs={3} key={game._id}>
              <h4>{game.address}</h4>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default GamesPage;
