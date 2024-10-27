import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

import { getActor, getMovieActors, getActors, addMovieActors } from "../services/MovieAPIService";
import { set } from "react-datepicker/dist/date_utils";

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

// import DeleteButtonRenderer from './delete-actors';
import DeleteButtonRendererMovieActor from "./delete-movieactors";

import Select from 'react-select';

const MovieActorButtonRenderer = (props: any) => {

    const { data } = props;

    console.log('Data passed to DeleteButtonRenderer:', data);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [actors, setActors] = useState<any[]>([]);

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { headerName: "Actor Id", field: "actor_id" },
        { headerName: "First Name", field: "first_name" },
        { headerName: "Last Name", field: "last_name" },
        {
            headerName: "Delete Actors",
            field: "actions",
            cellRenderer: 'deleteButtonRenderer',
            editable: false,
            colId: 'deleteButton',
        },
    ]);


    const [selectedActors, setSelectedActors] = useState<any[]>([]);

    const handleActorsChange = (selectedOptions: any) => {
        setSelectedActors(selectedOptions);
    };

    const [actorsOptions, setActorsOptions] = useState<any[]>([]);

    useEffect(() => {
        const fetchActors = async () => {
            try{
                const actorsData : any = await getActors();
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

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = async () => {
        const { data } = props;
        console.log('Actors button clicked for:', data);
        setModalIsOpen(true);

        const movie_id = data.movie_id;
        console.log('movie_id:', movie_id);
        const actor_ids = await getMovieActors(movie_id) as { movieActors: { actor_id: number }[] };
        const actor_id_array = actor_ids.movieActors.map((actor) => actor.actor_id);
        console.log('actor_ids:', actor_id_array);

        const fetchedActors = await Promise.all(
            actor_id_array.map(async (actor_id: number) => {
                const response = await getActor(actor_id) as { actor: any };
                return response.actor;
            }));

        setActors(fetchedActors);
        console.log('fetchedActors:', fetchedActors);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('selectedActors:', selectedActors);

        const actor_ids = selectedActors.map((actor: any) => actor.value);

        const { data } = props;
        const movie_id = data.movie_id;

        console.log('actor_ids:', actor_ids);
        console.log('movie_id:', movie_id);

        actor_ids.forEach((actor_id: number) => {
            addMovieActors(movie_id, actor_id);
        })

        console.log('Form submitted');
        alert('Actors added to movie');
        window.location.reload();
    };

    return (
        <>
            <button onClick={openModal}>Actors</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Update Modal"
            >
                <h2>Actors</h2>

                <div className='ag-theme-quartz' style={{ height: 250 }}>
                    <AgGridReact rowData={actors} columnDefs={colDefs}
                        components={{ deleteButtonRenderer: DeleteButtonRendererMovieActor }} />
                </div>

                <br />

                <h2>Add More Actors</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Actors:
                        <Select
                            isMulti
                            value={selectedActors}
                            onChange={handleActorsChange}
                            options={actorsOptions}
                            inputValue=""
                            onInputChange={() => { }}
                            onMenuOpen={() => { }}
                            onMenuClose={() => { }}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Add Actors" />
                </form>


                <button onClick={closeModal}>Close</button>

            </Modal>

        </>
    );
};

export default MovieActorButtonRenderer;