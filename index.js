import express from "express";

const app = express();


const games = {};

app.get("/start/",  async (req, res) => {
   const gameId = Math.floor(Math.random() * 10000);// generate gameId
   const pokemonId = Math.floor(Math.random() * 151)+1;// generate pokemonId
  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)// fetch pokemom
  const pokemonData = await pokemonResponse.json();// store game
    games[gameId] = {
    pokemonName: pokemonData.name,
    pokemonId,
    hints: 5,
    hintsUsed: 0
  };
  res.send("You game ID is " + gameId);// send response which is your game ID
});

app.listen(4000);

app.post("/guess"), (req, res) => {
    const gameId = req.body.gameId
    const guess = req.body.guess
    const game = games[gameId]
    
     return res.status(404).json({ error: "GameId doesnt exist " });

    if (guess === game.pokemonName)
        res.send("You guessed correctly!");
    {
        
    }
        




  }