import React from "react";

import { deleteMovie, deleteMovieJoin } from "../services/MovieAPIService";

const DeleteButtonRenderer = (props: any) => {
    const { data } = props;

    const movie_id = parseInt(data.movie_id);

    const handleDelete = () => {
        console.log('Delete button clicked for:', movie_id);
        deleteMovieJoin(movie_id);
        deleteMovie(movie_id);
        alert('Movie deleted');
        window.location.reload();
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteButtonRenderer;