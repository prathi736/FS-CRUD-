import React from "react";
import './Home.css';
import select from '../images/select.png';
import { Link, useNavigate } from "react-router-dom";

function Home() {
    // const [form, setForm] = useState(false);
    // const handleClick = () => {
    //     setForm(true);
    // }
    const navigate = useNavigate();
    return (
        <>
            <div className="card hover:shadow-2xl font-mono">
                <h1 className="text-xl font-bold text-center pt-4 pb-2">Click on any one button</h1>
                <div className="flex justify-center items-center">
                    <img src={select} alt="select" className="h-16 py-2"/>
                </div>
                <div className="flex justify-evenly py-4">
                    <Link to={'/form'}>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white  py-2 px-2 rounded' onClick={() => navigate(`/form`)}>Fill Form</button>
                    </Link>
                    {/* {form && <Form/>} */}
                    <Link to={'/list'}>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded' onClick={() => navigate(`/list`)}>List</button>
                    </Link>
                </div>
            </div>
            
        </>
    )
}

export default Home;