import React from 'react';
import './View.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft  } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

function View() {

    const { state } = useLocation();
    const student = state.student;
    const navigate = useNavigate();

    if (!student) {
        // Handle the case where 'student' is undefined
        return <div>No student data available.</div>;
    }

    const navigateList = () => {
        navigate('/list');
    }

    return (
        <>
            <div className="cardF font-mono">
                <h1 className="text-3xl font-bold text-center pt-7 pb-4"> Details of Student</h1>

                <div className="flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <p className="text-2xl font-semibold">
                                Name: <span className='text-xl font-medium font-sans'>{student.name}</span>
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-2xl font-semibold">
                                Roll No: <span className='text-xl font-medium font-sans'>{student.rollNo}</span>
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-2xl font-semibold">
                                Year: <span className='text-xl font-medium font-sans'>{student.year}</span>
                            </p>
                        </div>
                    </div>
                    <div className="py-4">
                        <button 
                        className='bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded' 
                        type="submit"
                        onClick={navigateList}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            &nbsp;
                            Back to Previous Page
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View;