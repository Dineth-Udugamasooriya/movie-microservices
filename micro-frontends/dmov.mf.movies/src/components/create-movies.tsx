import React, { useState, useEffect } from 'react';



import { putMovies, getActors, addMovieActors } from '../services/MovieAPIService';

import Select from 'react-select';
import { set } from 'react-datepicker/dist/date_utils';

import "../assets/form.css";

const CreateMovies = () => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSubmit = async (event) => {

        // event.preventDefault(); //to prevent auto reloading after form submission (rember to add this at the top of the function)

        const release_year = parseInt(year);
        const movie_id = await putMovies(title, release_year, genre);

        const movie_id_int = parseInt(movie_id);
        console.log('selectedActors:', selectedActors);

        // call the loop from here to add the actors to the movie
        const actor_ids = selectedActors.map((actor: any) => actor.value);
        console.log('actor_ids:', actor_ids);
        console.log('movie_id:', movie_id);

        actor_ids.forEach((actor_id: number) => {
            addMovieActors(movie_id_int, actor_id);
        })

        alert(`A movie was submitted:\nTitle: ${title}\nYear: ${year}\ngenre: ${genre}`);
        setTitle('');
        setYear('');
        setGenre('');
        setSelectedActors([]);

    };

    const [selectedActors, setSelectedActors] = useState<any[]>([]);

    const handleActorsChange = (selectedOptions: any) => {
        setSelectedActors(selectedOptions);
    };

    const [actorsOptions, setActorsOptions] = useState<any[]>([]);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const actorsData: any = await getActors();
                const options = actorsData.actors.map((actor: any) => ({
                    value: actor.actor_id,
                    label: `${actor.first_name} ${actor.last_name}`
                }));
                setActorsOptions(options);
            }
            catch (error) {
                console.error('Error fetching actors:', error);
            }
        };

        fetchActors();

    }, []);


    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Movie Title (required):</label>
                    <input type="text" value={title} onChange={handleTitleChange} required/>
                </div>
                <div className="form-group">
                    <label>Year:</label>
                    <input type="number" value={year} onChange={handleYearChange} />
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={handleGenreChange} />
                </div>
                <div className="form-group">
                    <label>Actors:</label>
                    <Select
                        isMulti
                        value={selectedActors}
                        onChange={handleActorsChange}
                        options={actorsOptions}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>

    );
};

export default CreateMovies;