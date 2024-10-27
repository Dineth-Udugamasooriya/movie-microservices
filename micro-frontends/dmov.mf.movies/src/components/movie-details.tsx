

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState } from 'react';

import { ColDef } from 'ag-grid-community';

import React, { useEffect } from 'react';
import { getMovies, getMovieActors, getActor } from '../services/MovieAPIService';

import MovieActorButtonRenderer from './movieActors';
import UpdateButtonRenderer from './update-movies';
import DeleteButtonRenderer from './delete-movies';
import { set } from 'react-datepicker/dist/date_utils';

const MovieDetails = () => {

    const [rowData, setRowData] = useState<any[]>([]);

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { headerName: "Movie Id", field: "movie_id" },
        { headerName: "Title", field: "title" },
        { headerName: "Release Year", field: "release_year" },
        { headerName: "Genre", field: "genre" },
        {
            headerName: "Actor Details",
            field: "actions",
            cellRenderer: 'movieActorButtonRenderer',
            editable: false,
            colId: 'actorButton',
        },
        {
            headerName: "Update Movies",
            field: "actions",
            cellRenderer: 'updateButtonRenderer',
            editable: false,
            colId: 'updateButton',
        },
        {
            headerName: "Delete Movies",
            field: "actions",
            cellRenderer: 'deleteButtonRenderer',
            editable: false,
            colId: 'deleteButton',
        },
    ]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData : any = await getMovies();
                console.log(moviesData);
                setRowData(moviesData.movies); 
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    },[]);

    return (
        <>
        <div className='ag-theme-quartz' style={{ height: 1000 }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} 
            components={{movieActorButtonRenderer: MovieActorButtonRenderer, updateButtonRenderer: UpdateButtonRenderer, deleteButtonRenderer: DeleteButtonRenderer}}/>
        </div>
        </>
        
    );
}

export default MovieDetails;