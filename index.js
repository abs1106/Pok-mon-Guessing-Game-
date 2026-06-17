import express from "express";

const app = express();


const games = {};

app.get("/start/",  async (req, res) => {
   const gameId = Math.floor(Math.random() * 10000);// generate gameId
   const pokemonId = Math.floor(Math.random() * 151)+1;// generate pokemonId
  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)// fetch pokemom
  const pokemonData = await pokemonResponse.json();// store game
    games[gameId] = {
    pokemonId,
    hints: 5,
    hintsUsed: 0
  };
  res.send(gameId);// send response
});

app.listen(4000);
