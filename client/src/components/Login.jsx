import React, { useState } from 'react'
import { CiLogin } from "react-icons/ci";
import axios from 'axios';
import {toast} from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/api/students/login', values, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            toast.success(res.data.message || "User Login Successfully!")
            console.log(res.data);
            if (res.data.success) {
                console.log(res.data.success);
                navigate('/home')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed!")
        }
    }

    return (
        <div className='d-flex vh-100 bg-secondary-subtle justify-content-center align-items-center'>
            <div className="w-50 bg-white shadow-lg rounded p-3">
                <form className='d-flex flex-column gap-2' onSubmit={handleLogin}>
                    <h2 className='text-center'>
                        <span className='fs-1 fw-bold'><CiLogin /> </span>
                        <span className='fs-1 fw-bold'>Login</span>
                    </h2>
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
                    <button className='btn btn-primary me-2'>Login</button>
                    <p>If account dose not exists?
                        <span>
                            <Link to={'/'}>Register</Link>
                        </span>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login
