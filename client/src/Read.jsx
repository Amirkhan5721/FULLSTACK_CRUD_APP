import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Read = () => {
    const { id } = useParams();
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + id)
            .then((res) => {
                console.log(res)
                setStudent(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className="p-2">
                    <h2>Student Detail</h2>
                    <h2>{student[0]?.id}</h2>
                    <h2>{student[0]?.Name}</h2>
                    <h2>{student[0]?.Email}</h2>
                </div>
                <Link to='/' className="btn btn-primary me-2" >Back</Link>
                <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link>
            </div>
        </div>
    )
}

export default Read
