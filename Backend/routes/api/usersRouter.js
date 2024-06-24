const express = require("express");
const router = express.Router();
const axios = require('axios');

const SingletonDAO = require("../../controllers/SingletonDAO");


router.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username,password);
    if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    await SingletonDAO.loginUser(username,password,req, res, next);
});

router.post('/register',async (req, res, next)=>{
    const {username, password} = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    try{
      console.log("antes de entrar a singleton");
        const response = await SingletonDAO.registerUser(username,password,res);
        
      
    } catch (e) {
      res.status(500).json({ msg: "Server error" + e });
    }
    next();

});

module.exports = router;