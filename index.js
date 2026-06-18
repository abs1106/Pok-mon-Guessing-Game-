import express from "express";

const app = express();
app.use(express.json());

const games = {};

app.get("/start/",  async (req, res) => {
  const gameId = Math.floor(Math.random() * 10000);// generate gameId
  const pokemonId = Math.floor(Math.random() * 151)+1;// generate pokemonId

  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)// fetch pokemom 
  const pokemonData = await pokemonResponse.json();// store game

  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)// fetch pokemom
  const speciesData = await speciesResponse.json();// store game

    games[gameId] = {
    pokemonName: pokemonData.name,
    pokemonId,
    hints: 5,
    hintsUsed: 0,
    firstLetter: pokemonData.name[0],
    ability: pokemonData.abilities[0].ability.name,
    type: pokemonData.types[0].type.name,
    color:speciesData.color.name,
    habitat: speciesData.habitat.name
  };
  res.send("Your game ID is " + gameId);// send response which is your game ID
});


app.post("/guess", (req, res) => {
    const gameId = req.body.gameId
    const guess = req.body.guess
    const game = games[gameId]

      if (!game) {
        return res.status(404).json({ error: "GameId doesnt exist " });
      }

      if (guess.toLowerCase().trim() === game.pokemonName.toLowerCase()) {
    return res.send("You guessed correctly!");
      }else{
        game.hintsUsed++;
        } if (game.hintsUsed === 1) {
              return res.send(game.color);
            }
            else if (game.hintsUsed === 2) {
              return res.send(game.ability)
            }
            else if (game.hintsUsed === 3) {
              return res.send(game.type)
            }
            else if (game.hintsUsed === 4) {
              return res.send(game.habitat)
            }
            else if (game.hintsUsed === 5) {
              return res.send(game.firstLetter)
            }
            else if (game.hintsUsed === 6) {
            return res.send("Too many guesses the Pokemon was: " + game.pokemonName  )
          }

          console.log(game.pokemonName);
        });







app.listen(4000);
