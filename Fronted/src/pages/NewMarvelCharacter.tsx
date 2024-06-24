import { useForm } from "react-hook-form";
import marvelCharactersService from "../services/MarvelService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NewMarvelCharacter = () => {

    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
    const navigate = useNavigate();
    const [initialThumbnailPath, setInitialThumbnailPath] = useState('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available');

    useEffect(() => {
        setValue('thumbnailPath', initialThumbnailPath); // Establecer el valor inicial del thumbnailPath
    }, [initialThumbnailPath, setValue]);

    const onSubmit = async (data) => {
        const newCharacter = {
            id: Number(data.id),
            name: data.name,
            description: data.description,
            thumbnail: {
                path: data.thumbnailPath,
                extension: data.thumbnailExtension
            },
            comics: {
                available: Number(data.comicsAvailable)
            },
            series: {
                available: Number(data.seriesAvailable)
            },
            stories: {
                available: Number(data.storiesAvailable)
            },
            events: {
                available: Number(data.eventsAvailable)
            }
        };

        await (new marvelCharactersService()).create(newCharacter);
        alert('Marvel character created correctly');
        reset(); // Limpiamos el formulario después de enviar los datos
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="inputId" className="form-label">ID</label>
                    <input type="number" className="form-control" id="inputId" {...register('id', { valueAsNumber: true, min: 0 })} />
                    {errors.id && <span className="text-danger">ID must be a number greater than or equal to 0.</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" {...register('name')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputThumbnailPath" className="form-label">Thumbnail Path</label>
                    <input type="text" className="form-control" id="inputThumbnailPath" {...register('thumbnailPath')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputThumbnailExtension" className="form-label">Thumbnail Extension</label>
                    <select className="form-control" id="inputThumbnailExtension" {...register('thumbnailExtension')}>
                        <option value="jpg">.jpg</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputDescription" {...register('description')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputComicsAvailable" className="form-label">Comics Available</label>
                    <input type="number" className="form-control" id="inputComicsAvailable" {...register('comicsAvailable', { valueAsNumber: true, min: 0 })} />
                    {errors.comicsAvailable && <span className="text-danger">Comics available must be a number greater than or equal to 0.</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputSeriesAvailable" className="form-label">Series Available</label>
                    <input type="number" className="form-control" id="inputSeriesAvailable" {...register('seriesAvailable', { valueAsNumber: true, min: 0 })} />
                    {errors.seriesAvailable && <span className="text-danger">Series available must be a number greater than or equal to 0.</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputStoriesAvailable" className="form-label">Stories Available</label>
                    <input type="number" className="form-control" id="inputStoriesAvailable" {...register('storiesAvailable', { valueAsNumber: true, min: 0 })} />
                    {errors.storiesAvailable && <span className="text-danger">Stories available must be a number greater than or equal to 0.</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEventsAvailable" className="form-label">Events Available</label>
                    <input type="number" className="form-control" id="inputEventsAvailable" {...register('eventsAvailable', { valueAsNumber: true, min: 0 })} />
                    {errors.eventsAvailable && <span className="text-danger">Events available must be a number greater than or equal to 0.</span>}
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default NewMarvelCharacter;
