const _          = require('lodash');
const express    = require('express');
const request    = require('request');
const got        = require('got');
const app        = express(),
      bodyParser = require('body-parser');
port             = 3080;

app.use(bodyParser.json());

app.post('/api/getPokemons', (req, res) => {
  const limit  = req.body.data.limit;
  const offset = req.body.data.offset;

  if (limit !== null && offset !== null) {
    request(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, (error, response, body) => {
      if (error === null && response.statusCode === 200) {
        // Parse body
        try {
          body = JSON.parse(body);
        } catch (e) {
          res.status(400)
            .send({
              success: false,
              message: 'Parsing error.'
            });
        }

        _.map(body.results, (pokemon) => {
          const splitUrl  = pokemon.url.split('/');
          const pokemonId = splitUrl[splitUrl.length - 2];

          // Verify pokemon id, and send only the pokemons back to client who also have id
          if (parseInt(pokemonId) && !isNaN(parseInt(pokemonId))) {
            pokemon['id'] = parseInt(pokemonId);

            return pokemon;
          }
        });

        res.status(200)
          .send({
            success: true,
            data:    body
          });
      }
    });
  } else {
    res.status(400)
      .send({
        success: false,
        message: 'Limit or offset was not found.'
      });
  }
});

app.post('/api/getPokemonDetails', async (req, res) => {
  const pokemonIds   = req.body.data.pokemonIds;
  let pokemonDetails = [];

  if (pokemonIds.length !== 0) {
    for (const pokemonId of pokemonIds) {
      try {
        const response = await got(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (response.statusCode === 200) {
          // Parse body
          try {
            response.body = JSON.parse(response.body);
          } catch (e) {
            console.error(e);
          }

          pokemonDetails[pokemonId] = response.body;
        }
      } catch (error) {
        console.log(error);
      }
    }

    res.status(200)
      .send({
        success: true,
        data:    _.omitBy(pokemonDetails, _.isNil)
      });
  } else {
    res.status(400)
      .send({
        success: false,
        message: 'No pokemonIds found.'
      });
  }
});


app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
