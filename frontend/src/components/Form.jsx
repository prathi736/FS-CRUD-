import React, { useState } from "react";
import './Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {

    const navigate = useNavigate();

    const initialFormData = {
        id: 0,
        name: '',
        rollNo: '',
        year: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const [error, setError] = useState(initialFormData);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        for (const field in formData) {
            if (typeof formData[field] === 'string' && formData[field].trim() === '' && field !== 'id') {
                validationErrors[field] = "required";
            }
        };


        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }


        axios.post ('http://127.0.0.1:8000/form/', formData) 
            .then(response => {
                console.log(response.data);
                navigate(`/list`);
            })
            .catch(error => {
                console.error("error", error);
            })

        // setLocalStorageData(formData);

        setFormData(initialFormData);
        setError(initialFormData);

        console.log(formData);

        // navigate(`/list`);
    }

    // const setLocalStorageData = (data) => {

    //     // Done by Sir
    //     let ar = JSON.parse(localStorage.getItem("formData"));
    //     if (ar === undefined || ar === null) {
    //         ar = [];
    //     }
    //     ar.push(data)
    //     localStorage.setItem('formData', JSON.stringify(ar));
    // }

    return (
        <>
            <div className="cardForm font-mono">
                <h1 className="text-3xl font-bold text-center pt-7 pb-4">Student Detail Form</h1>
                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    {Object.keys(formData).map((field) => {
                        if (field === 'id') {
                            return null;
                        }
                        return (
                            <div key={field} className="mb-4">
                                <div className="flex justify-between">
                                    <label htmlFor={field} className="text-2xl font-semibold">{field}</label>
                                    {error[field] && (
                                        <p className="text-red-500 font-semibold bg-red-100 rounded-md">
                                            {error[field]}
                                        </p>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    name={field}
                                    className={`shadow border-blue-600 border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 
                                        ${error[field] ? 'border-red-500' : ''}`} placeholder={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    })}
                    <div className="py-4">
                        <button className='bg-blue-600 hover-bg-blue-700 text-white  py-2 px-4 rounded' type="submit">
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;
                            Submit Form
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;