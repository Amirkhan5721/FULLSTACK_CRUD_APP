import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/")
            .then(result => setData(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(res => {
                toast.success("Student Deleted Successfully!")
                setData(data.filter(student => student.id !== id));
            })
            .catch(err => {
                toast.error("Failed to delete student!")
                console.log(err)
            });
    };

    return (
        <div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success' >Create +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((student, index) => {
                                return <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.Name}</td>
                                    <td>{student.Email}</td>
                                    <td>
                                        <Link to={`/read/${student.id}`} className='btn btn-sm btn-info'>
                                            <CiRead />
                                        </Link>
                                        <Link to={`/edit/${student.id}`} className='btn btn-sm  btn-primary mx-2'>
                                            <CiEdit />
                                        </Link>
                                        <button
                                            className='btn btn-sm btn-danger p-30'
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
