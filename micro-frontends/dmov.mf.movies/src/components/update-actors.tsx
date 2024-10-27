// UpdateButtonRenderer.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { updateActor } from '../services/MovieAPIService';

const UpdateButtonRenderer = (props: any) => {

    const { data } = props;
    const [formData, setFormData] = useState(data);

    const [first_name, setFirstName] = useState(formData.first_name);
    const [last_name, setLastName] = useState(formData.last_name);
    const [nationality, setNationality] = useState(formData.nationality);
    const [birth_date, setBirthDate] = useState(new Date(formData.birth_date));

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    };

    // const handleBirthDateChange = (date) => {
    //     setBirthDate(date);
    // };

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
        console.log('Actor id:', typeof data.actor_id);
        const actor_id_int = parseInt(data.actor_id);
        updateActor(actor_id_int ,first_name, last_name, nationality, birth_date.toISOString() );
        alert('Actor updated');
        window.location.reload();
    };


    return (
        <>
            {/* <button onClick={onClick}>Update</button> */}
            <button onClick={openModal}>Update</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Update Modal"
            >
                <h2>Edit Actor Details</h2>

                <label>
                    First Name:
                    <input type="text" value={first_name} onChange={handleFirstNameChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" value={last_name} onChange={handleLastNameChange} />
                </label>
                <br />
                <label>
                    Nationality:
                    <input type="text" value={nationality} onChange={handleNationalityChange} />
                </label>
                <br />
                <label>
                    Birth Date:
                    <DatePicker
                        selected={birth_date}
                        onChange={(date: Date) => setBirthDate(date)}
                    />
                </label>
                <br />

                <button onClick={handleSave}>Save</button>
                <br />
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>

    );
};

export default UpdateButtonRenderer;