import { useEffect, useState } from "react"
import MarvelService from "../services/MarvelService";
import { useNavigate } from "react-router-dom";
import "../styles/MarvelCharactersList.css"
const MarvelCharactersList = () => {
    const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
    const navigate = useNavigate();
    
    const fetchData = async () => {
        const response = await new MarvelService().getAll();
        console.log(response.data);
        setCharacters(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCardClick = (id: number) => {
        navigate(`/character/${id}`);
    };

    return (
        <div className='container'>
            <div className='row'>
                {characters.map((character: MarvelCharacter) => (
                    <div key={character.id} className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch" onClick={() => handleCardClick(character.id)}>
                        <div className='card m-2 character-card'>
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                className="card-img-top character-thumbnail"
                                alt={character.name}
                            />
                            <div className='card-body d-flex flex-column'>
                                <h5 className='card-title'>{character.name}</h5>
                                <p className='card-text'>{character.description}</p>
                                <p className='card-text'><strong>Comics:</strong> {character.comics.available}</p>
                                <p className='card-text'><strong>Series:</strong> {character.series.available}</p>
                                <p className='card-text'><strong>Stories:</strong> {character.stories.available}</p>
                                <p className='card-text'><strong>Events:</strong> {character.events.available}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MarvelCharactersList;