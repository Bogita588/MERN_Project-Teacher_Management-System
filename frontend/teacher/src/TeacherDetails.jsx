import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function TeacherDetails() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [teacher, setTeacher] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8080/get/'+id)
        .then(res => setTeacher(res.data.Result[0]))
        .catch(err => console.log(err));
    })
    const handleLogout = () => {
		axios.get('http://localhost:8080/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}
  return (
    <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:8080/images/`+teacher.image} alt="" className='empImg'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {teacher.name}</h3>
                <h3>Email: {teacher.email}</h3>
                <h3>Salary: {teacher.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default TeacherDetails