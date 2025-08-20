import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Create = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.name || !values.email) {
            toast.error("Please fill all fields!");
            return;
          }
        axios.post('http://localhost:8081/api/students', values)
            .then(res => {
                toast.success("Student Created Successfully!")
                console.log(res);
                navigate('/home');
            })
            .catch(err => {
                toast.error("Student not Created!")
                console.log(err)})
    }

    return (
        <div className="d-flex vh-100 bg-secondary-subtle justify-content-center align-items-center">
            <div className='w-50 bg-white shadow-lg rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            value={values.name}
                            placeholder='Enter Name'
                            className='form-control'
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            value={values.email}
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <Link to={'/home'} className="btn btn-primary me-2" >Back</Link>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create
