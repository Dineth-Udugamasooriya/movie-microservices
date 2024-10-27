import React from "react";

import { deleteActor, deleteActorJoin,  } from "../services/MovieAPIService";


const DeleteButtonRendererMovieActor = (props: any) => {
    const { data } = props;

    const actor_id = parseInt(data.actor_id);

    const handleDelete = () => {
        console.log('Delete button clicked for:', actor_id);
        deleteActorJoin(actor_id);
        alert('Actor deleted');
        window.location.reload();
        // deleteActor(actor_id);
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteButtonRendererMovieActor;