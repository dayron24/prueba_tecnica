const SingletonConnexion = require("./SingeltonConnexion.js");
const Character = require("../models/character.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const user = require("../models/user.js");
const { createAccessToken } = require("../libs/jwt.js");

class SingletonDAO {
  static instance;
  static count = 0;

  constructor() {
    console.log("Singleton constructor called");
    this.conn = SingletonConnexion.getInstance();
  }

  static getInstance() {
    if (this.instance) {
      console.log("Returning instance");
      return this.instance;
    }
    console.log("creating instance");
    this.instance = new SingletonDAO();

    this.count = this.count + 1;
    return this.instance;
  }

  async loadCharactersData(characters) {
    try {
        for (const charData of characters) {
            if (charData.description != '' && !charData.thumbnail.path.endsWith('image_not_available')){//Esto es para guardar o filtrar solo los pj con descripcion
                const character = new Character({
                    id: charData.id,
                    name: charData.name,
                    description: charData.description,
                    modified: new Date(charData.modified),
                    thumbnail: {
                        path: charData.thumbnail.path,
                        extension: charData.thumbnail.extension,
                    },
                    resourceURI: charData.resourceURI,
                    comics: {
                        available: charData.comics.available,
                    },
                    series: {
                        available: charData.series.available,
                    },
                    stories: {
                        available: charData.stories.available,
                    },
                    events: {
                        available: charData.events.available,
                    },
                });
                await character.save();

            }
 
        }
        return ('Datos cargados correctamente de la api');
      } catch (error) {
        return(
          `Error loading characters: ${error.message}`
        );
      }

    };
    
    async getAllCharacters () {
        try {
            const characters = await Character.find();
            return(characters);
        } catch (error) {
            console.error('Error fetching characters from database:', error.message);
            return({});
        }
    }

    async getCharacterById(characterId) {
      try {
        const character = await Character.find({
          id: characterId,
        });
        if (!character) {
          return(`character not found with id: ${id}`);
        }
        return character;
      } catch (error) {
        return(`Error finding the character: ${error.message}`);
      }
    }

    async createCharacter (newCharacter){
      try {

        console.log(newCharacter);
        const response = await Character.create(newCharacter);
        return ("Character created succesful");
      }
      catch (error) {
        return `Error creating the character: ${error.message}`; 
    }
    }

    async updateCharacter(characterId, updatedCharacter) {
      try {
          const query = { id: characterId };
          const options = { new: true }; 
          const character = await Character.findOneAndUpdate(query, updatedCharacter, options);
          if (!character) {
              return `Character not found with id: ${characterId}`; 
          }
          return character; 
      } catch (error) {
          return `Error updating the character: ${error.message}`; 
      }
  }
  async deleteCharacter(characterId) {
    try {
      const res = await Character.deleteOne({id: characterId});
      console.log('character deleted succesfully');
      return 'character deleted succesfully'; 
    } catch (error) {
        return `Error updating the character: ${error.message}`; 
    }
  }
  async loginUser (username,password,req, res, next) {
    try {
      
      const userFound = await User.findOne({ username: username }).exec();
      if (!userFound) {
        res
          .status(400)
          .json({ status: false, message: "User has no register" });
        return false;
      }
      if (userFound) {
        const match = await bcrypt.compare(password, userFound.password);
        
        if (match) {
          const token = await createAccessToken({ id: userFound._id });
          console.log("Token generado:", token);
          res.cookie("token", token);

          res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            message: "User logged perfectly ",
          });

          return true;
        } else {
          res.status(400).json({ status: false, message: "User not logged" });
          return false;
        }
      }
    } catch {
      res.status(500).json({ status: false, message: "Server error" });
      return false;
    }
  };

  async registerUser(username,password,res){
    const duplicate = await User.findOne({ username: username }).exec();
  
    if (duplicate) {
      console.log("duplicado");
      return res.status(400).json({ msg: "User already exists" });
    }
  
    try {
      console.log("sigletonDAO:",username,password);
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username: username,
        password: hashedPassword,

      });
      res.status(200).json({ msg: "User created", userId: newUser._id });
    }
  catch (error) {
    return `Error creating user: ${error.message}`; 
    res.status(500).json({ msg: "Server error" + e });
  }
  }

}

const singletonDAO = SingletonDAO.getInstance();

module.exports = singletonDAO;