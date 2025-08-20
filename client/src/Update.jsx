import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";


const Update = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
            .then((res) => {
                console.log(res)
               setValues({...values, name: res.data[0].Name, email: res.data[0].Email})
            })
            .catch((err) => console.log(err));
    }, []);

    const [values, setValues] = useState({
        name: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/api/students/update/${id}`, values)
        .then(res => {
            toast.success("Student Updated Successfully!")
            console.log(res)
            navigate('/home')
        })
        .catch(err => {
            toast.error("Student not Updated!")
             console.log(err)})
    }

    return (
        <div className="d-flex vh-100 bg-secondary-subtle justify-content-center align-items-center">
            <div className='w-50 bg-white shadow-lg rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
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
                    <Link to='/home' className="btn btn-primary me-2" >Back</Link>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Update
