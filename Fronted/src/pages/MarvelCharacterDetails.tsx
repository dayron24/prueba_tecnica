import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarvelService from '../services/MarvelService';
import MarvelCharacter from '../models/MarvelCharacter';

import { useNavigate } from 'react-router-dom';

const MarvelCharacterDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<MarvelCharacter | null>(null);
    const [editing, setEditing] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState<MarvelCharacter | null>(null); // Estado para los cambios editados
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await new MarvelService().getById(parseInt(id));
                setCharacter(response.data[0]);
                setEditedCharacter(response.data[0]);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };
        fetchCharacter();
    }, [id]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            if (!editedCharacter) return;

            const response = await new MarvelService().update(parseInt(id), editedCharacter);
            console.log(response);
            setCharacter(editedCharacter);
            setEditing(false);
        } catch (error) {
            console.error('Error updating character:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await new MarvelService().delete(parseInt(id));
            console.log(response);
        } catch (error) {
            console.error('Error deleting character:', error);
        }
        navigate('/');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editedCharacter) {
            const keys = name.split('.');
            const updatedCharacter = { ...editedCharacter };
            if (keys.length === 1) {
                updatedCharacter[keys[0]] = value;
            } else if (keys.length === 2) {
                updatedCharacter[keys[0]] = {
                    ...updatedCharacter[keys[0]],
                    [keys[1]]: value,
                };
            }
            setEditedCharacter(updatedCharacter);
        }
    };

    const handleCancel = () => {
        setEditedCharacter(character);
        setEditing(false);
    };

    const showModal = () => {
        setShowDeleteModal(true);
    };

    const hideModal = () => {
        setShowDeleteModal(false);
    };

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <div className="card">
                <img className="card-img-top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                <div className="card-body">
                    {editing ? (
                        <>
                            <input type="text" className="form-control mb-2" name="name" value={editedCharacter?.name || ''} onChange={handleChange} />
                            <textarea className="form-control mb-2" name="description" value={editedCharacter?.description || ''} onChange={handleChange} />
                            <p className="card-text"><strong>Comics:</strong> <input type="number" className="form-control mb-2" name="comics.available" value={editedCharacter?.comics?.available || ''} onChange={handleChange} /></p>
                            <p className="card-text"><strong>Series:</strong> <input type="number" className="form-control mb-2" name="series.available" value={editedCharacter?.series?.available || ''} onChange={handleChange} /></p>
                            <p className="card-text"><strong>Stories:</strong> <input type="number" className="form-control mb-2" name="stories.available" value={editedCharacter?.stories?.available || ''} onChange={handleChange} /></p>
                            <p className="card-text"><strong>Events:</strong> <input type="number" className="form-control mb-2" name="events.available" value={editedCharacter?.events?.available || ''} onChange={handleChange} /></p>
                        </>
                    ) : (
                        <>
                            <h1 className="card-title">{character.name}</h1>
                            <p className="card-text">{character.description}</p>
                            <p className="card-text"><strong>Comics:</strong> {character.comics.available}</p>
                            <p className="card-text"><strong>Series:</strong> {character.series.available}</p>
                            <p className="card-text"><strong>Stories:</strong> {character.stories.available}</p>
                            <p className="card-text"><strong>Events:</strong> {character.events.available}</p>
                        </>
                    )}
                    <div className="mt-3">
                        {editing ? (
                            <>
                                <button className="btn btn-success me-2" onClick={handleSave}>Save changes</button>
                                <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-primary me-2" onClick={handleEdit}>Edit</button>
                                <button className="btn btn-danger" onClick={showModal}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de confirmación */}
            {showDeleteModal && (
                <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={hideModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this character?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={hideModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarvelCharacterDetails;
