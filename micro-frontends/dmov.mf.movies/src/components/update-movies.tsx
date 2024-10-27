import React, {useState, useEffect} from "react";
import Modal from "react-modal";

import Select from 'react-select';

import { updateMovies, getActors, addMovieActors } from "../services/MovieAPIService";

const UpdateButtonRenderer = (props: any) => {

    const { data } = props;
    const [formData, setFormData] = useState(data);

    const [title, setTitle] = useState(formData.title);
    const [release_year, setReleaseYear] = useState(formData.release_year);
    const [genre, setGenre] = useState(formData.genre);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleReleaseYearChange = (event) => {
        setReleaseYear(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        const { data } = props;
        console.log('Update button clicked for:', data);
        
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSave = () => {
        console.log('Save button clicked');
        console.log('Movie id:', typeof data.movie_id);
        const movie_id_int = parseInt(data.movie_id);
        const release_year_int = parseInt(release_year);
        updateMovies(movie_id_int, title, release_year_int, genre);
        alert('Movie updated');
        window.location.reload();
    };

    return(
        <>
        <button onClick={openModal}>Update</button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Modal"
        >
            <h2>Update Movies</h2>
            <label>
                Movie Title:
                <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <br />
            <label>
                Year:
                <input type="number" value={release_year} onChange={handleReleaseYearChange} />
            </label>
            <br />
            <label>
                Genre:
                <input type="text" value={genre} onChange={handleGenreChange} />
            </label>
            <br />
            <br />

            <button onClick={handleSave}>Save</button>
                <br />
            <button onClick={closeModal}>Close</button>

        </Modal>
        </>
    );
};

export default UpdateButtonRenderer;