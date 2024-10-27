import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { putActors } from "../services/MovieAPIService";

import "../assets/form.css";

const CreateActors = () => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [birth_date, setBirthDate] = useState(new Date());

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

    const handleSubmit = (event) => {
        const adjustedDate = new Date(birth_date.getTime() - birth_date.getTimezoneOffset() * 60000); //Adjusting the timezone issue for the picked date
        // console.log(typeof first_name, typeof last_name, typeof nationality, adjustedDate.toISOString());
        putActors( first_name, last_name, nationality, adjustedDate.toISOString());

        alert(`An actor was submitted:\nFirst Name: ${first_name}\nLast Name: ${last_name}\nNational: ${nationality}`);
        setFirstName('');
        setLastName('');
        setNationality('');
        setBirthDate(new Date());
        // event.preventDefault();
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name (required):</label>
                    <input type="text" value={first_name} onChange={handleFirstNameChange} required/>
                </div>
                <div className="form-group">
                    <label>Last Name (required):</label>
                    <input type="text" value={last_name} onChange={handleLastNameChange} required/>
                </div>
                <div className="form-group">
                    <label>Nationality:</label>
                    <input type="text" value={nationality} onChange={handleNationalityChange} />
                </div>
                <div className="form-group">
                    <label>Birth Date:</label>
                    <DatePicker 
                        selected={birth_date}
                        onChange={(date: Date) => setBirthDate(date)}
                        className="react-datepicker" 
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );

}

export default CreateActors;