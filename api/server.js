const express = require('express');
const path = require('path');
const request = require('request');
const app = express(),
    bodyParser = require('body-parser');
port = 3080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.post('/api/getPokemons', (req, res) => {
    const limit = req.body.data.limit;
    const offset = req.body.data.offset;

    if (limit !== null && offset !== null) {
        request('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            }
        });
    } else {
        res.status(404).send('Limit or Offset was not found.');
    }
});

/*app.post('/api/user', (req, res) => {
    const user = req.body.user;
    user.id = randomId(10);
    console.log('Adding user:::::', user);
    users.push(user);
    res.json("user addedd");
});*/


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
