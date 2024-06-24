import axios from "axios"
import MarvelCharacter from "../models/MarvelCharacter";

export default class MarvelService{

    //TODO: cambiar a https cuando este desplegado
    private baseUrl: string = 'http://localhost:3000/api/characters/';

    getAll = async () => {
        return await axios.get(`${this.baseUrl}get-all`);
    }
    login = async () => {
        return await axios.post(`${this.baseUrl}login`);
    }
    register = async () => {
        return await axios.post(`${this.baseUrl}register`);
    }

    create = async (character: MarvelCharacter) => {
        return await axios.post(`${this.baseUrl}create-character`, character);
    }
    
    async getById(id: number) {
        return axios.get<MarvelCharacter>(`${this.baseUrl}get-character/${id}`);
    }

    async update(id: number, updatedCharacter: MarvelCharacter) {
        console.log("character editado:",updatedCharacter);
        return axios.put(`${this.baseUrl}update-character/${id}`, updatedCharacter);
    }

    async delete(id: number) {
        return axios.delete(`${this.baseUrl}delete-character/${id}`);
    }

}