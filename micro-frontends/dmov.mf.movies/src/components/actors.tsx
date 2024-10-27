import React, { useEffect, useState} from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

import { getActors } from '../services/MovieAPIService';

import UpdateButtonRenderer from './update-actors';
import DeleteButtonRenderer from './delete-actors';

const Actors = () => {

    const [rowData, setRowData] = useState<any[]>([]);

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { headerName: "Actor Id", field: "actor_id"},
        {headerName: "First Name", field: "first_name"},
        {headerName: "Last Name", field: "last_name"},
        {headerName: "Nationality", field:"nationality"},
        {headerName: "Birth Date", field: "birth_date"},
        {
            headerName: "Update Actors",
            field: "actions",
            cellRenderer: 'updateButtonRenderer',
            editable: false,
            colId: 'updateButton',
        },
        {
            headerName: "Delete Actors",
            field: "actions",
            cellRenderer: 'deleteButtonRenderer',
            editable: false,
            colId: 'deleteButton',
        },
    ]);

    useEffect(() => {
        const fetchActors = async () => {
            try{
                const actorsData : any = await getActors();
                // console.log(actorsData);
                // setRowData(actorsData.actors); 

                // Extracting the date part only
                const formattedData = actorsData.actors.map((actor: any) => ({
                    ...actor,
                    birth_date: actor.birth_date.split('T')[0] 
                }));
                console.log(formattedData);
                setRowData(formattedData);
            } 
            catch (error) {
                console.error('Error fetching actors:', error);
            }
        };

        fetchActors();

    }, []);

    return(
        <div className='ag-theme-quartz' style={{ height: 1000 }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} 
            components={{ updateButtonRenderer: UpdateButtonRenderer,
                          deleteButtonRenderer: DeleteButtonRenderer  
             }}/>
        </div>
    );
}

export default Actors;