const express = require("express");
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const SingletonDAO = require("../../controllers/SingletonDAO");

const marvelPublicKey = 'bca18724ab1464413b76752ae39e1b5a';
const marvelPrivateKey = 'a2c6c2cd3ff7d93f77442953cc7271e97a0d1585'; 
const limit = '100'; //Cantidad de personajes que trae de la api
const offset = '500';
const generateMarvelApiUrl = () => {
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + marvelPrivateKey + marvelPublicKey).digest('hex');
    return `https://gateway.marvel.com:443/v1/public/characters?&limit=${limit}&offset=${offset}&ts=${ts}&apikey=${marvelPublicKey}&hash=${hash}`;

};

router.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

router.get('/load-characters-from-api', async (req, res) => {
    try {
        const url = generateMarvelApiUrl();
        const response = await axios.get(url);
        const characters = response.data.data.results;
        console.log(characters);
        const responseDAO = await SingletonDAO.loadCharactersData(characters);

        res.send(responseDAO);
    } catch (error) {
        console.error('Error fetching Marvel characters:', error.message);
        res.status(500).json({ error: 'Error fetching Marvel characters' });
    }
});

router.get('/get-all', async (req, res) => {
    try {

        const response = await SingletonDAO.getAllCharacters();
        res.json(response);
    } catch (error) {
        console.error('Error fetching Marvel characters:', error.message);
        res.status(500).json({ error: 'Error fetching Marvel characters' });
    }
});

router.get('/get-character/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await SingletonDAO.getCharacterById(id);
        res.json(response);
    } catch (error) {
        console.error('Error fetching Marvel character:', error.message);
        res.status(500).json({ error: 'Error fetching Marvel character' });
    }
});

router.post('/create-character', async (req, res) => {
    try {
        const newCharacter = req.body; 
        //console.log(req.body);
        const response = await SingletonDAO.createCharacter(newCharacter);
        console.log(response)
        res.json(response);
    } catch (error) {
        console.error('Error creating Marvel character:', error.message);
        res.status(500).json({ error: 'Error creating Marvel character' });
    }
});

router.put('/update-character/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCharacter = req.body; 
        //console.log(req.body);
        const response = await SingletonDAO.updateCharacter(id, updatedCharacter);
        res.json(response);
    } catch (error) {
        console.error('Error updating Marvel character:', error.message);
        res.status(500).json({ error: 'Error updating Marvel character' });
    }
});

router.delete('/delete-character/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await SingletonDAO.deleteCharacter(id);
        res.json(response);
    } catch (error) {
        console.error('Error deleting Marvel character:', error.message);
        res.status(500).json({ error: 'Error deleting Marvel character' });
    }
});

module.exports = router;