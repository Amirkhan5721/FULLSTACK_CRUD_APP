import React, { useEffect, useState } from 'react'
import { FaRegistered } from "react-icons/fa";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.post("http://localhost:8081/api/students/register")
    //         .then(result => {
    //             toast.success("Student are Register Successfully.")
    //             console.log(result)
    //         })
    //         .catch(err => {
    //             toast.error("Student not Register!")
    //             console.log(err)
    //         })
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/api/students/register', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(res.data.message || "User Register Successfully!")
            if (res.data.success) {
                console.log(res.data.success);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registeration Failed!")
        }
    }

    return (
        <div className='d-flex vh-100 bg-secondary-subtle justify-content-center align-items-center'>
            <div className='w-50 bg-white shadow-lg rounded p-3'  >
                <form
                    className='d-flex flex-column gap-2'
                    onSubmit={handleSubmit} >
                    <h2 className='text-center d-flex justify-content-center align-items-center gap-2'>
                        <span className='fs-1 fw-bold'><FaRegistered /></span>
                        <span className='fs-1 fw-bold'>REGISTER</span>
                    </h2>
                    <label htmlFor="name">
                        <span className='text-danger'>*</span> Name
                    </label>
                    <div>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter Your Name'
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </div>

                    <label htmlFor="email">
                        <span className='text-danger'>*</span> Email
                    </label>
                    <input
                        type="email"
                        placeholder='Enter Your Email'
                        className='form-control'
                        autoComplete='off'
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    <label htmlFor="password">
                        <span className='text-danger'>* </span> Password
                    </label>
                    <input
                        type="password"
                        placeholder='Enter Your Password'
                        className='form-control'
                        value={values.password}
                        autoComplete='new-password'
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />
                    <button type='submit' className='btn btn-outline-primary my-2'>REGISTER</button>
                    <p>Already have an account?
                        <span>
                            <Link to={'/login'}>Login</Link>
                        </span>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Register
